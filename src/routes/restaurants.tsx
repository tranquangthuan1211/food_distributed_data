import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Clock, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { restaurants } from "@/lib/mock-data";

export const Route = createFileRoute("/restaurants")({
  head: () => ({ meta: [{ title: "Nhà hàng — Bếp Nhà" }] }),
  component: RestaurantsPage,
});

const filters = ["Tất cả", "Gần bạn", "Đang giảm giá", "Đánh giá cao", "Mới", "Freeship"];

function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nhà hàng quanh bạn</h1>
            <p className="mt-1 text-muted-foreground">{restaurants.length * 32}+ nhà hàng đang mở cửa</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Tìm nhà hàng..." className="pl-9 rounded-full bg-secondary" />
            </div>
            <Button variant="outline" className="rounded-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Bộ lọc
            </Button>
          </div>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-smooth ${
                i === 0
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-card hover:border-primary hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((r) => (
            <Link key={r.id} to="/restaurants/$id" params={{ id: r.id }}>
              <Card className="group overflow-hidden rounded-2xl border-0 p-0 shadow-card transition-smooth hover:-translate-y-1">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img src={r.cover} alt={r.name} loading="lazy" className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
                  {r.promo && (
                    <Badge className="absolute left-3 top-3 rounded-full bg-primary text-primary-foreground">
                      {r.promo}
                    </Badge>
                  )}
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                    <Star className="h-3 w-3 fill-primary text-primary" /> {r.rating}
                  </div>
                </div>
                <div className="space-y-2 p-5">
                  <h3 className="text-lg font-semibold leading-tight">{r.name}</h3>
                  <p className="text-sm text-muted-foreground">{r.cuisine}</p>
                  <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {r.deliveryTime}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {r.distance}</span>
                    <span>Phí ship {r.fee}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}