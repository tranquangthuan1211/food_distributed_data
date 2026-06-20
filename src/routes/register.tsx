import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Phone, Eye, EyeOff, UtensilsCrossed, ArrowLeft } from "lucide-react";
import heroImg from "@/assets/hero-food.jpg";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Đăng ký — Bếp Nhà" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/40 to-primary-glow/70" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2 self-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground text-primary">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">Bếp Nhà</span>
          </Link>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight">
              Tạo tài khoản,<br />nhận voucher 50k cho đơn đầu.
            </h2>
            <p className="max-w-md text-lg opacity-90">
              Tích điểm mỗi đơn, ưu đãi sinh nhật, freeship hàng tuần.
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Về trang chủ
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Đăng ký Bếp Nhà</h1>
            <p className="text-muted-foreground">Chỉ mất 30 giây để bắt đầu đặt món.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label>Họ và tên</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Nguyễn Văn A" className="h-12 pl-10 rounded-xl" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="09xx xxx xxx" className="h-12 pl-10 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="ban@email.com" className="h-12 pl-10 rounded-xl" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type={show ? "text" : "password"} placeholder="Tối thiểu 8 ký tự" className="h-12 pl-10 pr-10 rounded-xl" />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border text-primary" />
              Tôi đồng ý với <span className="text-primary">Điều khoản sử dụng</span> & <span className="text-primary">Chính sách bảo mật</span>
            </label>
            <Button type="submit" className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow text-base font-semibold shadow-soft">
              Tạo tài khoản
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}