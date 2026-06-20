import {Category} from "@/types/categories";
import {Dish} from "@/types/dishes";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {Clock, Star, Flame, Plus } from "lucide-react";
import { formatVND } from "@/lib/mock-data";
export function Menu({
    categories,
    dishes,
}: {
    categories: Category[];
    dishes: Dish[];
}) {
    return (
        <>
           {/* Categories */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                <div className="flex gap-3 overflow-x-auto pb-2">
                {categories.map((c, i) => (
                    <button
                    key={c.name}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-smooth ${
                        i === 0
                        ? "border-primary bg-primary text-primary-foreground shadow-soft"
                        : "border-border bg-card hover:border-primary hover:text-primary"
                    }`}
                    >
                    <span className="text-lg">{c.icon}</span>
                    {c.name}
                    </button>
                ))}
                </div>
            </section>
            {/* Dishes */}
            <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
                <div className="mb-6 flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold sm:text-3xl">Món nổi bật</h2>
                    <p className="mt-1 text-muted-foreground">Được khách yêu thích nhất tuần này</p>
                </div>
                <Link to="/restaurants">
                    <Button variant="ghost" className="text-primary hover:text-primary">
                    Xem tất cả →
                    </Button>
                </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {dishes.slice(0, 4).map((d) => (
                    <Card
                    key={d.id}
                    className="group overflow-hidden rounded-2xl border-0 p-0 shadow-card transition-smooth hover:-translate-y-1"
                    >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                        <img
                        src={d.img}
                        alt={d.name}
                        loading="lazy"
                        width={768}
                        height={768}
                        className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                        />
                        {d.hot && (
                        <Badge className="absolute left-3 top-3 rounded-full bg-primary text-primary-foreground">
                            <Flame className="mr-1 h-3 w-3" /> Hot
                        </Badge>
                        )}
                        <button className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-smooth hover:scale-110">
                        <Plus className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="space-y-2 p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                        <span className="font-medium text-foreground">{d.rating}</span>
                        <span>·</span>
                        <Clock className="h-3.5 w-3.5" />
                        <span>20 phút</span>
                        </div>
                        <h3 className="font-semibold leading-tight">{d.name}</h3>
                        <p className="line-clamp-1 text-sm text-muted-foreground">{d.desc}</p>
                        <div className="pt-1 text-lg font-bold text-primary">{formatVND(d.price)}</div>
                    </div>
                    </Card>
                ))}
                </div>
            </section>
        </>
    )
}