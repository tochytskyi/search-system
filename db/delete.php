<?php


$link = mysql_connect('localhost', 'root', '')
    or die('Connection error: ' . mysql_error());

mysql_select_db('airplanes') or die('Can not select db');
$id = $_POST['id'];

$query = 'DELETE FROM planes WHERE id=' . $id;
mysql_query($query) or die('Can not make query: ' . mysql_error());

mysql_close($link);

echo json_encode(array('ok' => true ));


?>