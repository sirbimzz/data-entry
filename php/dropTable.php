<?php 

	include 'config/conn.php';

	$dataTable=$_POST['dataTable'];

	$sql = "DROP TABLE $dataTable";

	if ($conn->query( $sql )) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}

?>