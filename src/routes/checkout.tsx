import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Wallet, CreditCard, Banknote, Bike, Zap, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Thanh toán — Bếp Nhà" }] }),
  component: CheckoutPage,
});

const payments = [
  { id: "momo", name: "Ví MoMo", icon: Wallet, desc: "Liên kết · *** 8821" },
  { id: "card", name: "Thẻ Visa", icon: CreditCard, desc: "**** **** **** 4242" },
  { id: "cash", name: "Tiền mặt", icon: Banknote, desc: "Thanh toán khi nhận hàng" },
];

const shipping = [
  { id: "standard", name: "Giao tiêu chuẩn", icon: Bike, eta: "25–30 phút", price: "15.000₫" },
  { id: "express", name: "Giao siêu tốc", icon: Zap, eta: "15–20 phút", price: "25.000₫" },
];

function CheckoutPage() {
  const [pay, setPay] = useState("momo");
  const [ship, setShip] = useState("standard");

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold">Xác nhận đặt hàng</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <Card className="rounded-2xl border-0 p-6 shadow-card">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <MapPin className="h-5 w-5 text-primary" /> Địa chỉ giao hàng
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2"><Label>Họ tên người nhận</Label><Input defaultValue="Nguyễn Văn A" className="h-11 rounded-xl" /></div>
                <div className="space-y-2"><Label>Số điện thoại</Label><Input defaultValue="0901 234 567" className="h-11 rounded-xl" /></div>
                <div className="sm:col-span-2 space-y-2"><Label>Địa chỉ chi tiết</Label><Input defaultValue="227 Nguyễn Văn Cừ, P.4, Q.5, TP.HCM" className="h-11 rounded-xl" /></div>
                <div className="sm:col-span-2 space-y-2"><Label>Ghi chú</Label><Input placeholder="VD: Gọi trước khi giao" className="h-11 rounded-xl" /></div>
              </div>
            </Card>

            <Card className="rounded-2xl border-0 p-6 shadow-card">
              <h2 className="mb-4 text-lg font-semibold">Phương thức giao hàng</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {shipping.map((s) => {
                  const Icon = s.icon;
                  const active = ship === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setShip(s.id)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-smooth ${
                        active ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary"
                      }`}
                    >
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${active ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.eta} · {s.price}</div>
                      </div>
                      {active && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card className="rounded-2xl border-0 p-6 shadow-card">
              <h2 className="mb-4 text-lg font-semibold">Phương thức thanh toán</h2>
              <div className="space-y-3">
                {payments.map((p) => {
                  const Icon = p.icon;
                  const active = pay === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPay(p.id)}
                      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-smooth ${
                        active ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary"
                      }`}
                    >
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${active ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.desc}</div>
                      </div>
                      <div className={`h-5 w-5 rounded-full border-2 ${active ? "border-primary bg-primary" : "border-border"}`} />
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          <Card className="rounded-2xl border-0 p-6 shadow-card h-fit sticky top-24">
            <h3 className="text-lg font-semibold">Đơn của bạn</h3>
            <div className="my-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>2× Phở bò tái nạm</span><span>130.000₫</span></div>
              <div className="flex justify-between"><span>1× Gỏi cuốn tôm thịt</span><span>45.000₫</span></div>
            </div>
            <div className="space-y-2 border-t border-border pt-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Tạm tính</span><span>175.000₫</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Phí giao hàng</span><span>15.000₫</span></div>
              <div className="flex justify-between text-primary"><span>Voucher BEPNHA30</span><span>-30.000₫</span></div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="font-semibold">Tổng cộng</span>
              <span className="text-xl font-bold text-primary">160.000₫</span>
            </div>
            <Link to="/orders/$id" params={{ id: "BN240615001" }}>
              <Button className="mt-5 h-12 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow shadow-soft">
                Đặt hàng · 160.000₫
              </Button>
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Bằng việc đặt hàng, bạn đồng ý với điều khoản dịch vụ của Bếp Nhà.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}