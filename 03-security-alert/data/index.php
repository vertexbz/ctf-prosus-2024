<?php
$uri = preg_replace('/\.\.+$/', '.', $_SERVER["REQUEST_URI"]);
$uri = preg_replace('/\/\/+$/', '/', $uri);
$uri = ltrim($uri, '/');
if (!in_array($uri, ['', 'index.php', 'index.htm', 'index.html'])) {
    if (file_exists($uri)) {
        return false;    // serve the requested resource as-is.
    }
    if (str_starts_with($uri, 'cctv-camera/')) {
        die(file_get_contents(__DIR__ . '/cctv-camera/1/index.html'));
    }
    die("Not Found");
}

?><html>

<head>
    <style>

        body {
            height: 100%;
            background-image: url('./img/security_breach.png');
            /* Use fixed or absolute positioning */
            width: auto;
            /* Cover the entire viewport */
            background-position: center;
            /* Center the image */
            background-repeat: no-repeat;
            /* Do not repeat the image */
            background-color: #001420;
        }
    </style>
</head>
</html>