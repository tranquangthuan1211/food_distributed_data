import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, CreditCard, Bell, Heart, Gift, LogOut, ChevronRight, Plus } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Tài khoản — Bếp Nhà" }] }),
  component: ProfilePage,
});

const menu = [
  { icon: User, label: "Thông tin cá nhân", desc: "Tên, email, mật khẩu" },
  { icon: MapPin, label: "Sổ địa chỉ", desc: "3 địa chỉ đã lưu" },
  { icon: CreditCard, label: "Phương thức thanh toán", desc: "MoMo, Visa **** 4242" },
  { icon: Heart, label: "Nhà hàng yêu thích", desc: "12 nhà hàng" },
  { icon: Gift, label: "Ưu đãi của tôi", desc: "5 voucher khả dụng" },
  { icon: Bell, label: "Thông báo", desc: "Email, push, SMS" },
];

function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-2xl font-bold text-primary-foreground shadow-soft">
            NA
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Nguyễn Văn A</h1>
            <p className="text-muted-foreground">nguyenvana@email.com · 0901 234 567</p>
            <div className="mt-2 flex gap-2">
              <Badge className="rounded-full bg-primary text-primary-foreground">Hạng Vàng</Badge>
              <Badge variant="secondary" className="rounded-full">1.245 điểm</Badge>
            </div>
          </div>
          <Button variant="outline" className="rounded-full">Chỉnh sửa</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Card className="rounded-2xl border-0 p-6 shadow-card">
              <h2 className="mb-4 text-lg font-semibold">Thông tin cá nhân</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Họ tên</Label><Input defaultValue="Nguyễn Văn A" className="h-11 rounded-xl" /></div>
                <div className="space-y-2"><Label>Email</Label><Input defaultValue="nguyenvana@email.com" className="h-11 rounded-xl" /></div>
                <div className="space-y-2"><Label>Số điện thoại</Label><Input defaultValue="0901 234 567" className="h-11 rounded-xl" /></div>
                <div className="space-y-2"><Label>Ngày sinh</Label><Input type="date" className="h-11 rounded-xl" /></div>
              </div>
              <Button className="mt-5 rounded-xl bg-gradient-to-r from-primary to-primary-glow">Lưu thay đổi</Button>
            </Card>

            <Card className="rounded-2xl border-0 p-6 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Sổ địa chỉ</h2>
                <Button size="sm" variant="ghost" className="text-primary"><Plus className="mr-1 h-4 w-4" /> Thêm</Button>
              </div>
              <div className="space-y-3">
                {[
                  { tag: "Nhà", addr: "227 Nguyễn Văn Cừ, P.4, Q.5, TP.HCM", default: true },
                  { tag: "Công ty", addr: "Tòa nhà Bitexco, 2 Hải Triều, Q.1, TP.HCM" },
                  { tag: "Bố mẹ", addr: "15 Trần Hưng Đạo, Q.5, TP.HCM" },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-border p-4">
                    <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{a.tag}</span>
                        {a.default && <Badge variant="secondary" className="rounded-full text-[10px]">Mặc định</Badge>}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{a.addr}</p>
                    </div>
                    <Button variant="ghost" size="sm">Sửa</Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="rounded-2xl border-0 p-3 shadow-card h-fit">
            {menu.map((m) => {
              const Icon = m.icon;
              return (
                <button key={m.label} className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-smooth hover:bg-secondary">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{m.label}</div>
                    <div className="text-xs text-muted-foreground">{m.desc}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              );
            })}
            <Link to="/login" className="block">
              <button className="mt-2 flex w-full items-center gap-3 rounded-xl p-3 text-left text-destructive transition-smooth hover:bg-destructive/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
                  <LogOut className="h-5 w-5" />
                </div>
                <span className="font-medium">Đăng xuất</span>
              </button>
            </Link>
          </Card>
        </div>
      </main>
    </div>
  );
}