<?php
// Cấu hình CORS để cho phép frontend kết nối
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Kết nối database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecommerce";

$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Kết nối database thất bại: " . $conn->connect_error
    ]));
}
$conn->set_charset("utf8");

// Lấy request method và endpoint
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));
$endpoint = $request[0] ?? "";

// Xử lý API
switch ($endpoint) {
    case 'login':
        require_once 'login.php';
        break;
    case 'register':
        require_once 'register.php';
        break;
    case 'products':
        require_once 'products.php';
        break;
    case 'cart':
        require_once 'cart.php';
        break;
    case 'orders':
        require_once 'orders.php';
        break;
    default:
        // API không tồn tại
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "API không tồn tại"
        ]);
} 