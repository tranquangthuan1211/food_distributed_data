import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Receipt,
  MapPin,
  Phone,
  MessageCircle,
  Bike,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { orders as mockOrders, formatVND, type OrderStatus, type Order } from "@/lib/mock-data";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders } from "@/api/food-delivery.api";

export const Route = createFileRoute("/orders/$id")({
  head: () => ({ meta: [{ title: "Đơn hàng — Bếp Nhà" }] }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-12 text-center">Không tìm thấy đơn hàng</div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-12 text-center text-destructive">{error.message}</div>
    </div>
  ),
  component: OrderDetail,
});

const steps: { id: OrderStatus; label: string; desc: string }[] = [
  { id: "placed", label: "Đã đặt đơn", desc: "Bếp Nhà nhận yêu cầu" },
  { id: "confirmed", label: "Nhà hàng xác nhận", desc: "Nhà hàng chấp nhận đơn" },
  { id: "preparing", label: "Đang chuẩn bị món", desc: "Bếp đang nấu cho bạn" },
  { id: "delivering", label: "Tài xế đang giao", desc: "Trên đường tới bạn" },
  { id: "completed", label: "Đã giao thành công", desc: "Chúc bạn ngon miệng!" },
];

// Map BE status → status hiển thị
function mapBeStatus(beStatus: string): OrderStatus {
  if (beStatus === "pending") return "placed";
  return (beStatus as OrderStatus) ?? "placed";
}

function OrderDetail() {
  const { id } = Route.useParams();
  const { isAuthenticated, user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setFetchError(null);

      // BE không có GET /api/orders/:id, nên lấy danh sách đơn của user rồi tìm theo id
      let beOrder: Order | null = null;
      if (isAuthenticated && user?.id) {
        try {
          const res = await getUserOrders(user.id);
          const list = res?.data ?? [];
          const found = list.find((o: any) => String(o.orderId) === String(id));
          if (found) {
            beOrder = {
              id: String(found.orderId),
              restaurantId: String(found.restaurantId),
              restaurantName: found.restaurantName ?? "Nhà hàng",
              // BE không trả cover; dùng fallback ảnh default
              cover: "",
              items: (found.items ?? []).map((it: any) => ({
                name: it.name,
                qty: it.quantity ?? it.qty ?? 1,
                price: it.price,
              })),
              total: found.totalPrice,
              status: mapBeStatus(found.status),
              placedAt: new Date(found.createdAt).toLocaleString("vi-VN"),
              eta: "—",
              address: "—",
              payment: "—",
            };
          }
        } catch (err: any) {
          if (!cancelled) setFetchError(err?.message ?? "Không tải được BE");
        }
      }

      // Fallback: tìm trong mock
      const mockOrder = mockOrders.find((o) => o.id === id) ?? null;

      if (cancelled) return;
      setOrder(beOrder ?? mockOrder);
      if (!beOrder && !mockOrder) {
        throw notFound();
      }
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id, isAuthenticated, user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="mx-auto max-w-5xl px-4 py-12 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-3 text-muted-foreground">Đang tải đơn hàng từ BE...</p>
        </main>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="p-12 text-center">Không tìm thấy đơn hàng</div>
      </div>
    );
  }

  const currentIdx = steps.findIndex((s) => s.id === order.status);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Link to="/orders" className="text-sm text-muted-foreground hover:text-foreground">
          ← Đơn hàng
        </Link>

        {fetchError && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>BE chưa sẵn sàng ({fetchError}). Đang hiển thị dữ liệu mẫu.</span>
          </div>
        )}

        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card className="rounded-2xl border-0 p-6 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Badge variant="secondary" className="rounded-full">Mã đơn {order.id}</Badge>
                  <h1 className="mt-2 text-2xl font-bold">{order.restaurantName}</h1>
                  <p className="text-sm text-muted-foreground">Đặt lúc {order.placedAt} · Dự kiến {order.eta}</p>
                </div>
                <div className="rounded-2xl bg-primary/10 px-4 py-3 text-center">
                  <div className="text-xs text-primary">ETA</div>
                  <div className="text-2xl font-bold text-primary">{order.eta}</div>
                </div>
              </div>

              {/* Tracking */}
              <div className="mt-8 space-y-5">
                {steps.map((s, i) => {
                  const done = i <= currentIdx;
                  const active = i === currentIdx;
                  return (
                    <div key={s.id} className="relative flex gap-4">
                      {i < steps.length - 1 && (
                        <div className={`absolute left-[15px] top-8 h-full w-0.5 ${done ? "bg-primary" : "bg-border"}`} />
                      )}
                      <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      } ${active ? "ring-4 ring-primary/20" : ""}`}>
                        {done ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-semibold">{i + 1}</span>}
                      </div>
                      <div className="pb-2">
                        <div className={`font-semibold ${done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</div>
                        <div className="text-sm text-muted-foreground">{s.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {order.status === "delivering" && (
              <Card className="rounded-2xl border-0 p-5 shadow-card">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Bike className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Anh Trần Minh Tài</div>
                    <div className="text-sm text-muted-foreground">Honda Wave · 59X1-234.56</div>
                  </div>
                  <Button size="icon" variant="outline" className="rounded-full"><Phone className="h-4 w-4" /></Button>
                  <Button size="icon" variant="outline" className="rounded-full"><MessageCircle className="h-4 w-4" /></Button>
                </div>
              </Card>
            )}

            <Card className="rounded-2xl border-0 p-6 shadow-card">
              <h3 className="mb-4 flex items-center gap-2 font-semibold"><Receipt className="h-4 w-4 text-primary" /> Chi tiết món</h3>
              <div className="space-y-3">
                {order.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span><span className="mr-2 font-semibold">{it.qty}×</span>{it.name}</span>
                    <span className="font-medium">{formatVND(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="rounded-2xl border-0 p-5 shadow-card">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="text-sm">
                  <div className="text-muted-foreground">Giao đến</div>
                  <div className="font-medium">{order.address}</div>
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border-0 p-5 shadow-card">
              <h3 className="font-semibold">Thanh toán</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Tạm tính</span><span>{formatVND(order.total - 15000)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Phí ship</span><span>15.000₫</span></div>
                <div className="mt-2 flex justify-between border-t border-border pt-2 text-base font-bold"><span>Tổng</span><span className="text-primary">{formatVND(order.total)}</span></div>
              </div>
              <div className="mt-3 rounded-xl bg-secondary px-3 py-2 text-xs text-muted-foreground">
                Đã thanh toán bằng <span className="font-medium text-foreground">{order.payment}</span>
              </div>
            </Card>

            {order.status === "completed" && (
              <Button className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow">
                Đánh giá đơn hàng
              </Button>
            )}
            <Button variant="outline" className="h-11 w-full rounded-xl">Hỗ trợ đơn hàng</Button>
          </div>
        </div>
      </main>
    </div>
  );
}