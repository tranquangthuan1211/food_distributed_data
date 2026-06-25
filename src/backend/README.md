# ⚠️ Backend duplicate — đọc kỹ trước khi sửa

## Folder này là gì?

Folder `src/backend/` chứa **bản sao của code backend** từ thư mục `../../food_distributed_be/`. Nó được giữ lại ở đây vì **trước đó FE build fullstack (1 repo cho cả 2)**, để:

1. Có thể chạy nhanh chỉ với 1 repo (`npm run dev:all`).
2. Không phá vỡ `Dockerfile` / `start.sh` đã có.

## Nguồn chính thức

**Code backend chính nằm ở:** `../../food_distributed_be/`

Đó là nơi maintain, fix bug, thêm API mới. Hai folder **nên được sync** khi có thay đổi lớn về BE.

## Mapping cấu trúc

```
food_distributed_be/                  ↔  food_distributed_data/src/backend/
├── src/app.js                              ├── app.js
├── src/config/                             ├── config/
├── src/controllers/                        ├── controllers/
├── src/middleware/                         ├── middleware/
├── src/models/                             ├── models/
├── src/routes/                             ├── routes/
├── src/services/                           ├── services/
└── src/swagger/                            └── swagger/
```

Mọi import trong folder này đều dùng đường dẫn tương đối nội bộ (./config/mongodb, ../controllers/...), nên đã chuyển sang folder mới vẫn chạy được.

## Cách chạy

### Cách 1 — Chạy fullstack (1 repo)

```bash
cd food_distributed_data
docker compose up -d mongo redis cassandra neo4j
npm run dev:backend   # chạy src/backend/app.js
# terminal khác:
npm run dev           # chạy FE Vite
```

Hoặc dùng: `npm run dev:all` (chạy cả 2 cùng lúc).

### Cách 2 — Chạy backend riêng từ folder BE chính (khuyến nghị cho dev)

```bash
cd food_distributed_be
docker compose up --build
```

Sau đó FE ở `food_distributed_data` sẽ tự proxy `/api` → `localhost:3000`.

## Lúc nào sửa file ở đây?

- ❌ **KHÔNG** sửa logic backend ở đây — sửa ở `food_distributed_be/` rồi copy sang.
- ✅ Chỉ sửa khi muốn đổi đường dẫn import nội bộ (ví dụ folder này được dời chỗ khác).

## FE gọi BE như thế nào?

FE trong `src/` (file `.tsx`) **KHÔNG đụng** tới folder này. Mọi HTTP call đều qua:

- `src/api/food-delivery.api.ts` — 12 endpoint đầy đủ
- `src/api/user.api.ts` — login/register
- `src/api/api.request.ts` — fetch wrapper + JWT header

Vite proxy config trong `vite.config.ts`:
```ts
server: {
  proxy: { '/api': { target: 'http://localhost:3000', changeOrigin: true } }
}
```

Nên từ FE, gọi `/api/users/login` → tự động redirect sang `localhost:3000/api/users/login`.