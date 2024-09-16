<?php
error_reporting(0);
session_start();
header('Content-Type', 'text/html; charset=utf-8');
if (empty($_SESSION['logged-in'])) {
    die('Sorry, you must be logged in to view this page!');
}

$q = $_GET['q'] ?? '';

$db = new SQLite3('/tama.sqlite');

$query = sprintf("SELECT name, tamaType, location FROM eggs WHERE '' = '%s' OR name='%s'", $q, $q);
$result = $db->query($query);

$data = [];
while ($row = $result->fetchArray()) {
    $data[]= $row;
}

if (empty($data)) {
    die('Sorry couldn\'t find any Tamagotchies with that query!');
}
?>
<ul>
<?php foreach ($data as $row):?>
<li><?=$row[0]?>'s Tamagotchi - <?=$row[1]?>: <?=$row[2]?></li>
<?php endforeach?>
</ul>