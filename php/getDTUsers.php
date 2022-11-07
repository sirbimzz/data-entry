<?php 
  $servername = "BNY-S-560";
  $username = "Abimbola.Salami";
  $password = "NLNG@3070";
  $database = "iocDB";
  $port = "1433";
  $conn="";
  try {
      $conn = new PDO("sqlsrv:server=$servername;Database=$database;", $username, $password
      );
  } catch (PDOException $e) {
      echo ("Error connecting to SQL Server: " . $e->getMessage());
  }

  $query = 'SELECT * FROM dataUsers';   
  $stmt = $conn->query( $query );
  $data = $stmt->fetchAll( PDO::FETCH_ASSOC );

  echo json_encode($data);

?>