import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ShoppingBag, DollarSign, Star, ArrowUpRight, ArrowDownRight, Eye, Check, X, Clock, Utensils, Plus } from "lucide-react";
import { dishes, formatVND } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Quản trị nhà hàng — Bếp Nhà" }] }),
  component: AdminPage,
});

const stats = [
  { label: "Doanh thu hôm nay", value: "12.450.000₫", delta: "+18.2%", up: true, icon: DollarSign },
  { label: "Đơn hàng", value: "142", delta: "+24", up: true, icon: ShoppingBag },
  { label: "Đánh giá TB", value: "4.9", delta: "+0.1", up: true, icon: Star },
  { label: "Tỷ lệ hủy", value: "1.4%", delta: "-0.6%", up: false, icon: TrendingUp },
];

const incoming = [
  { id: "#BN240615142", customer: "Trần Thị B", items: 3, total: 245000, time: "2 phút trước", status: "new" as const },
  { id: "#BN240615141", customer: "Lê Văn C", items: 1, total: 65000, time: "5 phút trước", status: "preparing" as const },
  { id: "#BN240615140", customer: "Phạm Thị D", items: 5, total: 420000, time: "12 phút trước", status: "preparing" as const },
  { id: "#BN240615139", customer: "Hoàng Văn E", items: 2, total: 130000, time: "18 phút trước", status: "delivering" as const },
];

const chartData = [40, 65, 50, 80, 70, 95, 75, 110, 100, 130, 120, 145];
const maxC = Math.max(...chartData);

function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
            <p className="mt-1 text-muted-foreground">Phở Hà Nội Cụ Long · 12 Lê Lợi, Q.1</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full">Xuất báo cáo</Button>
            <Button className="rounded-full bg-gradient-to-r from-primary to-primary-glow">
              <Plus className="mr-1.5 h-4 w-4" /> Thêm món
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="rounded-2xl border-0 p-5 shadow-card">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className={`rounded-full ${s.up ? "bg-emerald-500/10 text-emerald-700" : "bg-destructive/10 text-destructive"}`}>
                    {s.up ? <ArrowUpRight className="mr-0.5 h-3 w-3" /> : <ArrowDownRight className="mr-0.5 h-3 w-3" />}
                    {s.delta}
                  </Badge>
                </div>
                <div className="mt-4 text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Revenue chart */}
          <Card className="rounded-2xl border-0 p-6 shadow-card">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="text-lg font-semibold">Doanh thu 12 tháng</h2>
                <p className="text-sm text-muted-foreground">Triệu VND mỗi tháng</p>
              </div>
              <Badge variant="secondary" className="rounded-full">2024</Badge>
            </div>
            <div className="flex h-56 items-end gap-2">
              {chartData.map((v, i) => (
                <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary-glow transition-smooth hover:opacity-80"
                    style={{ height: `${(v / maxC) * 100}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">T{i + 1}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Top dishes */}
          <Card className="rounded-2xl border-0 p-6 shadow-card">
            <h2 className="mb-4 text-lg font-semibold">Món bán chạy tháng</h2>
            <div className="space-y-4">
              {dishes.slice(0, 5).map((d, i) => (
                <div key={d.id} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <img src={d.img} alt={d.name} loading="lazy" className="h-11 w-11 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm font-medium">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{220 - i * 18} phần đã bán</div>
                  </div>
                  <div className="text-sm font-semibold text-primary">{formatVND(d.price)}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Incoming orders */}
        <Card className="mt-6 rounded-2xl border-0 p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Đơn hàng đến</h2>
              <p className="text-sm text-muted-foreground">Xử lý đơn mới và đang chuẩn bị</p>
            </div>
            <Button variant="ghost" className="text-primary">Xem tất cả →</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 pr-4 font-medium">Mã đơn</th>
                  <th className="py-3 pr-4 font-medium">Khách</th>
                  <th className="py-3 pr-4 font-medium">Số món</th>
                  <th className="py-3 pr-4 font-medium">Tổng</th>
                  <th className="py-3 pr-4 font-medium">Trạng thái</th>
                  <th className="py-3 pr-4 font-medium">Thời gian</th>
                  <th className="py-3 pr-4 text-right font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {incoming.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0">
                    <td className="py-4 pr-4 font-mono text-xs">{o.id}</td>
                    <td className="py-4 pr-4 font-medium">{o.customer}</td>
                    <td className="py-4 pr-4">{o.items}</td>
                    <td className="py-4 pr-4 font-semibold text-primary">{formatVND(o.total)}</td>
                    <td className="py-4 pr-4">
                      {o.status === "new" && <Badge className="rounded-full bg-amber-500/10 text-amber-700">Mới</Badge>}
                      {o.status === "preparing" && <Badge className="rounded-full bg-blue-500/10 text-blue-700"><Utensils className="mr-1 h-3 w-3" /> Đang nấu</Badge>}
                      {o.status === "delivering" && <Badge className="rounded-full bg-primary/10 text-primary"><Clock className="mr-1 h-3 w-3" /> Đang giao</Badge>}
                    </td>
                    <td className="py-4 pr-4 text-muted-foreground">{o.time}</td>
                    <td className="py-4 pr-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                        {o.status === "new" && (
                          <>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600"><Check className="h-4 w-4" /></Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><X className="h-4 w-4" /></Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Menu management */}
        <Card className="mt-6 rounded-2xl border-0 p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Quản lý thực đơn</h2>
            <Link to="/admin"><Button variant="ghost" className="text-primary">Chỉnh sửa →</Button></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dishes.slice(0, 4).map((d) => (
              <Card key={d.id} className="overflow-hidden rounded-xl border border-border p-0 shadow-none">
                <img src={d.img} alt={d.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="space-y-1 p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold truncate">{d.name}</h4>
                    <Badge variant="secondary" className="rounded-full text-[10px]">Còn hàng</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">{formatVND(d.price)}</span>
                    <span className="text-xs text-muted-foreground">{d.category}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}