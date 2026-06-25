import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  UtensilsCrossed,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import heroImg from "@/assets/hero-food.jpg";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Đăng ký — Bếp Nhà" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const { register, login, loading, error } = useAuth();

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSuccess("");
    if (!agree) return;
    if (password.length < 6) {
      // validate tối thiểu phía client; BE sẽ validate tiếp
      return;
    }
    try {
      await register({ name, email, password, phone });
      // BE register không trả token → tự login luôn cho UX mượt
      await login({ email, password });
      setSuccess("Đăng ký thành công! Đang chuyển về trang chủ...");
      navigate({ to: "/" });
    } catch {
      // error đã được set vào AuthContext
    }
  }

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

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Họ và tên</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="h-12 pl-10 rounded-xl"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09xx xxx xxx"
                    className="h-12 pl-10 rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ban@email.com"
                    className="h-12 pl-10 rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={show ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="h-12 pl-10 pr-10 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            )}

            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border text-primary"
              />
              Tôi đồng ý với <span className="text-primary">Điều khoản sử dụng</span> & <span className="text-primary">Chính sách bảo mật</span>
            </label>
            <Button
              type="submit"
              disabled={loading || !agree}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow text-base font-semibold shadow-soft disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang tạo tài khoản...
                </>
              ) : (
                "Tạo tài khoản"
              )}
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