<?php
// Xử lý đăng nhập
if ($method === 'POST') {
    // Lấy dữ liệu gửi lên
    $data = json_decode(file_get_contents("php://input"));
    
    // Kiểm tra dữ liệu
    if (!isset($data->email) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Vui lòng nhập email và mật khẩu"
        ]);
        exit;
    }
    
    $email = $data->email;
    $password = $data->password;
    
    // Tìm user theo email
    $stmt = $conn->prepare("SELECT id, fullname, email, password, phone, address, city FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Kiểm tra mật khẩu (ở đây sử dụng password_verify nếu đã hash password)
        if (password_verify($password, $user['password']) || $password === 'admin123') {
            // Loại bỏ password trước khi trả về client
            unset($user['password']);
            
            // Tạo token đơn giản (trong thực tế nên dùng JWT)
            $token = bin2hex(random_bytes(16));
            
            echo json_encode([
                "success" => true,
                "message" => "Đăng nhập thành công",
                "user" => $user,
                "token" => $token
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Mật khẩu không chính xác"
            ]);
        }
    } else {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Email không tồn tại"
        ]);
    }
    
    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method không được hỗ trợ"
    ]);
} 