-- Tạo database
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- Tạo bảng users (người dùng)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng products (sản phẩm)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    new_price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    tag VARCHAR(100)
);

-- Tạo bảng product_sizes (kích thước sản phẩm)
CREATE TABLE IF NOT EXISTS product_sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    size VARCHAR(10) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tạo bảng orders (đơn hàng)
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tạo bảng order_items (chi tiết đơn hàng)
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    size VARCHAR(10) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tạo bảng promo_codes (mã giảm giá)
CREATE TABLE IF NOT EXISTS promo_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount_percent INT NOT NULL,
    min_amount DECIMAL(10, 2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP NULL
);

-- Thêm mã giảm giá mẫu
INSERT INTO promo_codes (code, discount_percent) VALUES ('SALE20', 20);

-- Thêm một số tài khoản người dùng mẫu
INSERT INTO users (fullname, email, password, phone) VALUES 
('Nguyễn Văn A', 'admin@example.com', '$2a$10$j2y1YpxKP3ZA3Tc9csnoNukBg9rGdO7Lfm5Pf4NyajriR/2KqQJ1y', '0987654321'); -- Password: admin123

-- Thêm dữ liệu mẫu cho sản phẩm từ dataset
-- Sản phẩm nữ
INSERT INTO products (id, name, category, image, new_price, old_price, description, tag) VALUES 
(1, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', 'Nữ', 'product_1.png', 50.00, 80.50, 'Áo blouse nữ thanh lịch với tay áo bồng bềnh và cổ áo chồng chéo, thiết kế peplum tạo điểm nhấn nữ tính, phù hợp cho cả công sở và dạo phố.', 'latest');

INSERT INTO products (id, name, category, image, new_price, old_price, description, tag) VALUES 
(2, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', 'Nữ', 'product_2.png', 85.00, 120.50, 'Thiết kế áo blouse nữ với họa tiết sọc thời thượng, tay áo flutter mềm mại, mang lại vẻ ngoài tinh tế và hiện đại.', 'new collection');

INSERT INTO products (id, name, category, image, new_price, old_price, description, tag) VALUES 
(3, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', 'Nữ', 'product_3.png', 60.00, 100.50, 'Áo blouse nữ với chi tiết cổ áo độc đáo và vạt áo peplum, mang đến phong cách nhẹ nhàng, phù hợp cho mọi dịp.', 'latest');

INSERT INTO products (id, name, category, image, new_price, old_price, description, tag) VALUES 
(4, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', 'Nữ', 'product_4.png', 100.00, 150.00, 'Áo blouse nữ cao cấp với thiết kế sọc tinh tế, tay áo bồng và cổ áo chồng chéo, lý tưởng cho phong cách thời trang hiện đại.', 'sale');

-- Sản phẩm nam
INSERT INTO products (id, name, category, image, new_price, old_price, description, tag) VALUES 
(13, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', 'Nam', 'product_13.png', 85.00, 120.50, 'Áo khoác bomber nam màu xanh lá với thiết kế khóa kéo toàn phần, form slim fit, mang lại vẻ ngoài năng động và hiện đại.', 'latest');

INSERT INTO products (id, name, category, image, new_price, old_price, description, tag) VALUES 
(14, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', 'Nam', 'product_14.png', 85.00, 120.50, 'Áo khoác bomber nam với thiết kế tối giản, màu xanh lá nổi bật, phù hợp cho phong cách casual hoặc dạo phố.', 'new collection');

INSERT INTO products (id, name, category, image, new_price, old_price, description, tag) VALUES 
(15, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', 'Nam', 'product_15.png', 85.00, 120.50, 'Áo khoác bomber nam slim fit với khóa kéo chắc chắn, mang đến phong cách mạnh mẽ và thời thượng.', 'new collection');

-- Sản phẩm trẻ em
INSERT INTO products (id, name, category, image, new_price, old_price, description, tag) VALUES 
(25, 'Boys Orange Colourblocked Hooded Sweatshirt', 'Trẻ Em', 'product_25.png', 85.00, 120.50, 'Áo hoodie trẻ em màu cam với thiết kế phối màu độc đáo, có mũ trùm, mang lại sự năng động và thoải mái cho bé.', 'latest');

INSERT INTO products (id, name, category, image, new_price, old_price, description, tag) VALUES 
(26, 'Boys Orange Colourblocked Hooded Sweatshirt', 'Trẻ Em', 'product_26.png', 85.00, 120.50, 'Áo hoodie trẻ em với màu cam nổi bật, thiết kế mũ trùm tiện lợi, phù hợp cho các hoạt động vui chơi ngoài trời.', 'sale');

INSERT INTO products (id, name, category, image, new_price, old_price, description, tag) VALUES 
(27, 'Boys Orange Colourblocked Hooded Sweatshirt', 'Trẻ Em', 'product_27.png', 85.00, 120.50, 'Áo hoodie trẻ em màu cam trẻ trung, thiết kế phối màu hiện đại, mang lại phong cách năng động cho bé.', 'latest');

-- Thêm size cho sản phẩm nữ
INSERT INTO product_sizes (product_id, size) VALUES (1, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (1, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (1, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (1, 'XL');

INSERT INTO product_sizes (product_id, size) VALUES (2, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (2, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (2, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (2, 'XL');

INSERT INTO product_sizes (product_id, size) VALUES (3, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (3, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (3, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (3, 'XL');

INSERT INTO product_sizes (product_id, size) VALUES (4, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (4, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (4, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (4, 'XL');

-- Thêm size cho sản phẩm nam
INSERT INTO product_sizes (product_id, size) VALUES (13, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (13, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (13, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (13, 'XXL');

INSERT INTO product_sizes (product_id, size) VALUES (14, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (14, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (14, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (14, 'XXL');

INSERT INTO product_sizes (product_id, size) VALUES (15, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (15, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (15, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (15, 'XXL');

-- Thêm size cho sản phẩm trẻ em
INSERT INTO product_sizes (product_id, size) VALUES (25, '3-4Y');
INSERT INTO product_sizes (product_id, size) VALUES (25, '5-6Y');
INSERT INTO product_sizes (product_id, size) VALUES (25, '7-8Y');
INSERT INTO product_sizes (product_id, size) VALUES (25, '9-10Y');

INSERT INTO product_sizes (product_id, size) VALUES (26, '3-4Y');
INSERT INTO product_sizes (product_id, size) VALUES (26, '5-6Y');
INSERT INTO product_sizes (product_id, size) VALUES (26, '7-8Y');
INSERT INTO product_sizes (product_id, size) VALUES (26, '9-10Y');

INSERT INTO product_sizes (product_id, size) VALUES (27, '3-4Y');
INSERT INTO product_sizes (product_id, size) VALUES (27, '5-6Y');
INSERT INTO product_sizes (product_id, size) VALUES (27, '7-8Y');
INSERT INTO product_sizes (product_id, size) VALUES (27, '9-10Y'); 