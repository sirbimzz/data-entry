<?php 

include 'config/conn.php';

$id=$_POST['id'];
$sql = "DELETE FROM dataFields WHERE id=$id";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>