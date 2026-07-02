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

## Scripts

| Lệnh | Mô tả |
| --- | --- |
| `bun dev` | Chạy server dev (Vite) |
| `bun build` | Build production |
| `bun build:dev` | Build ở chế độ development |
| `bun preview` | Preview bản build |
| `bun lint` | Chạy ESLint kiểm tra code |
| `bun format` | Format code bằng Prettier |

## Công nghệ sử dụng

- **[TanStack Start](https://tanstack.com/start)** — Framework full-stack với file-based routing
- **[TanStack Router](https://tanstack.com/router)** — Type-safe routing cho React
- **[TanStack React Query](https://tanstack.com/query)** — Quản lý state server và cache
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** — Bộ component nguyên thuỷ, accessible
- **[Lucide React](https://lucide.dev/)** — Bộ icon SVG
- **[React Hook Form](https://react-hook-form.com/)** + **[Zod](https://zod.dev/)** — Quản lý form và validation
- **[Sonner](https://sonner.emilkowal.ski/)** — Toast notification
- **TypeScript** — Ngôn ngữ chính