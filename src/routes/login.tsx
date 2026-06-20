import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, UtensilsCrossed, ArrowLeft } from "lucide-react";
import heroImg from "@/assets/hero-food.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Đăng nhập — Bếp Nhà" },
      { name: "description", content: "Đăng nhập tài khoản Bếp Nhà để đặt món ngon giao tận nơi." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      {/* Left visual */}
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src={heroImg}
          alt="Món Việt hấp dẫn"
          className="absolute inset-0 h-full w-full object-cover"
        />
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
              Bữa ngon đang chờ,<br />đăng nhập để bắt đầu.
            </h2>
            <p className="max-w-md text-lg opacity-90">
              Tích điểm mỗi đơn, nhận ưu đãi riêng và lưu địa chỉ giao nhanh.
            </p>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-80">Món ăn</div>
              </div>
              <div>
                <div className="text-3xl font-bold">30’</div>
                <div className="text-sm opacity-80">Giao trung bình</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.9★</div>
                <div className="text-sm opacity-80">Đánh giá</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex min-h-screen items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Về trang chủ
          </Link>

          <div className="space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft lg:hidden">
              <UtensilsCrossed className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Chào mừng trở lại 👋</h1>
            <p className="text-muted-foreground">
              Đăng nhập để tiếp tục đặt món yêu thích của bạn.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ban@email.com"
                  className="h-12 pl-10 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mật khẩu</Label>
                <button type="button" className="text-sm font-medium text-primary hover:underline">
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 pl-10 pr-10 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-border text-primary" />
              Ghi nhớ đăng nhập
            </label>

            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow text-base font-semibold shadow-soft hover:opacity-90"
            >
              Đăng nhập
            </Button>

            <div className="relative my-2 text-center text-xs uppercase tracking-wider text-muted-foreground">
              <span className="bg-background px-3 relative z-10">hoặc tiếp tục với</span>
              <div className="absolute left-0 right-0 top-1/2 h-px bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" className="h-11 rounded-xl">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.66-2.83z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
                </svg>
                Google
              </Button>
              <Button type="button" variant="outline" className="h-11 rounded-xl">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Apple
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{" "}
            <button className="font-semibold text-primary hover:underline">
              Đăng ký miễn phí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}