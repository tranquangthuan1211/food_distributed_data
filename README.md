# Bếp Nhà

Ứng dụng đặt món ăn Việt Nam, giao tận nơi trong 30 phút.

## Giới thiệu

Bếp Nhà là một web app food delivery cho phép người dùng xem thực đơn, đặt món,
theo dõi đơn hàng và quản lý nhà hàng. Được xây dựng với TanStack Start
và Tailwind CSS.

## Cài đặt

```bash
bun install
bun dev
```

Sau đó mở `http://localhost:3000` để xem ứng dụng.

## Cấu trúc thư mục

```
src/
├── api/         # Các hàm gọi API (request, user)
├── assets/      # Hình ảnh tĩnh (món ăn, nhà hàng, hero)
├── components/  # Component dùng chung (Header, Menu, UI kit)
├── hooks/       # Custom React hooks
├── lib/         # Hàm tiện ích, dữ liệu mock, cấu hình server
├── routes/      # File-based routing của TanStack Start
├── types/       # Định nghĩa TypeScript types
├── utils/       # Hàm tiện ích nhỏ (cookie, helper)
├── router.tsx   # Khởi tạo router
├── server.ts    # Server entry point
└── start.ts     # Start script
```