<?php 
include 'config/conn.php';

$query = 'SELECT * FROM mailLog';   
$stmt = $conn->query( $query );   
$data = array();
while ( $row = $stmt->fetch( PDO::FETCH_ASSOC ) ){ 
  $row_array['id'] = $row['id'];
  $row_array['logDate'] = $row['logDate'];
  $row_array['noODue'] = $row['noODue'];
  $row_array['noADue'] = $row['noADue'];
       
  array_push($data, $row_array);
}
echo json_encode($data);

?>