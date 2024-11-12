<?php
error_reporting(0);
session_start();
$_POST = json_decode(file_get_contents("php://input"),true);
if (!empty($_POST['user']) || !empty($_POST['pass'])) {
    $username = $_POST['user'] ?? '';
    $password = $_POST['pass'] ?? '';

    try {
        $db = new SQLite3('/users.sqlite');

        $query = sprintf("SELECT username, password FROM users WHERE username='%s' AND password='%s'", $username, $password); // I used sprintf and quoted everything so it is safe 8)
        $result = $db->query($query);

        $row = $result->fetchArray(SQLITE3_ASSOC);

        if ($row) {
            $_SESSION['logged-in'] = 1;

            if ($row['username'] == $username && $row['password'] == $password) {
                $_SESSION['logged-in'] = 2;
            }
        }
    } catch(Throwable $e) {}
}

if (!empty($_SESSION['logged-in'])) {
    header('Location: /portal');
    die('Found. Redirecting to /portal');
}

header('HTTP/1.0 403 Forbidden');
die('Access denied');
