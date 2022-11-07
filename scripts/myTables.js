var currentRowCollection = null;
var rowCollection = null;
var current = null;

current = {};
rowCollection = {};

function processUser(data){
	current["user"] = lowCase(data);
    document.getElementById('currUser').innerHTML = titleCase(data);
}

function processDTUsers(data){
    for (var i=0; i<data.length; i++){
        if (lowCase(data[i].userName) == lowCase(current["user"])){
            current["DTAccess"] = "YES";
            break;
        }
        else {}
    }
}

function processAdmUsers(data){
	current["AdmUsers"] = data;
    for (var i=0; i<data.length; i++){
        if (lowCase(data[i].userName) == lowCase(current["user"])){
            current["accessLevel"] = data[i].accessLevel;
        }
        else {}
    }
}

function getActiveDir(data){
	current["dir"] = data;
    for (var i=0; i<data.length; i++){
        if(data[i].userName == current["user"]){
            current["fullName"] = data[i].fullName;
            current["userEmail"] = data[i].userEmail;
        }
    }
}

function processUsers(data){	
    rowCollection["usersData"] = data;
}

function checkAdmin(thisTable){
    for (var i=0; i<rowCollection["usersData"].length; i++){
        if (lowCase(rowCollection["usersData"][i].userName) == lowCase(current["user"]) && rowCollection["usersData"][i].userAccess == "Admin" && rowCollection["usersData"][i].tableName == thisTable){
            var foundEntry = "YES";
            break;
        }
        else {
            var foundEntry = "NO";
        }
    }
    if(foundEntry == "YES"){
        return "YES";
    }
    else{
        return "NO";
    }
}

function getFields(data){
	current["Fields"] = data;
}

var getCookies = function(){
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
}
  
var myCookies = getCookies();

function setupTable(data){
    current["data"] = data; 
}
	
function getTables(data){ 
    current["Table"] = data;
    rowCollection["usersData"] = sort_by_key(rowCollection["usersData"], 'tableName');

    let uniqDept = data.filter(
        (myTable, index) => index === data.findIndex(
            other => myTable.tableDept === other.tableDept
        )
    );

    rowCollection["uniqDept"] = sort_by_key(uniqDept, 'tableDept');

    var listTables = "";
    for (var k=0; k<rowCollection["uniqDept"].length; k++){
        for (var i=0; i<rowCollection["usersData"].length; i++){
            if (lowCase(rowCollection["usersData"][i].userName) == lowCase(current["user"])){
                var thisID = String(rowCollection["usersData"][i].tableName);
                for (var j=0; j<current["Table"].length; j++){
                    if(rowCollection["usersData"][i].tableName == current["Table"][j].tableName && rowCollection["uniqDept"][k].tableDept == current["Table"][j].tableDept){
                        listTables = listTables + '<div class="deptDiv">' + rowCollection["uniqDept"][k].tableDept + '</div>';
                        for (var i=0; i<rowCollection["usersData"].length; i++){
                            if (lowCase(rowCollection["usersData"][i].userName) == lowCase(current["user"])){
                                var thisID = String(rowCollection["usersData"][i].tableName);
                                for (var j=0; j<current["Table"].length; j++){
                                    if(rowCollection["usersData"][i].tableName == current["Table"][j].tableName && rowCollection["uniqDept"][k].tableDept == current["Table"][j].tableDept){
                                        var thisDept = current["Table"][j].tableDept;
                                        var lastUpdate2 = current["Table"][j].lastUpdate2;
                                        var entryNo = current["Table"][j].entryNo;
                                        listTables = listTables + '<div class="tableBox"><div id="' + thisID + '" class="box1" title="View Table">' + rowCollection["usersData"][i].tableName + '</div><div class="box2">Department: <span>' + thisDept + '</span><br>No. of entries: <span>' + entryNo + '</span><br>Last Updated: <span>' + dateRender(lastUpdate2) + '</span></div></div>'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }        
    }
    
    document.getElementById('listTables').innerHTML = listTables;   

    if(current["accessLevel"] == "Super Admin"){
        document.getElementById('homepage').style.display='block';
        document.getElementById('loading').style.display='none';
        if(current["DTAccess"] == "YES"){
            document.getElementById('tab1').style.display='none';
            document.getElementById('tab2').style.display='none';
            document.getElementById('tab3').style.display='block';
            document.getElementById('tab4').style.display='block';
        }
        else{
            document.getElementById('tab1').style.display='block';
            document.getElementById('tab2').style.display='none';
            document.getElementById('tab3').style.display='none';
            document.getElementById('tab4').style.display='block';
        }
    }
    else if(current["accessLevel"] == "Admin"){
        document.getElementById('homepage').style.display='block';
        document.getElementById('loading').style.display='none';
        if(current["DTAccess"] == "YES"){
            document.getElementById('tab1').style.display='none';
            document.getElementById('tab2').style.display='none';
            document.getElementById('tab3').style.display='block';
            document.getElementById('tab4').style.display='none';
        }
        else{
            document.getElementById('tab1').style.display='block';
            document.getElementById('tab2').style.display='none';
            document.getElementById('tab3').style.display='none';
            document.getElementById('tab4').style.display='none';
        }
    }
    else {
        document.getElementById('homepage').style.display='block';
        document.getElementById('loading').style.display='none';
        if(current["DTAccess"] == "YES"){
            document.getElementById('tab1').style.display='none';
            document.getElementById('tab2').style.display='block';
            document.getElementById('tab3').style.display='none';
            document.getElementById('tab4').style.display='none';
        }
        else{
            document.getElementById('tab1').style.display='none';
            document.getElementById('tab2').style.display='none';
            document.getElementById('tab3').style.display='none';
            document.getElementById('tab4').style.display='none';
        }
    }

    $(document.body).click(function(evt){
        var clicked = evt.target;
        var currentID = clicked.id || "No ID!";
        for (var i=0; i<rowCollection["usersData"].length; i++){
            if (currentID != "No ID!" && rowCollection["usersData"][i].tableName == currentID){
                var thisTable = document.getElementById(currentID).innerHTML;
                document.cookie = "currTable=" + thisTable;
                location.href = "http://wapp-bny.nlng.net/datacentric/dataEntry/datatable.html";
                break;
            }
        }
    })
    postVisit();
}

function checkName(){
    let onlyLetters = /^[a-zA-Z]+$/;
    var tableName = document.getElementById("tableName").value;
    if (onlyLetters.test(tableName.charAt(0))) {
        document.getElementById("tableName").value = tableName.replace(/[^a-zA-Z1234567890_]/g, "_");
    }else{
        alert("First character must be an alphabet!");
        document.getElementById("tableName").value = "";
    }
}

function yyyymmdd(d, sep) {
    var mm = d.getMonth() + 1; // getMonth() is zero-based
    var dd = d.getDate();
    return [d.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join(sep || '/');
};

function yyyymmmdd(d, sep) {
    var dd = d.getDate();           
    return [(dd>9 ? '' : '0') + dd,
        months[d.getMonth()],
        d.getFullYear()
    ].join(sep || ' ');

};

function dateRenderer( data, type, row ) {
	if(data){
        var d=  new Date(data);
        return yyyymmmdd(d);
    }else{
        return "<Null>";
    }
}
function dateRendere( date ) {
	if(date){
		var dd = formatDatee (date);
        var d=  new Date(dd);
        return yyyymmmdd(d);
    }else{
        return "<Null>";
    }
}
function dateRender( date ) {
	if(date){
		var dd = formattDate (date);
        var d=  new Date(dd);
        return yyyymmmdd(d);
    }else{
        return "<Null>";
    }
}

function noRender(data){
    return data;
}

    
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
function formatDatee(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formattDate(date) {
	if (date == "") {
		return "";
	}
	else {
		//var dateString = "23/10/2015"; // Oct 23
		var dateParts = date.split("/");
		// month is 0-based, that's why we need dataParts[1] - 1
		var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
		return dateObject.toString();
	}
}

function titleCase(str) {
   var splitStr = str.toLowerCase().split('.');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1).toLowerCase();     
   }
   // Directly return the joined string
   return splitStr.join('.'); 
}
function lowCase(str) {
   var splitStr = str.toLowerCase().split('.');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].substring(0).toLowerCase();     
   }
   // Directly return the joined string
   return splitStr.join('.'); 
}
function idRender(id) {
	if(id == ""){
        return "";
    }
    else if ((id.toString()).length == 1) {
		return "SDR-000" + id.toString();
	}
	else if ((id.toString()).length == 2) {
		return "SDR-00" + id.toString();
	}
	else if ((id.toString()).length == 3) {
		return "SDR-0" + id.toString();
	}
	else if ((id.toString()).length == 4) {
		return "SDR-" + id.toString();
	}
	else {
		return id;
	}
}

function convDate(date) {
	if (date == "") {
		return "";
	}
	else {
		//var dateString = "23/10/2015"; // Oct 23
		var dateParts = date.split("/");
		// month is 0-based, that's why we need dataParts[1] - 1
		month = dateParts[1],
        day = dateParts[0],
        year = dateParts[2];



        return [year, month, day].join('-');
	}
}

function showOption(){
    var a = document.getElementById("reportFreq");
    var reportFreq = a.options[a.selectedIndex].text;
    if (reportFreq == "Daily"){
        document.getElementById("label2").style.display = "none";
        document.getElementById("label3").style.display = "none";
        document.getElementById("reportDate").style.display = "none";
        document.getElementById("reportMonth").style.display = "none";
        document.getElementById("label1").style.display = "none";
        document.getElementById("reportDay").style.display = "none";
    }
    else if (reportFreq == "Weekly"){
        document.getElementById("label2").style.display = "none";
        document.getElementById("label3").style.display = "none";
        document.getElementById("reportDate").style.display = "none";
        document.getElementById("reportMonth").style.display = "none";
        document.getElementById("label1").style.display = "block";
        document.getElementById("reportDay").style.display = "block";
    }
    else if (reportFreq == "Monthly"){
        document.getElementById("label2").style.display = "block";
        document.getElementById("label3").style.display = "none";
        document.getElementById("reportDate").style.display = "block";
        document.getElementById("reportMonth").style.display = "none";
        document.getElementById("label1").style.display = "none";
        document.getElementById("reportDay").style.display = "none";
    }
    else if (reportFreq == "Annually"){
        document.getElementById("label2").style.display = "none";
        document.getElementById("label3").style.display = "block";
        document.getElementById("reportDate").style.display = "none";
        document.getElementById("reportMonth").style.display = "block";
        document.getElementById("label1").style.display = "none";
        document.getElementById("reportDay").style.display = "none";
    }
    else {
        document.getElementById("label2").style.display = "none";
        document.getElementById("label3").style.display = "none";
        document.getElementById("reportDate").style.display = "none";
        document.getElementById("reportMonth").style.display = "none";
        document.getElementById("label1").style.display = "none";
        document.getElementById("reportDay").style.display = "none";
    }
}


function sort_by_key(array, key)
{
 return array.sort(function(a, b)
 {
  var x = a[key]; var y = b[key];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
 });
}

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}
function convDate(d){
    var dformat = d.getDate().padLeft() + '/' + 
        (d.getMonth()+1).padLeft() + '/' +
        d.getFullYear() + ' ' +
        d.getHours().padLeft() + ':' +
        d.getMinutes().padLeft() + ':' +
        d.getSeconds().padLeft()

    return dformat;
}

onInactive(3 * 60 * 1000, function () {
    document.getElementById('session').style.display='block';
    // Set the date we're counting down to
    current["countDownDate"] = new Date().getTime() + 2*60*1000;
});

function onInactive(ms, cb) {
    var wait = setTimeout(cb, ms);
	var wait2 = setTimeout(updateVisit, 4.85 * 60 * 1000);
    document.onclick = document.onmousemove = document.mousedown = document.mouseup = document.onkeydown = document.onkeyup = document.focus = function () {
        clearTimeout(wait);
		clearTimeout(wait2);
        wait = setTimeout(cb, ms);
		wait2 = setTimeout(updateVisit, 4.85 * 60 * 1000);
    };
}

//Posting Users Visit
function postVisit(){
	var postElement = "INSERT INTO Page_Visits VALUES(";
	var RecordDate2 = formatDate(new Date());
	var Logoff_Time = "";
	var Page_Link = "datacentric/dataEntry/index.html";
	var Comment = "";
	var UpdatedDate = formatDate(new Date());
	var UpdatedBy = "DataSys";
	current["Page_Visited"] = "Data Entry Homepage";
	current["Logon_Time"] = convDate(new Date());
	
	postElement = postElement + "'" + RecordDate2 + "','" + UpdatedDate + "','" + UpdatedBy + "','" + current["Page_Visited"] + "','" + titleCase(current["user"]) + "','" + current["Logon_Time"] + "','" + Logoff_Time  + "','" + Comment + "','" + Page_Link + "')"
	postDb (postElement);
}
function updateVisit() {
	var postElement = "UPDATE Page_Visits SET Logoff_Time='" + convDate(new Date()) + "', Comment='Session timed out' WHERE Visitor='" + titleCase(current["user"]) + "' AND Logoff_Time='' AND Logon_Time='" + current["Logon_Time"] + "' AND Page_Visited='" + current["Page_Visited"] + "'";
	postDb (postElement);
	setTimeout(switchTab, 0.15*60*1000);
}
function switchTab() {
	//console.log("Switch Tab")
	location.replace("http://wapp-bny.nlng.net/datacentric/dataEntry/timeout.html")
}
window.addEventListener('beforeunload', function (e) {
	var postElement = "UPDATE Page_Visits SET Logoff_Time='" + convDate(new Date()) + "', Comment='Page closed by user' WHERE Visitor='" + titleCase(current["user"]) + "' AND Logoff_Time='' AND Logon_Time='" + current["Logon_Time"] + "' AND Page_Visited='" + current["Page_Visited"] + "'";
	postDb (postElement);
});

// Update the count down every 1 second
var x = setInterval(function() {
  // Get today's date and time
  var now = new Date().getTime();    
  // Find the distance between now and the count down date
  var distance = current["countDownDate"] - now;    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);    
  // Output the result in an element with id="timeLeft"
  document.getElementById("timeLeft").innerHTML = minutes + "m " + seconds + "s ";
}, 1000);