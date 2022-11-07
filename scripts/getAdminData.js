var usersLink = "http://bny-s-t117/datacentric/DeviceRequest/php/getUsersData.php";
var userLink = "http://bny-s-t117/datacentric/DeviceRequest/php/getUser.php";
var dbLink = "http://bny-s-t117/datacentric/DeviceRequest/php/getData.php";
var stockLink = "http://bny-s-t117/datacentric/DeviceRequest/php/getStockData.php";

function sentRequest(onePath, callback, payload, callbackData){	
	var xhttp = new XMLHttpRequest();
  	xhttp.withCredentials = true
  	if(callbackData){
	  xhttp.callbackData = callbackData;
  	} 
 	xhttp.onreadystatechange = callback;
  
  	if(payload){
	  xhttp.open("POST", onePath, true);
	  xhttp.send(payload);
  	}else
  	{
	  xhttp.open("GET", onePath, true);
	  xhttp.send();
  	}
  
}

$(document).ready(function () {
	sentRequest(userLink , userCallBack, null);
	sentRequest(usersLink , usersCallBack, null);
    sentRequest(stockLink , stockCallBack, null);
	sentRequest(dbLink , dbCallBack, null);
	console.log("sent data request");
});

function userCallBack() {
	if (this.readyState == 4 && (this.status == 200)) {
		var obj = (this.responseText).split('\\');
        var userName = obj[1];
       	processUser(userName);
  	}
  	else{
  	}
}
function usersCallBack() {
	if (this.readyState == 4 && (this.status == 200)) {
  		var liveData = JSON.parse(this.responseText);
  		processUsers(liveData);
  	}
  	else{
  	}
}
function stockCallBack() {
	if (this.readyState == 4 && (this.status == 200)) {
  		var liveData = JSON.parse(this.responseText);
  		processStock(liveData);
  	}
  	else{
  	}
}
function dbCallBack() {
	if (this.readyState == 4 && (this.status == 200)) {
  		var liveData = JSON.parse(this.responseText);
  		processData(liveData);
  	}
  	else{
  	}
}
  	
function processData(data){
    setupTable(data);
}

/*$.ajax({
    url : 'php/getData.php', // your php file
    type : 'GET', // type of the HTTP request
    success : function(data){
       var obj = jQuery.parseJSON(data);
       processData(obj)
    }
});

function processData(data){
    setupTable(data);
}

$.ajax({
    url : 'php/getUsersData.php', // your php file
    type : 'GET', // type of the HTTP request
    success : function(data){
       var obj = jQuery.parseJSON(data);
       //console.log(obj);
       processUsers(obj);
    }
});

$.ajax({
    url : 'php/getStockData.php', // your php file
    type : 'GET', // type of the HTTP request
    success : function(data){
       var obj = jQuery.parseJSON(data);
       //console.log(obj);
       processStock(obj);
    }
});

$.ajax({
    url : 'php/getUser.php', // your php file
    type : 'GET', // type of the HTTP request
    success : function(data){
        var obj = data.split('\\');
        var userName = obj[1];
       processUser(userName);
    }
});*/