import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, Tag, MapPin } from "lucide-react";
import { dishes, formatVND } from "@/lib/mock-data";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Giỏ hàng — Bếp Nhà" }] }),
  component: CartPage,
});

function CartPage() {
  const items = dishes.slice(0, 3).map((d, i) => ({ ...d, qty: i === 0 ? 2 : 1 }));
  const sub = items.reduce((s, i) => s + i.price * i.qty, 0);
  const ship = 15000;
  const discount = 30000;
  const total = sub + ship - discount;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold">Giỏ hàng</h1>
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <Card className="rounded-2xl border-0 p-5 shadow-card">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold">Phở Hà Nội Cụ Long</h2>
                <span className="text-sm text-muted-foreground">3 món</span>
              </div>
              <div className="space-y-4">
                {items.map((it) => (
                  <div key={it.id} className="flex gap-4 border-t border-border pt-4 first:border-0 first:pt-0">
                    <img src={it.img} alt={it.name} loading="lazy" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-medium">{it.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{it.desc}</p>
                      <div className="mt-2 font-bold text-primary">{formatVND(it.price)}</div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-2 rounded-full border border-border px-1 py-1">
                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full"><Minus className="h-3 w-3" /></Button>
                        <span className="w-6 text-center text-sm font-semibold">{it.qty}</span>
                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full"><Plus className="h-3 w-3" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-2xl border-0 p-5 shadow-card">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Giao đến</div>
                  <div className="font-medium">227 Nguyễn Văn Cừ, P.4, Q.5, TP.HCM</div>
                </div>
                <Button variant="ghost" size="sm">Đổi</Button>
              </div>
            </Card>

            <Card className="rounded-2xl border-0 p-5 shadow-card">
              <h3 className="mb-3 font-semibold">Ghi chú cho nhà hàng</h3>
              <Input placeholder="VD: Ít cay, không hành..." className="rounded-xl" />
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="rounded-2xl border-0 p-5 shadow-card">
              <h3 className="font-semibold">Mã giảm giá</h3>
              <div className="mt-3 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input defaultValue="BEPNHA30" className="pl-10 rounded-xl font-medium uppercase" />
                </div>
                <Button variant="outline" className="rounded-xl">Áp dụng</Button>
              </div>
              <p className="mt-2 text-xs text-primary">Đã áp dụng giảm 30.000₫</p>
            </Card>

            <Card className="rounded-2xl border-0 p-5 shadow-card">
              <h3 className="font-semibold">Tóm tắt đơn</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Tạm tính</span><span>{formatVND(sub)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Phí giao hàng</span><span>{formatVND(ship)}</span></div>
                <div className="flex justify-between text-primary"><span>Giảm giá</span><span>-{formatVND(discount)}</span></div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-base">
                <span className="font-semibold">Tổng thanh toán</span>
                <span className="text-xl font-bold text-primary">{formatVND(total)}</span>
              </div>
              <Link to="/checkout">
                <Button className="mt-4 h-12 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow shadow-soft">
                  Tiến hành thanh toán
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}