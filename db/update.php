<?php


$link = mysql_connect('localhost', 'root', '')
    or die('Connection error: ' . mysql_error());

mysql_select_db('airplanes') or die('Can not select db');
$plane = $_POST['plane'];
$plane = json_decode($plane, true);

$query = 'UPDATE planes SET name="' . $plane['name'] . '",'
		.'price=' . $plane['price'] . ','
		.'production=' . $plane['production'] . ','
		.'seats=' . $plane['seats'] . ','
		.'weight=' . $plane['weight'] . ','
		.'img="' . $plane['image'] 
		.'" WHERE id=' . $plane['id'];

mysql_query($query) or die('Can not make query: ' . mysql_error());
mysql_close($link);

echo json_encode(array('ok' => true ));


?>