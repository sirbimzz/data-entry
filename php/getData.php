<?php 
  include 'config/conn.php';

  $currTable=$_COOKIE['currTable']; 

  $query = "SELECT * FROM $currTable"; 
  $stmt = $conn->query( $query );
  $data = $stmt->fetchAll( PDO::FETCH_ASSOC );

  echo json_encode($data);

?>