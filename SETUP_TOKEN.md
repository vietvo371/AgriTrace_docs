# 🔑 Setup Personal Access Token for GitHub Actions

## Vấn đề hiện tại
GitHub Actions bot không có quyền push lên repository. Cần setup Personal Access Token để giải quyết.

## 📋 Bước 1: Tạo Personal Access Token

### 1. Vào GitHub Settings
- Đăng nhập GitHub
- Click avatar → Settings
- Hoặc truy cập: https://github.com/settings

### 2. Tạo Token
- Scroll xuống "Developer settings" (bên trái)
- Click "Personal access tokens"
- Click "Tokens (classic)"
- Click "Generate new token (classic)"

### 3. Cấu hình Token
```
Note: AgriTrace Docs Deployment
Expiration: 90 days (hoặc No expiration)
Scopes:
✅ repo (Full control of private repositories)
✅ workflow (Update GitHub Action workflows)
```

### 4. Copy Token
- Click "Generate token"
- **Copy token ngay lập tức** (sẽ không thấy lại)

## 📋 Bước 2: Thêm Token vào Repository Secrets

### 1. Vào Repository Settings
- Vào repository: https://github.com/vietvo371/AgriTrace_docs
- Click "Settings" tab

### 2. Thêm Secret
- Click "Secrets and variables" → "Actions"
- Click "New repository secret"
- Name: `PERSONAL_ACCESS_TOKEN`
- Value: Paste token đã copy ở trên
- Click "Add secret"

## 📋 Bước 3: Test Deployment

### 1. Push code để trigger workflow
```bash
git add .
git commit -m "test: trigger deployment with token"
git push origin main
```

### 2. Kiểm tra Actions
- Vào repository → Actions tab
- Xem workflow "Deploy Documentation (Token)"
- Đảm bảo không có lỗi permission

## 🔧 Troubleshooting

### Nếu vẫn lỗi permission:
1. **Kiểm tra token scope**: Đảm bảo có `repo` permission
2. **Kiểm tra token expiration**: Token chưa hết hạn
3. **Kiểm tra repository access**: Token có quyền truy cập repository

### Nếu token không hoạt động:
1. **Tạo token mới** với scope đầy đủ
2. **Update secret** trong repository
3. **Trigger workflow** lại

## 🚀 Sau khi setup xong

Workflow sẽ tự động:
- ✅ Build documentation
- ✅ Deploy lên GitHub Pages
- ✅ Update site tại: https://vietvo371.github.io/AgriTrace_docs/

## 📞 Support

Nếu gặp vấn đề:
- **GitHub Docs**: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- **Repository Issues**: Tạo issue trong repository 