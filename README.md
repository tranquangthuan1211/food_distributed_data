# Food Delivery — Fullstack App (FE + BE)

Hệ thống quản lý giao đồ ăn trực tuyến. Repo này chứa **Frontend (React)** + **bản sao Backend (Express)** để chạy fullstack chỉ với 1 repo.

> **Backend chính thức** (nơi maintain code) ở thư mục `../food_distributed_be/`.  
> Folder `src/backend/` ở đây là bản sao để chạy tiện. Xem chi tiết ở [`src/backend/README.md`](./src/backend/README.md).

---

## Cấu trúc repo

```
food_distributed_data/                       ← Thư mục này (fullstack)
├── src/
│   ├── api/                    ⭐ FE gọi BE qua đây
│   │   ├── api.request.ts            ← fetch wrapper + JWT header
│   │   ├── food-delivery.api.ts      ← 12 endpoint
│   │   └── user.api.ts               ← login/register
│   ├── components/             ← React components
│   ├── context/
│   │   └── AuthContext.tsx           ⭐ Quản lý token + user info
│   ├── hooks/
│   ├── lib/                    ← FE utilities, mock-data
│   ├── routes/                 ⭐ FE pages (index, login, checkout…)
│   ├── types/                  ← FE TypeScript types
│   ├── utils/
│   │   └── auth-storage.ts           ⭐ localStorage cho token
│   ├── server.ts               ← SSR entry (TanStack Start)
│   └── backend/                ⚠️ BẢN SAO BE — xem src/backend/README.md
│       ├── app.js                    (entry point)
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── swagger/
├── .env                       ← VITE_API_BASE_URL=http://localhost:3000/api
├── vite.config.ts             ← Proxy /api → localhost:3000
├── package.json
├── Dockerfile                 ← CMD ["node", "src/backend/app.js"]
├── docker-compose.yml
└── start.sh                   ← Script chạy fullstack local

food_distributed_be/           ← BE chính (maintain ở đây)
└── src/                       (giống hệt src/backend/ ở trên)
```

## Cách chạy

### Cách 1 — Fullstack (1 repo) — KHUYẾN NGHỊ

```bash
cd food_distributed_data
docker compose up -d mongo redis cassandra neo4j   # Bật 4 database
npm install
npm run dev:all                                   # Chạy BE + FE cùng lúc
```

Mở trình duyệt:
- FE: http://localhost:5173
- BE Swagger: http://localhost:3000/api-docs

### Cách 2 — Chạy riêng từng phần (nên dùng khi dev BE)

**Terminal 1 — Backend:**
```bash
cd food_distributed_be
docker compose up --build
```

**Terminal 2 — Frontend:**
```bash
cd food_distributed_data
npm install
npm run dev
```

FE sẽ tự proxy `/api/*` → `localhost:3000` (xem `vite.config.ts`).

### Cách 3 — Hoàn toàn với Docker

```bash
cd food_distributed_data
docker compose up --build
```

---

## Luồng FE ↔ BE

```
[ FE page ]  ──import──▶  src/api/food-delivery.api.ts  ──fetch──▶  /api/...
   │                                                                      │
   │                                                                      ▼
   │                                                          Vite proxy / vite.config.ts
   │                                                                      │
   ▼                                                                      ▼
useAuth() ◀──localStorage── auth-storage.ts          food_distributed_be / docker
```

**Token JWT:** Lưu trong `localStorage` qua `src/utils/auth-storage.ts`. Mỗi request có header `Authorization: Bearer <token>`.

**Endpoints đã tích hợp:**

| Page FE | API BE | Hàm gọi |
|---------|--------|---------|
| `/login` | POST `/api/users/login` | `loginUser()` |
| `/register` | POST `/api/users/register` | `registerUser()` |
| `/checkout` | POST `/api/orders` | `createOrder()` |
| `/orders` | GET `/api/users/:id/orders` | `getUserOrders()` |
| `/orders/$id` | (filter từ getUserOrders) | `getUserOrders()` |
| `/api-demo` | POST `/api/users/login`, GET `/api/restaurants` | `loginUser()`, `getRestaurants()` |

Các page còn lại (home, cart, restaurants, admin, profile) **tạm dùng mock-data** trong `src/lib/mock-data.ts` — có thể tích hợp thêm sau.

---

## Folder BE — bản sao vs bản chính

- **Bản chính:** `../food_distributed_be/` — sửa logic BE ở đây, sau đó copy sang.
- **Bản sao:** `src/backend/` — chỉ để chạy local khi không muốn dùng folder BE.

Xem chi tiết ở [`src/backend/README.md`](./src/backend/README.md).

---

## Scripts

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Chạy FE Vite (port 5173) |
| `npm run dev:backend` | Chạy `src/backend/app.js` (port 3000) |
| `npm run dev:all` | Chạy cả 2 cùng lúc |
| `npm run build` | Build FE production |
| `npm run start` | Chạy backend production |
| `./start.sh` | Script tự động bật DB + chạy cả 2 |

---

## Khi gặp bug

| Triệu chứng | Kiểm tra ở đâu |
|-------------|---------------|
| Trang trắng, lỗi Vite | `src/routes/*.tsx`, `vite.config.ts` |
| Lỗi fetch / 404 / 500 | `src/api/*.ts`, terminal BE `food_distributed_be` |
| Token không gửi | `src/utils/auth-storage.ts`, `src/api/api.request.ts` |
| User state sai | `src/context/AuthContext.tsx` |
| Lỗi BE | `food_distributed_be/src/` (hoặc `src/backend/` nếu đang chạy fullstack 1 repo) |
| Lỗi Mongo/Redis/Cassandra/Neo4j | `docker compose ps` + logs từng container |