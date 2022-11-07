<?php

  $id = $_SESSION['id'];
  $target_file =  $_FILES['file']['name'];
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

  if ($_FILES['file']['name'] ==""){
    echo json_encode(array("statusCode"=>205));
  }

  // Check file size
  else if ($_FILES['file']['size'] > 5000000) {
    //echo "Sorry, your file is too large.";
    echo json_encode(array("statusCode"=>202));
    $uploadOk = 0;
  }

  // Allow certain file formats
  else if($imageFileType != "csv" && $imageFileType != "CSV") {
    //echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    echo json_encode(array("statusCode"=>203));
    $uploadOk = 0;
  }
  
  else {

    /*if(!is_dir("filer/".$id."/")) {
      mkdir("filer/".$id); 
    }*/

    /*$rawBaseName = pathinfo($target_file, PATHINFO_FILENAME );
    $extension = pathinfo($target_file, PATHINFO_EXTENSION );
    $counter = 0;
    while(file_exists("uploads/".$id."/".$target_file)) {
        $target_file = $rawBaseName . '_' . $counter . '.' . $extension;
        $counter++;
    };*/
    $target_file = 'batch_file.csv';
    move_uploaded_file($_FILES['file']['tmp_name'],"uploads/".$id."/".$target_file);
    echo json_encode(array("statusCode"=>200, "fileName"=>$target_file));


    /*if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
      //echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
      echo json_encode(array("statusCode"=>200, "fileName"=>$_FILES['file']['name']));
    } else {
      //echo "Sorry, there was an error uploading your file.";
      echo json_encode(array("statusCode"=>204));
    }*/
  }

?>