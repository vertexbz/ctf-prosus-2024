<?php
error_reporting(0);
session_start();
header('Content-Type', 'text/html; charset=utf-8');
if (!empty($_POST['username']) && !empty($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        $db = new SQLite3('/tama.sqlite');

        $query = sprintf("SELECT count(*) FROM users WHERE username='%s' AND password='%s'", $username, $password); // I used sprintf and quoted everything so it is safe 8)
        $result = $db->query($query);

        $row = $result->fetchArray(SQLITE3_NUM);

        $_SESSION['logged-in'] = intval($row[0]) > 0;
    } catch(Throwable $e) {
        throw $e;
    }
}

if (!empty($_SESSION['logged-in'])) {
    header('Location: /admin');
    die();
}

die('Access denied');
