<?php
// Xử lý API sản phẩm
if ($method === 'GET') {
    // Lấy ID sản phẩm từ request URL nếu có
    $product_id = isset($request[1]) ? $request[1] : null;
    
    if ($product_id) {
        // Lấy thông tin chi tiết của 1 sản phẩm
        $stmt = $conn->prepare("
            SELECT p.*, GROUP_CONCAT(ps.size) as sizes 
            FROM products p
            LEFT JOIN product_sizes ps ON p.id = ps.product_id
            WHERE p.id = ?
            GROUP BY p.id
        ");
        $stmt->bind_param("i", $product_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $product = $result->fetch_assoc();
            
            // Chuyển đổi chuỗi sizes thành mảng
            $product['sizes'] = explode(',', $product['sizes']);
            
            echo json_encode([
                "success" => true,
                "product" => $product
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "success" => false,
                "message" => "Sản phẩm không tồn tại"
            ]);
        }
        
        $stmt->close();
    } else {
        // Lấy danh sách sản phẩm
        $category = isset($_GET['category']) ? $_GET['category'] : null;
        $tag = isset($_GET['tag']) ? $_GET['tag'] : null;
        
        $sql = "SELECT * FROM products";
        $params = [];
        $types = "";
        
        $where_conditions = [];
        
        if ($category) {
            $where_conditions[] = "category = ?";
            $params[] = $category;
            $types .= "s";
        }
        
        if ($tag) {
            $where_conditions[] = "tag = ? OR tag LIKE ?";
            $params[] = $tag;
            $params[] = "%$tag%";
            $types .= "ss";
        }
        
        if (count($where_conditions) > 0) {
            $sql .= " WHERE " . implode(" AND ", $where_conditions);
        }
        
        $sql .= " ORDER BY id ASC";
        
        $stmt = $conn->prepare($sql);
        
        if (count($params) > 0) {
            $stmt->bind_param($types, ...$params);
        }
        
        $stmt->execute();
        $result = $stmt->get_result();
        
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        
        echo json_encode([
            "success" => true,
            "products" => $products
        ]);
        
        $stmt->close();
    }
} else {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method không được hỗ trợ"
    ]);
} 