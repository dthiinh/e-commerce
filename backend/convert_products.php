<?php
// Đọc file all_product.js
$content = file_get_contents('../frontend/src/Components/Assests/all_product.js');

// Trích xuất mảng sản phẩm từ nội dung file
preg_match('/let all_product = \[(.*?)\];/s', $content, $matches);

if (empty($matches)) {
    die("Không thể trích xuất dữ liệu sản phẩm từ file");
}

$productsData = $matches[1];

// Tạo mảng chứa các đối tượng sản phẩm
$products = [];
preg_match_all('/{(.*?)},/s', $productsData . ',', $productMatches);

$sql = "-- Thêm dữ liệu sản phẩm\n";

foreach ($productMatches[1] as $productStr) {
    // Trích xuất các trường dữ liệu
    preg_match('/id: (\d+)/', $productStr, $idMatch);
    preg_match('/name: "(.*?)"/', $productStr, $nameMatch);
    preg_match('/category: "(.*?)"/', $productStr, $categoryMatch);
    preg_match('/image: (.*?),/', $productStr, $imageMatch);
    preg_match('/new_price: ([\d\.]+)/', $productStr, $newPriceMatch);
    preg_match('/old_price: ([\d\.]+)/', $productStr, $oldPriceMatch);
    preg_match('/description: "(.*?)"/', $productStr, $descMatch);
    
    if (preg_match('/tag: "(.*?)"/', $productStr, $tagMatch)) {
        $tag = $tagMatch[1];
    } elseif (preg_match('/tag: \[(.*?)\]/', $productStr, $tagMatch)) {
        $tag = str_replace('"', '', $tagMatch[1]);
    } else {
        $tag = '';
    }
    
    if (empty($idMatch) || empty($nameMatch) || empty($categoryMatch)) {
        continue;
    }
    
    $id = $idMatch[1];
    $name = addslashes($nameMatch[1]);
    $category = $categoryMatch[1];
    $image = "product_" . $id . ".png";  // Đơn giản hóa đường dẫn hình ảnh
    $newPrice = $newPriceMatch[1];
    $oldPrice = $oldPriceMatch[1];
    $description = addslashes($descMatch[1] ?? '');
    
    $sql .= "INSERT INTO products (id, name, category, image, new_price, old_price, description, tag) VALUES 
    ($id, '$name', '$category', '$image', $newPrice, $oldPrice, '$description', '$tag');\n";
    
    // Thêm sizes mặc định cho từng loại sản phẩm
    $sizes = [];
    if ($category === 'Nữ') {
        $sizes = ['S', 'M', 'L', 'XL'];
    } else if ($category === 'Nam') {
        $sizes = ['M', 'L', 'XL', 'XXL'];
    } else if ($category === 'Trẻ Em') {
        $sizes = ['3-4Y', '5-6Y', '7-8Y', '9-10Y'];
    }
    
    foreach ($sizes as $size) {
        $sql .= "INSERT INTO product_sizes (product_id, size) VALUES ($id, '$size');\n";
    }
}

// Ghi dữ liệu SQL vào file
file_put_contents('product_data.sql', $sql);

echo "Đã chuyển đổi dữ liệu sản phẩm thành SQL thành công!"; 