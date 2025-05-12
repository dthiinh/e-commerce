# Hướng dẫn cài đặt và chạy website E-commerce trên XAMPP

## Yêu cầu hệ thống
- XAMPP (với Apache, MySQL, PHP)
- Node.js và npm

## Bước 1: Cài đặt XAMPP
1. Tải và cài đặt XAMPP từ [trang chủ](https://www.apachefriends.org/index.html)
2. Khởi động XAMPP Control Panel và bật Apache, MySQL

## Bước 2: Thiết lập database
1. Mở trình duyệt và truy cập http://localhost/phpmyadmin
2. Tạo mới database với tên "ecommerce_shop"
3. Chọn tab "Import", chọn file `database.sql` và nhấn "Go"

## Bước 3: Cài đặt backend
1. Tạo thư mục `ecommerce-api` trong thư mục `htdocs` của XAMPP (thường là `C:\xampp\htdocs\ecommerce-api` trên Windows hoặc `/Applications/XAMPP/htdocs/ecommerce-api` trên macOS)
2. Copy các file từ thư mục `backend` vào thư mục `ecommerce-api`

## Bước 4: Cài đặt frontend
1. Mở terminal và truy cập vào thư mục frontend của dự án
2. Chạy lệnh `npm install` để cài đặt các thư viện
3. Mở file `frontend/src/Config/apiConfig.js` và chỉnh sửa API_BASE_URL thành `http://localhost/ecommerce-api`

## Bước 5: Kết nối frontend với backend
Tạo file `frontend/src/Config/apiConfig.js` với nội dung:

```javascript
export const API_BASE_URL = 'http://localhost/ecommerce-api';

export const API_ENDPOINTS = {
  LOGIN: '/login.php',
  REGISTER: '/register.php',
  PRODUCTS: '/products.php',
  ORDER: '/order.php'
};
```

Sửa các file trong frontend để sử dụng API thay vì localStorage, ví dụ:

```jsx
// Thay đổi trong LoginSignup.jsx
const handleLogin = async (e) => {
  e.preventDefault();
  if (validateLoginForm()) {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData.login)
      });
      
      const data = await response.json();
      
      if (data.status) {
        localStorage.setItem('loggedInUser', JSON.stringify(data.data));
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      alert('Đăng nhập thất bại. Vui lòng thử lại sau.');
    }
  }
};
```

## Bước 6: Chạy ứng dụng
1. Trong thư mục frontend, chạy lệnh `npm start`
2. Truy cập ứng dụng tại http://localhost:3000

## Tài khoản mẫu
- Email: user1@example.com
- Password: 123456

## Lưu ý
- Đảm bảo XAMPP đang chạy khi sử dụng ứng dụng
- Nếu có lỗi CORS, hãy kiểm tra headers trong các file PHP của backend
- Trong môi trường thực tế, nên bổ sung JWT hoặc Session để xác thực người dùng 