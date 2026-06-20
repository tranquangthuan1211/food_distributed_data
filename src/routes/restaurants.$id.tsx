import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, Heart, Share2, Plus, Flame, ChevronRight } from "lucide-react";
import { restaurants, dishes, formatVND } from "@/lib/mock-data";

export const Route = createFileRoute("/restaurants/$id")({
  loader: ({ params }) => {
    const r = restaurants.find((x) => x.id === params.id);
    if (!r) throw notFound();
    return r;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.name ?? "Nhà hàng"} — Bếp Nhà` }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">Không tìm thấy nhà hàng</div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center">{error.message}</div>
  ),
  component: RestaurantDetail,
});

const categories = ["Bán chạy", "Phở & Bún", "Cơm", "Bánh mì", "Khai vị"];

function RestaurantDetail() {
  const r = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Cover */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img src={r.cover} alt={r.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      <div className="mx-auto -mt-16 max-w-7xl px-4 sm:px-6">
        <Card className="relative rounded-3xl border-0 p-6 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <Badge variant="secondary" className="rounded-full">{r.cuisine}</Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{r.name}</h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <Star className="h-4 w-4 fill-primary text-primary" /> {r.rating}
                  <span className="text-muted-foreground">({r.reviews} đánh giá)</span>
                </span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {r.deliveryTime}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> {r.address}</span>
              </div>
              {r.promo && (
                <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-sm font-medium">
                  <Flame className="h-4 w-4 text-primary" /> {r.promo} — áp dụng đơn từ 100k
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full"><Heart className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><Share2 className="h-4 w-4" /></Button>
            </div>
          </div>
        </Card>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr_340px]">
          {/* Sidebar categories */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <h3 className="px-3 pb-2 text-sm font-semibold text-muted-foreground">Danh mục</h3>
              {categories.map((c, i) => (
                <button
                  key={c}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth ${
                    i === 0 ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                  }`}
                >
                  {c} <ChevronRight className="h-4 w-4 opacity-50" />
                </button>
              ))}
            </div>
          </aside>

          {/* Menu */}
          <section className="space-y-8">
            {categories.slice(0, 3).map((cat) => (
              <div key={cat}>
                <h2 className="mb-4 text-xl font-bold">{cat}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {dishes.slice(0, 4).map((d) => (
                    <Card key={`${cat}-${d.id}`} className="flex gap-4 rounded-2xl border-0 p-4 shadow-card transition-smooth hover:-translate-y-0.5">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold leading-tight">{d.name}</h4>
                          {d.hot && <Badge className="rounded-full bg-primary text-[10px] text-primary-foreground">Hot</Badge>}
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">{d.desc}</p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span className="font-medium text-foreground">{d.rating}</span>
                        </div>
                        <div className="pt-1 text-lg font-bold text-primary">{formatVND(d.price)}</div>
                      </div>
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                        <img src={d.img} alt={d.name} loading="lazy" className="h-full w-full object-cover" />
                        <button className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-smooth hover:scale-110">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Cart preview */}
          <aside className="hidden lg:block">
            <Card className="sticky top-24 rounded-2xl border-0 p-5 shadow-card">
              <h3 className="text-lg font-bold">Giỏ hàng của bạn</h3>
              <p className="mt-1 text-sm text-muted-foreground">3 món · giao đến 227 NVC</p>
              <div className="my-4 space-y-3">
                {dishes.slice(0, 3).map((d) => (
                  <div key={d.id} className="flex justify-between text-sm">
                    <span><span className="font-medium">1×</span> {d.name}</span>
                    <span className="font-medium">{formatVND(d.price)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1 border-t border-border pt-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Tạm tính</span><span>145.000₫</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Phí ship</span><span>{r.fee}</span></div>
                <div className="mt-2 flex justify-between text-base font-bold"><span>Tổng</span><span className="text-primary">160.000₫</span></div>
              </div>
              <Link to="/cart">
                <Button className="mt-4 h-12 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow shadow-soft">
                  Đặt giao ngay
                </Button>
              </Link>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}