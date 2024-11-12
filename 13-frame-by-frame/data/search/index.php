<?php
error_reporting(0);
session_start();
if (empty($_SESSION['logged-in']) || $_SESSION['logged-in'] < 2) {
    die('Sorry, you must be logged in to view this page!');
}

$q = json_decode(file_get_contents("php://input"),true) ?? '';

if (empty($q)) {
    header('Content-Type: text/html; charset=utf-8');
    die('[]');
}

$db = new SQLite3('/tama.sqlite');

$result = $db->query(sprintf("SELECT id, name, city, street, description FROM cameras WHERE city='%s'", $q));

$data = [];
while ($row = $result->fetchArray()) {
    $data[]= [
        'id' => $row[0],
        'name' => $row[1],
        'city' => $row[2],
        'street' => $row[3],
        'description' => $row[4],
    ];
}

if (empty($data)) {
    header('HTTP/1.0 404 Not Found');
    die('Sorry couldn\'t find any Cameras with that query!');
}

header('Content-Type: text/html; charset=utf-8');
echo json_encode($data);
