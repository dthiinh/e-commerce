<?php
// Xử lý API đơn hàng
if ($method === 'GET') {
    // Cần có authentication để lấy đơn hàng
    $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;
    
    if (!$user_id) {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Bạn chưa đăng nhập"
        ]);
        exit;
    }
    
    // Lấy đơn hàng của user
    $stmt = $conn->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $order_id = $row['id'];
        
        // Lấy chi tiết đơn hàng
        $items_stmt = $conn->prepare("
            SELECT oi.*, p.name, p.image 
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        ");
        $items_stmt->bind_param("i", $order_id);
        $items_stmt->execute();
        $items_result = $items_stmt->get_result();
        
        $items = [];
        while ($item = $items_result->fetch_assoc()) {
            $items[] = $item;
        }
        
        $row['items'] = $items;
        $orders[] = $row;
        
        $items_stmt->close();
    }
    
    echo json_encode([
        "success" => true,
        "orders" => $orders
    ]);
    
    $stmt->close();
} elseif ($method === 'POST') {
    // Tạo đơn hàng mới
    $data = json_decode(file_get_contents("php://input"));
    
    // Kiểm tra dữ liệu
    if (!isset($data->user_id) || !isset($data->items) || !isset($data->shipping_info) || !isset($data->payment_method)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Thiếu thông tin đơn hàng"
        ]);
        exit;
    }
    
    // Bắt đầu transaction
    $conn->begin_transaction();
    
    try {
        $user_id = $data->user_id;
        $fullname = $data->shipping_info->fullname;
        $email = $data->shipping_info->email;
        $phone = $data->shipping_info->phone;
        $address = $data->shipping_info->address;
        $city = $data->shipping_info->city;
        $total_amount = $data->total_amount;
        $payment_method = $data->payment_method;
        
        // Tạo đơn hàng
        $stmt = $conn->prepare("
            INSERT INTO orders (user_id, fullname, email, phone, address, city, total_amount, payment_method)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->bind_param("isssssds", $user_id, $fullname, $email, $phone, $address, $city, $total_amount, $payment_method);
        $stmt->execute();
        
        $order_id = $conn->insert_id;
        
        // Thêm chi tiết đơn hàng
        foreach ($data->items as $item) {
            $product_id = $item->id;
            $size = $item->size;
            $quantity = $item->quantity;
            $price = $item->price;
            
            $item_stmt = $conn->prepare("
                INSERT INTO order_items (order_id, product_id, size, quantity, price)
                VALUES (?, ?, ?, ?, ?)
            ");
            
            $item_stmt->bind_param("iisid", $order_id, $product_id, $size, $quantity, $price);
            $item_stmt->execute();
            $item_stmt->close();
        }
        
        // Commit transaction
        $conn->commit();
        
        echo json_encode([
            "success" => true,
            "message" => "Đặt hàng thành công",
            "order_id" => $order_id
        ]);
        
        $stmt->close();
    } catch (Exception $e) {
        // Rollback transaction nếu có lỗi
        $conn->rollback();
        
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Đặt hàng thất bại: " . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method không được hỗ trợ"
    ]);
} 