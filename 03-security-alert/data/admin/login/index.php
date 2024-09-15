<?php
if (($_POST["user"] ?? '') === "admin" && ($_POST["pass"] ?? '') === "Scrambled") {
    die("Welcome admin of TAMA{Jaakuna tokage Corp}");
} else if ($_SERVER['REQUEST_METHOD'] !== "GET") {
    die("Sorry couldn't understand!");
}

?><html>
<head>
    <title>Admin Login page</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        html, body {
            background-color: black;
            color: white;
        }

        #box {
            border: 1px solid #ccc;
            padding: 20px;
        }
    </style>
</head>
<body>
<h1>Admin login page</h1>
<div id="box">
    <form method="post" >
        <input type="text" name="user" placeholder="admin"></input>
        <input type="password" name="pass" placeholder="password"></input>
        <button type="submit">Login</button>
    </form>
</div>
</body>
</html>
