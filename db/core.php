<?php


$link = mysql_connect('localhost', 'root', '')
    or die('Connection error: ' . mysql_error());

mysql_select_db('airplanes') or die('Can not select db');

$query = 'SELECT * FROM planes';
$result = mysql_query($query) or die('Can not make query: ' . mysql_error());

$planes = array();
while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
	$planes[] = $line;
}
/*
echo "<pre>";
var_dump($planes);
echo "</pre>";
*/
mysql_free_result($result);
mysql_close($link);

echo json_encode($planes);


?>