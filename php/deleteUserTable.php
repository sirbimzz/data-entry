<?php 

include 'config/conn.php';

$tableName=$_POST['tableName'];
$sql = "DELETE FROM dataUsers WHERE tableName='$tableName'";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>