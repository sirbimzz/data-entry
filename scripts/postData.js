function postDb(postElement) {
    $.ajax({
        url: "php/postData.php",
        type: "POST",
        cache: false,
        data: {
            postElement: postElement                        
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record updated successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not updated.");
            }
            
        }
    });
}


function deleteData(id) {
    $.ajax({
        url: "php/deleteData.php",
        type: "POST",
        cache: false,
        data:{
            id: id
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record deleted successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not deleted.");
            }
            
        }
    });
}

function deleteAll(tableName) {
    $.ajax({
        url: "php/deleteAll.php",
        type: "POST",
        cache: false,
        data:{
            tableName: tableName
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record deleted successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not deleted.");
            }
            
        }
    });
}

function deleteUsers(id) {
    $.ajax({
        url: "php/deleteUser.php",
        type: "POST",
        cache: false,
        data:{
            id: id
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record deleted successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not deleted.");
            }
            
        }
    });
}

function deleteAdmUsers(id) {
    $.ajax({
        url: "php/deleteAdmUser.php",
        type: "POST",
        cache: false,
        data:{
            id: id
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record deleted successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not deleted.");
            }
            
        }
    });
}

function deleteUserTable(tableName) {
    $.ajax({
        url: "php/deleteUserTable.php",
        type: "POST",
        cache: false,
        data:{
            tableName: tableName
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record deleted successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not deleted.");
            }
            
        }
    });
}

function deleteFieldTable(tableName) {
    $.ajax({
        url: "php/deleteFieldTable.php",
        type: "POST",
        cache: false,
        data:{
            tableName: tableName
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record deleted successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not deleted.");
            }
            
        }
    });
}

function deleteField(id) {
    $.ajax({
        url: "php/deleteField.php",
        type: "POST",
        cache: false,
        data:{
            id: id
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record deleted successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not deleted.");
            }
            
        }
    });
}

function deleteTable(id) {
    $.ajax({
        url: "php/deleteTable.php",
        type: "POST",
        cache: false,
        data:{
            id: id
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record deleted successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not deleted.");
            }
            
        }
    });
}

function dropTable (dataTable) {
    $.ajax({
        url: "php/dropTable.php",
        type: "POST",
        data: {
            dataTable: dataTable                      
        },
        cache: false,
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record submitted successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not submitted.");
            }
            
        }
    });
}

function logMail (logDate,noODue,noADue) {
    $.ajax({
        url: "php/logMail.php",
        type: "POST",
        data: {
            logDate: logDate,
            noODue: noODue,
            noADue: noADue
        },
        cache: false,
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record submitted successfully!"); 						
            }
            else if(dataResult.statusCode==201){
                console.log("Error occured! Please try again or contact the admin for support");
            }
            
        }
    });
}

function runBat(fileName) {
    $.ajax({
        url: "php/runBat.php",
        type: "POST",
        cache: false,
        data: {
            fileName: fileName   
        },
        success: callbackFunc("Run Complete!")
    });
}

function callbackFunc(response) {
    // do something with the response
    console.log(response);
}