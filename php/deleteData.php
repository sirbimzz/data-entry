<?php 

include 'config/conn.php';

$currTable=$_COOKIE['currTable'];

$id=$_POST['id'];
$sql = "DELETE FROM $currTable WHERE id=$id";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>