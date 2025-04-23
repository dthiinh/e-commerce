<?php
// Xử lý đăng ký tài khoản
if ($method === 'POST') {
    // Lấy dữ liệu gửi lên
    $data = json_decode(file_get_contents("php://input"));
    
    // Kiểm tra dữ liệu
    if (!isset($data->fullname) || !isset($data->email) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Vui lòng nhập đầy đủ thông tin"
        ]);
        exit;
    }
    
    $fullname = $data->fullname;
    $email = $data->email;
    $password = $data->password;
    $phone = $data->phone ?? '';
    
    // Kiểm tra email đã tồn tại chưa
    $check_stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check_stmt->bind_param("s", $email);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();
    
    if ($check_result->num_rows > 0) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Email đã được sử dụng"
        ]);
        $check_stmt->close();
        exit;
    }
    $check_stmt->close();
    
    // Mã hóa mật khẩu
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Thêm user mới
    $stmt = $conn->prepare("INSERT INTO users (fullname, email, password, phone) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $fullname, $email, $hashed_password, $phone);
    
    if ($stmt->execute()) {
        $user_id = $conn->insert_id;
        
        echo json_encode([
            "success" => true,
            "message" => "Đăng ký thành công",
            "user_id" => $user_id
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Đăng ký thất bại: " . $stmt->error
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