import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import { orders, formatVND, type OrderStatus } from "@/lib/mock-data";

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

function OrdersPage() {
  const [tab, setTab] = useState("active");
  const filtered = orders.filter((o) =>
    tab === "active"
      ? !["completed", "cancelled"].includes(o.status)
      : tab === "completed"
        ? o.status === "completed"
        : o.status === "cancelled",
  );

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Đơn hàng của tôi</h1>
          <p className="mt-1 text-muted-foreground">Theo dõi và xem lại các đơn đặt món</p>
        </div>

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

        {filtered.length === 0 ? (
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
                    <img
                      src={o.cover}
                      alt={o.restaurantName}
                      loading="lazy"
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
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
