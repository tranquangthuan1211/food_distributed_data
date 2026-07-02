import banhmiImg from "@/assets/dish-banhmi.jpg";
import comtamImg from "@/assets/dish-comtam.jpg";
import phoImg from "@/assets/dish-pho.jpg";
import springrollsImg from "@/assets/dish-springrolls.jpg";
import rest1 from "@/assets/rest-1.jpg";
import rest2 from "@/assets/rest-2.jpg";
import rest3 from "@/assets/rest-3.jpg";
import rest4 from "@/assets/rest-4.jpg";

export type Dish = {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  category: string;
  rating: number;
  hot?: boolean;
};

export type Restaurant = {
  id: string;
  name: string;
  cover: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  distance: string;
  fee: string;
  promo?: string;
  address: string;
};

export const restaurants: Restaurant[] = [
  { id: "r1", name: "Phở Hà Nội - Cụ Long", cover: rest1, cuisine: "Phở · Bún · Việt Nam", rating: 4.9, reviews: 1280, deliveryTime: "20-25 phút", distance: "1.2 km", fee: "15.000₫", promo: "Giảm 30k", address: "12 Lê Lợi, Q.1, TP.HCM" },
  { id: "r2", name: "Bếp Mộc Hiện Đại", cover: rest2, cuisine: "Cơm văn phòng · Healthy", rating: 4.7, reviews: 890, deliveryTime: "25-30 phút", distance: "2.4 km", fee: "20.000₫", promo: "Freeship", address: "45 Nguyễn Huệ, Q.1" },
  { id: "r3", name: "Quán Nướng Cô Ba", cover: rest3, cuisine: "Nướng · Đồ ăn vặt", rating: 4.8, reviews: 2105, deliveryTime: "15-20 phút", distance: "0.8 km", fee: "12.000₫", address: "78 Phạm Ngũ Lão, Q.1" },
  { id: "r4", name: "TocoToco Trà Sữa", cover: rest4, cuisine: "Trà sữa · Tráng miệng", rating: 4.6, reviews: 3420, deliveryTime: "15-20 phút", distance: "1.5 km", fee: "10.000₫", promo: "Mua 1 tặng 1", address: "200 Võ Văn Tần, Q.3" },
  { id: "r5", name: "Bún Bò Huế O Phượng", cover: rest2, cuisine: "Bún bò · Huế", rating: 4.7, reviews: 1560, deliveryTime: "25-30 phút", distance: "2.0 km", fee: "18.000₫", promo: "Freeship đơn từ 100k", address: "88 Trần Hưng Đạo, Q.5" },
];

export const dishes: Dish[] = [
  { id: "d1", name: "Phở bò tái nạm", desc: "Nước dùng đậm đà, thịt bò mềm thơm", price: 65000, img: phoImg, category: "Phở & Bún", rating: 4.9, hot: true },
  { id: "d2", name: "Phở gà ta", desc: "Gà ta dai ngọt, nước trong thanh", price: 60000, img: phoImg, category: "Phở & Bún", rating: 4.8 },
  { id: "d3", name: "Bánh mì thịt nướng", desc: "Bánh giòn, thịt nướng thơm lừng", price: 35000, img: banhmiImg, category: "Bánh mì", rating: 4.8 },
  { id: "d4", name: "Bánh mì chả cá", desc: "Chả cá Nha Trang, rau thơm", price: 32000, img: banhmiImg, category: "Bánh mì", rating: 4.6 },
  { id: "d5", name: "Gỏi cuốn tôm thịt", desc: "Tươi mát, nước chấm đặc biệt", price: 45000, img: springrollsImg, category: "Khai vị", rating: 4.7 },
  { id: "d6", name: "Cơm tấm sườn bì chả", desc: "Sườn nướng, trứng ốp la, bì chả", price: 55000, img: comtamImg, category: "Cơm", rating: 4.9, hot: true },
  { id: "d7", name: "Cơm gà xối mỡ", desc: "Da gà giòn rụm, cơm thơm", price: 50000, img: comtamImg, category: "Cơm", rating: 4.7 },
  { id: "d8", name: "Phở xào bò", desc: "Phở áp chảo cùng bò xào rau", price: 70000, img: phoImg, category: "Phở & Bún", rating: 4.5 },
  { id: "d9", name: "Bún bò Huế", desc: "Nước dùng cay nồng đậm đà chuẩn vị Huế", price: 60000, img: phoImg, category: "Phở & Bún", rating: 4.7 },
  { id: "d10", name: "Bún chả Hà Nội", desc: "Thịt nướng thơm lừng, nước chấm chua ngọt", price: 55000, img: phoImg, category: "Phở & Bún", rating: 4.8, hot: true },
];

export type OrderStatus = "placed" | "confirmed" | "preparing" | "delivering" | "completed" | "cancelled";

export type Order = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  cover: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  placedAt: string;
  eta: string;
  address: string;
  payment: string;
};

export const orders: Order[] = [
  {
    id: "BN240615001",
    restaurantId: "r1",
    restaurantName: "Phở Hà Nội - Cụ Long",
    cover: rest1,
    items: [
      { name: "Phở bò tái nạm", qty: 2, price: 65000 },
      { name: "Gỏi cuốn tôm thịt", qty: 1, price: 45000 },
    ],
    total: 190000,
    status: "delivering",
    placedAt: "Hôm nay, 12:35",
    eta: "12:55",
    address: "227 Nguyễn Văn Cừ, Q.5, TP.HCM",
    payment: "Ví điện tử MoMo",
  },
  {
    id: "BN240614027",
    restaurantId: "r3",
    restaurantName: "Quán Nướng Cô Ba",
    cover: rest3,
    items: [
      { name: "Nướng xiên thập cẩm", qty: 3, price: 40000 },
    ],
    total: 132000,
    status: "completed",
    placedAt: "Hôm qua, 19:12",
    eta: "19:35",
    address: "227 Nguyễn Văn Cừ, Q.5, TP.HCM",
    payment: "Tiền mặt",
  },
  {
    id: "BN240612009",
    restaurantId: "r4",
    restaurantName: "TocoToco Trà Sữa",
    cover: rest4,
    items: [
      { name: "Trà sữa trân châu", qty: 2, price: 45000 },
    ],
    total: 100000,
    status: "cancelled",
    placedAt: "12/06, 14:20",
    eta: "—",
    address: "227 Nguyễn Văn Cừ, Q.5, TP.HCM",
    payment: "Ví ZaloPay",
  },
];

/**
 * Định dạng số thành chuỗi tiền Việt Nam (VND) với ký tự ₫ ở cuối.
 *
 * @param n - Số tiền cần định dạng (đơn vị VND)
 * @returns Chuỗi đã định dạng theo locale vi-VN, ví dụ `65000` → `"65.000₫"`
 *
 * @example
 * formatVND(65000); // "65.000₫"
 */
export const formatVND = (n: number) =>
  n.toLocaleString("vi-VN") + "₫";