# Đóng góp

Cảm ơn bạn đã quan tâm đến việc đóng góp cho **Bếp Nhà**! 🎉

## Quy trình

1. **Fork** repo và tạo branch mới từ `main`: `git checkout -b feat/ten-tinh-nang`
2. **Cài đặt** dependencies: `bun install`
3. **Code** theo style đã có (xem `.editorconfig` và Prettier config)
4. **Lint & typecheck** trước khi commit: `bun lint && bun typecheck`
5. **Commit** với message rõ ràng, dùng prefix: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`
6. **Push** branch và mở **Pull Request** mô tả rõ thay đổi

## Quy tắc

- Giữ commit nhỏ, tập trung vào một thay đổi logic
- Cập nhật `CHANGELOG.md` nếu thay đổi ảnh hưởng tới người dùng
- Đặt tên biến/hàm bằng tiếng Anh, comment bằng tiếng Việt nếu muốn
- Ưu tiên dùng component có sẵn trong `src/components/ui` thay vì tự viết

Có thắc mắc? Tạo issue trước khi bắt đầu làm nhé!