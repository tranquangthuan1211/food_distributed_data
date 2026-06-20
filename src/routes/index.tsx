import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Flame, Plus } from "lucide-react";
import heroImg from "@/assets/hero-food.jpg";
import { AppHeader } from "@/components/AppHeader";
import { dishes, formatVND } from "@/lib/mock-data";
import {Menu} from "@/components/Menu";
import { Dish } from "@/types/dishes";
import { Category } from "@/types/categories";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bếp Nhà — Đặt món ngon giao tận nơi" },
      { name: "description", content: "Đặt món ăn Việt yêu thích, giao tận nơi trong 30 phút. Phở, bánh mì, cơm tấm và hàng trăm món ngon." },
      { property: "og:title", content: "Bếp Nhà — Đặt món ngon giao tận nơi" },
      { property: "og:description", content: "Đặt món ăn Việt yêu thích, giao tận nơi trong 30 phút." },
    ],
  }),
  component: Index,
});

const categories: Category[] = [
  { name: "Tất cả", icon: "🍽️" },
  { name: "Phở & Bún", icon: "🍜" },
  { name: "Cơm", icon: "🍚" },
  { name: "Bánh mì", icon: "🥖" },
  { name: "Khai vị", icon: "🥢" },
  { name: "Đồ uống", icon: "🥤" },
  { name: "Tráng miệng", icon: "🍰" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm">
                <Flame className="mr-1.5 h-3.5 w-3.5 text-primary" />
                Ưu đãi giao hàng miễn phí hôm nay
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Món ngon mỗi ngày,{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  giao tận tay
                </span>
              </h1>
              <p className="max-w-lg text-lg text-muted-foreground">
                Hàng trăm món ăn Việt yêu thích từ các bếp uy tín. Đặt nhanh, giao trong 30 phút, nóng hổi như vừa ra lò.
              </p>

              <div className="flex flex-col gap-3 rounded-2xl bg-card p-3 shadow-card sm:flex-row">
                <div className="flex flex-1 items-center gap-2 px-3">
                  <MapPin className="h-5 w-5 shrink-0 text-primary" />
                  <Input
                    placeholder="Nhập địa chỉ giao hàng..."
                    className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                  />
                </div>
                <Link to="/restaurants">
                  <Button size="lg" className="rounded-xl bg-gradient-to-r from-primary to-primary-glow shadow-soft hover:opacity-90">
                    Tìm món ngay
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Giao trong 30 phút
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> 4.9/5 từ 12k khách
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/20 to-accent/30 blur-2xl" />
              <img
                src={heroImg}
                alt="Bàn ăn với nhiều món Việt hấp dẫn"
                width={1536}
                height={1024}
                className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-card"
              />
              <Card className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl border-0 p-4 shadow-card sm:flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                  <Flame className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Hôm nay</div>
                  <div className="text-sm font-bold">+2.3k đơn đã giao</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Menu
        categories={categories}
        dishes={dishes}
      />
    </div>
  );
}
