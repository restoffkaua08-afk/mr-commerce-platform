<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'config/Database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$request = isset($_SERVER['PATH_INFO']) ? explode('/', trim($_SERVER['PATH_INFO'], '/')) : [];

if ($method !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Simple product model
class ProductModel {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    public function getAll($search = null, $marca = null) {
        $sql = "SELECT * FROM products WHERE 1=1";
        $params = [];
        
        if ($search) {
            $sql .= " AND (nome LIKE :search OR marca LIKE :search OR categoria LIKE :search)";
            $params[':search'] = "%{$search}%";
        }
        
        if ($marca) {
            $sql .= " AND marca = :marca";
            $params[':marca'] = $marca;
        }
        
        $sql .= " ORDER BY created_at DESC";
        
        $stmt = $this->conn->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getById($id) {
        $sql = "SELECT * FROM products WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function getMarcas() {
        $sql = "SELECT DISTINCT marca FROM products ORDER BY marca";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
}

$productModel = new ProductModel($db);

// Route handling
if (empty($request) || $request[0] === 'produtos') {
    if (isset($_GET['id'])) {
        $product = $productModel->getById($_GET['id']);
        if ($product) {
            echo json_encode($product);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Product not found']);
        }
    } else {
        $search = $_GET['busca'] ?? null;
        $marca = $_GET['marca'] ?? null;
        $products = $productModel->getAll($search, $marca);
        echo json_encode($products);
    }
} elseif ($request[0] === 'marcas') {
    $marcas = $productModel->getMarcas();
    echo json_encode($marcas);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}
?>