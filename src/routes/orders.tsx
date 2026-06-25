import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { orders as mockOrders, formatVND, type OrderStatus } from "@/lib/mock-data";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders } from "@/api/food-delivery.api";

// BE trả về Order có shape khác mock-data, chuẩn hoá về một kiểu hiển thị chung
type DisplayOrder = {
  id: string;
  restaurantName: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  placedAt: string;
};

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Đơn hàng — Bếp Nhà" }] }),
  component: OrdersPage,
});

const statusMap: Record<OrderStatus, { label: string; cls: string }> = {
  placed: { label: "Đã đặt", cls: "bg-blue-500/10 text-blue-700" },
  confirmed: { label: "Đã xác nhận", cls: "bg-blue-500/10 text-blue-700" },
  preparing: { label: "Đang chuẩn bị", cls: "bg-amber-500/10 text-amber-700" },
  delivering: { label: "Đang giao", cls: "bg-primary/10 text-primary" },
  completed: { label: "Hoàn tất", cls: "bg-emerald-500/10 text-emerald-700" },
  cancelled: { label: "Đã hủy", cls: "bg-destructive/10 text-destructive" },
};

const tabs = [
  { id: "active", label: "Đang xử lý" },
  { id: "completed", label: "Đã hoàn tất" },
  { id: "cancelled", label: "Đã hủy" },
];

// Map status BE → status hiển thị (BE dùng 'pending', FE dùng 'placed')
function mapBeStatus(beStatus: string): OrderStatus {
  if (beStatus === "pending") return "placed";
  return (beStatus as OrderStatus) ?? "placed";
}

function formatPlacedAt(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });
  } catch {
    return iso;
  }
}

function OrdersPage() {
  const [tab, setTab] = useState("active");
  const { isAuthenticated, user } = useAuth();

  const [displayOrders, setDisplayOrders] = useState<DisplayOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!isAuthenticated || !user?.id) {
        // Chưa login → dùng mock để demo
        setDisplayOrders(
          mockOrders.map((o) => ({
            id: o.id,
            restaurantName: o.restaurantName,
            items: o.items,
            total: o.total,
            status: o.status,
            placedAt: o.placedAt,
          }))
        );
        return;
      }
      setLoading(true);
      setFetchError(null);
      try {
        const res = await getUserOrders(user.id);
        const list = res?.data ?? [];
        if (cancelled) return;
        if (!Array.isArray(list) || list.length === 0) {
          // User chưa có order thật → fallback mock
          setDisplayOrders(
            mockOrders.map((o) => ({
              id: o.id,
              restaurantName: o.restaurantName,
              items: o.items,
              total: o.total,
              status: o.status,
              placedAt: o.placedAt,
            }))
          );
        } else {
          setDisplayOrders(
            list.map((o: any) => ({
              id: o.orderId,
              restaurantName: o.restaurantName,
              items: (o.items ?? []).map((it: any) => ({
                name: it.name,
                qty: it.quantity ?? it.qty ?? 1,
                price: it.price,
              })),
              total: o.totalPrice,
              status: mapBeStatus(o.status),
              placedAt: formatPlacedAt(o.createdAt),
            }))
          );
        }
      } catch (err: any) {
        if (!cancelled) {
          setFetchError(err?.message ?? "Không tải được đơn hàng");
          // Fallback về mock để UI không trống
          setDisplayOrders(
            mockOrders.map((o) => ({
              id: o.id,
              restaurantName: o.restaurantName,
              items: o.items,
              total: o.total,
              status: o.status,
              placedAt: o.placedAt,
            }))
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user?.id]);

  const filtered = displayOrders.filter((o) =>
    tab === "active"
      ? !["completed", "cancelled"].includes(o.status)
      : tab === "completed"
        ? o.status === "completed"
        : o.status === "cancelled"
  );

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Đơn hàng của tôi</h1>
          <p className="mt-1 text-muted-foreground">
            {isAuthenticated
              ? `Đang hiển thị đơn của ${user?.name ?? "bạn"} (BE: food_distributed_be)`
              : "Đăng nhập để xem đơn thật từ hệ thống (đang hiển thị dữ liệu mẫu)."}
          </p>
        </div>

        {fetchError && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>BE chưa sẵn sàng: {fetchError}. Đang hiển thị dữ liệu mẫu.</span>
          </div>
        )}

        <div className="mb-6 flex gap-2 rounded-full bg-secondary p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-smooth ${
                tab === t.id
                  ? "bg-background text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <Card className="flex items-center justify-center gap-2 rounded-2xl border-0 p-12 shadow-card">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-muted-foreground">Đang tải đơn hàng từ BE...</span>
          </Card>
        ) : filtered.length === 0 ? (
          <Card className="rounded-2xl border-0 p-12 text-center shadow-card">
            <p className="text-muted-foreground">Chưa có đơn hàng nào trong mục này.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filtered.map((o) => {
              const s = statusMap[o.status];
              return (
                <Link key={o.id} to="/orders/$id" params={{ id: o.id }}>
                  <Card className="flex items-center gap-4 rounded-2xl border-0 p-4 shadow-card transition-smooth hover:-translate-y-0.5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/30 text-2xl">
                      🍜
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{o.restaurantName}</h3>
                        <Badge className={`rounded-full ${s.cls}`} variant="secondary">
                          {s.label}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {o.items.map((i) => `${i.qty}× ${i.name}`).join(" · ")}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {o.placedAt}
                        </span>
                        <span>Mã: {o.id}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{formatVND(o.total)}</div>
                      <Button variant="ghost" size="sm" className="mt-1">
                        Chi tiết <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}