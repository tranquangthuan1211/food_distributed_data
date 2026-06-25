import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Wallet,
  CreditCard,
  Banknote,
  Bike,
  Zap,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/api/food-delivery.api";
import { dishes } from "@/lib/mock-data";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Thanh toán — Bếp Nhà" }] }),
  component: CheckoutPage,
});

const payments = [
  { id: "momo", name: "Ví MoMo", icon: Wallet, method: "ewallet" as const, desc: "Liên kết · *** 8821" },
  { id: "card", name: "Thẻ Visa", icon: CreditCard, method: "card" as const, desc: "**** **** **** 4242" },
  { id: "cash", name: "Tiền mặt", icon: Banknote, method: "cash" as const, desc: "Thanh toán khi nhận hàng" },
];

const shipping = [
  { id: "standard", name: "Giao tiêu chuẩn", icon: Bike, eta: "25–30 phút", price: 15000 },
  { id: "express", name: "Giao siêu tốc", icon: Zap, eta: "15–20 phút", price: 25000 },
];

// Cart demo từ mock-data (sau này có thể chuyển sang Context/Redux khi cần)
const cartItems = dishes.slice(0, 2).map((d, i) => ({ ...d, qty: i === 0 ? 2 : 1 }));
const DEMO_RESTAURANT_ID = "65f1a2b3c4d5e6f7a8b9c0d2"; // ID mẫu; trong production cần chọn nhà hàng thật

function CheckoutPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [pay, setPay] = useState("momo");
  const [ship, setShip] = useState("standard");
  const [name, setName] = useState(user?.name ?? "Nguyễn Văn A");
  const [phone, setPhone] = useState("0901 234 567");
  const [address, setAddress] = useState("227 Nguyễn Văn Cừ, P.4, Q.5, TP.HCM");
  const [note, setNote] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sub = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipFee = shipping.find((s) => s.id === ship)?.price ?? 15000;
  const total = sub + shipFee;

  const selectedPayment = payments.find((p) => p.id === pay);

  async function handlePlaceOrder(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isAuthenticated || !user?.id) {
      setError("Bạn cần đăng nhập trước khi đặt hàng.");
      setTimeout(() => navigate({ to: "/login" }), 800);
      return;
    }

    setSubmitting(true);
    try {
      const res = await createOrder({
        userId: user.id,
        restaurantId: DEMO_RESTAURANT_ID,
        items: cartItems.map((it) => ({
          name: it.name,
          price: it.price,
          quantity: it.qty,
        })),
        totalPrice: total,
        paymentMethod: selectedPayment?.method ?? "cash",
        deliveryAddress: address,
        note: note || undefined,
      });

      const orderId = res?.data?._id ?? res?.data?.orderId ?? "BN" + Date.now();
      navigate({ to: "/orders/$id", params: { id: String(orderId) } });
    } catch (err: any) {
      setError(err?.message ?? "Đặt hàng thất bại");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold">Xác nhận đặt hàng</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <Card className="rounded-2xl border-0 p-6 shadow-card">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <MapPin className="h-5 w-5 text-primary" /> Địa chỉ giao hàng
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2"><Label>Họ tên người nhận</Label><Input value={name} onChange={(e) => setName(e.target.value)} required className="h-11 rounded-xl" /></div>
                <div className="space-y-2"><Label>Số điện thoại</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} required className="h-11 rounded-xl" /></div>
                <div className="sm:col-span-2 space-y-2"><Label>Địa chỉ chi tiết</Label><Input value={address} onChange={(e) => setAddress(e.target.value)} required className="h-11 rounded-xl" /></div>
                <div className="sm:col-span-2 space-y-2"><Label>Ghi chú</Label><Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="VD: Gọi trước khi giao" className="h-11 rounded-xl" /></div>
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
                      type="button"
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
                        <div className="text-xs text-muted-foreground">{s.eta} · {s.price.toLocaleString("vi-VN")}₫</div>
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
                      type="button"
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
          </form>

          <Card className="rounded-2xl border-0 p-6 shadow-card h-fit sticky top-24">
            <h3 className="text-lg font-semibold">Đơn của bạn</h3>
            <div className="my-4 space-y-2 text-sm">
              {cartItems.map((it) => (
                <div key={it.id} className="flex justify-between">
                  <span>{it.qty}× {it.name}</span>
                  <span>{(it.qty * it.price).toLocaleString("vi-VN")}₫</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-border pt-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Tạm tính</span><span>{sub.toLocaleString("vi-VN")}₫</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Phí giao hàng</span><span>{shipFee.toLocaleString("vi-VN")}₫</span></div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="font-semibold">Tổng cộng</span>
              <span className="text-xl font-bold text-primary">{total.toLocaleString("vi-VN")}₫</span>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="button"
              onClick={handlePlaceOrder}
              disabled={submitting}
              className="mt-5 h-12 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow shadow-soft disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang đặt hàng...
                </>
              ) : (
                `Đặt hàng · ${total.toLocaleString("vi-VN")}₫`
              )}
            </Button>

            {!isAuthenticated && (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Cần đăng nhập trước khi đặt.{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Đăng nhập
                </Link>
              </p>
            )}
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Bằng việc đặt hàng, bạn đồng ý với điều khoản dịch vụ của Bếp Nhà.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}