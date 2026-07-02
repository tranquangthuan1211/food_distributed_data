import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, UtensilsCrossed, User, Receipt, LayoutDashboard } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Bếp Nhà</span>
        </Link>

        <div className="hidden flex-1 max-w-md md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm món ăn hoặc nhà hàng..."
              className="pl-9 rounded-full border-border bg-secondary"
            />
          </div>
        </div>

        <nav className="flex items-center gap-1">
          <Link to="/restaurants" className="hidden md:inline-flex">
            <Button variant="ghost" size="sm" className="rounded-full">Nhà hàng</Button>
          </Link>
          <Link to="/orders" className="hidden md:inline-flex">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Receipt className="mr-1.5 h-4 w-4" /> Đơn hàng
            </Button>
          </Link>
          <Link to="/admin" className="hidden md:inline-flex">
            <Button variant="ghost" size="sm" className="rounded-full">
              <LayoutDashboard className="mr-1.5 h-4 w-4" /> Quản trị
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                3
              </span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}