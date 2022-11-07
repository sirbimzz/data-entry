var currentRowCollection = null;
var rowCollection = null;
var current = null;

current = {};
rowCollection = {};

function processDTUsers(data){}

function processUser(data){
	current["user"] = lowCase(data);
    document.getElementById('currUser').innerHTML = titleCase(data);
}

function getActiveDir(data){
    current["dir"] = sort_by_key(data, 'fullName');
    var dataList  = '<datalist id="fName" style="font-size: 9pt;">';
    for(i=0; i<current["dir"].length;i++){
        dataList = dataList + "<option value='" + current["dir"][i].fullName + "'>"
    }
    dataList = dataList + "</datalist>"
    document.getElementById('dataList').innerHTML = dataList;
}

function processAdmUsers(data){
	current["AdmUsers"] = data;
}

function processUsers(data){	
    rowCollection["usersData"] = data; 

    $("#dataUsers").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
    });

    var table = $('#dataUsers').DataTable({
        deferLoading:true,
        paging: false,
        "autoWidth": false,
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        buttons: [
            //{ extend: 'excel', text: 'Export  to Excel' }
        ],
        "bInfo" : false,
        sDom: 'lrtip',
        "data": data,
        select:"single",
        "columns": [
            { "data": "fullName", title:"Name" },
            { "data": "userName", title:"UserName" },
            { "data": "userEmail", title:"Email" },
            { "data": "userAccess", title:"Users Access" },
            { "data": "tableName" },
            { "data": "id" },
            { "mData": null,
                "bSortable": false,
                "mRender": function (o) { return '<i class="editRow2" style="font-size:11pt; color:blue; cursor: pointer;"><i class="fas fa-edit" title="Edit"></i></i>&nbsp;&nbsp;&nbsp;<i class="delRow2" style="font-size:11pt; color:red; cursor: pointer;"><i class="fas fa-trash-alt" title="Delete"></i></i>'; },
                width:"12%", title:"Action"
            },
        ],
        columnDefs: [ 
            { "targets": [4,5], "visible": false },
        ],
        'searchCols': [
            null,
            null,
            null,
            null,
            { 'sSearch': myCookies.selTable },
        ],
        "order": [[0, 'asc']],
    });

    $('#dataUsers tbody').on('click', 'i.delRow2', function () {
        table.column(4).visible(true);
        table.column(5).visible(true);
        currentRow = {};

        var $row = $(this).closest("tr");
        var $tds0 = $row.find("td:eq(0)");
        var $tds1 = $row.find("td:eq(1)");
        var $tds2 = $row.find("td:eq(2)");
        var $tds3 = $row.find("td:eq(3)");
        var $tds4 = $row.find("td:eq(4)");
        var $tds5 = $row.find("td:eq(5)");

        $.each($tds0, function(i, el) {
            var txt = $(this).text();
            currentRow["fullName"] = txt;
        });
        $.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRow["userName"] = txt;
        });    
        $.each($tds2, function(i, el) {
            var txt = $(this).text();
            currentRow["userEmail"] = txt;
        });
        $.each($tds3, function(i, el) {
            var txt = $(this).text();
            currentRow["userAccess"] = txt;
        });    
        $.each($tds4, function(i, el) {
            var txt = $(this).text();
            currentRow["tableName"] = txt;
        });
        $.each($tds5, function(i, el) {
            var txt = $(this).text();
            currentRow["id"] = txt;
        });

        table.column(4).visible(false);
        table.column(5).visible(false);

        if (confirm("Confirm Delete of " + currentRow["fullName"])) {
            deleteUsers(currentRow["id"]);
            location.reload();
        } else {}
    })

    $('#dataUsers tbody').on('click', 'i.editRow2', function () {
        document.getElementById('id02').style.display='block';
        document.getElementById('updateUser').style.display='block';
        document.getElementById('addUser').style.display='none';
        document.getElementById('updateOld2').style.display='block';
        document.getElementById('addNew2').style.display='none';

        table.column(4).visible(true);
        table.column(5).visible(true);
        currentRow = {};

        var $row = $(this).closest("tr");
        var $tds0 = $row.find("td:eq(0)");
        var $tds1 = $row.find("td:eq(1)");
        var $tds2 = $row.find("td:eq(2)");
        var $tds3 = $row.find("td:eq(3)");
        var $tds4 = $row.find("td:eq(4)");
        var $tds5 = $row.find("td:eq(5)");

        $.each($tds0, function(i, el) {
            var txt = $(this).text();
            currentRow["fullName"] = txt;
        });
        $.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRow["userName"] = txt;
        });    
        $.each($tds2, function(i, el) {
            var txt = $(this).text();
            currentRow["userEmail"] = txt;
        });
        $.each($tds3, function(i, el) {
            var txt = $(this).text();
            currentRow["userAccess"] = txt;
        });    
        $.each($tds4, function(i, el) {
            var txt = $(this).text();
            currentRow["tableName"] = txt;
        });
        $.each($tds5, function(i, el) {
            var txt = $(this).text();
            currentRow["id"] = txt;
        });

        table.column(4).visible(false);
        table.column(5).visible(false);

        document.getElementById('fullName').value = currentRow["fullName"];
        document.getElementById('userName').value = currentRow["userName"];
        document.getElementById('userEmail').value = currentRow["userEmail"];
        var a = document.getElementById('userAccess');
        a.options[a.selectedIndex].text = currentRow['userAccess'];   
    });
}

function getFields(data){
	current["Fields"] = data;

    $("#myFields").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
    });

    var table2 = $('#myFields').DataTable({
        deferLoading:true,
        paging: false,
        "autoWidth": false,
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        buttons: [
            //{ extend: 'excel', text: 'Export  to Excel' }
        ],
        "bInfo" : false,
        sDom: 'lrtip',
        "data": data,
        select:"single",
        "columns": [
            { "data": "dataField", title:"Column Name" },
            { "data": "dataType", title:"Data Type" },
            { "data": "dataUOM", title:"UOM" },
            { "data": "dataTable" },
            { "data": "id" },
            { "mData": null,
                "bSortable": false,
                "mRender": function (o) { return '<i class="editRow" style="font-size:11pt; color:blue; cursor: pointer;"><i class="fas fa-edit" title="Edit"></i></i>&nbsp;&nbsp;&nbsp;<i class="delRow" style="font-size:11pt; color:red; cursor: pointer;"><i class="fas fa-trash-alt" title="Delete"></i></i>'; },
                width:"12%", title:"Action"
            },
        ],
        columnDefs: [ 
            { "targets": [3,4], "visible": false },
        ],
        'searchCols': [
            null,
            null,
            null,
            { 'sSearch': myCookies.selTable },
        ],
        "order": [[0, 'asc']],
    });
    document.getElementById('tableNo').innerHTML = myCookies.selTable;

    $('#myFields tbody').on('click', 'i.delRow', function () {
        table2.column(3).visible(true);
        table2.column(4).visible(true);
        currentRow = {};

        var $row = $(this).closest("tr");
        var $tds0 = $row.find("td:eq(0)");
        var $tds1 = $row.find("td:eq(1)");
        var $tds2 = $row.find("td:eq(2)");
        var $tds3 = $row.find("td:eq(3)");
        var $tds4 = $row.find("td:eq(4)");

        $.each($tds0, function(i, el) {
            var txt = $(this).text();
            currentRow["dataField"] = txt;
        });
        $.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRow["dataType"] = txt;
        });    
        $.each($tds2, function(i, el) {
            var txt = $(this).text();
            currentRow["dataUOM"] = txt;
        });
        $.each($tds3, function(i, el) {
            var txt = $(this).text();
            currentRow["dataTable"] = txt;
        });
        $.each($tds4, function(i, el) {
            var txt = $(this).text();
            currentRow["id"] = txt;
        });

        table2.column(3).visible(false);
        table2.column(4).visible(false);

        if (confirm("Confirm Delete of " + currentRow["dataField"])) {
            var postElement = "ALTER TABLE " + myCookies.selTable + " DROP COLUMN " + currentRow["dataField"];

            deleteField(currentRow["id"]);
            postDb(postElement);
            location.reload();
        } else {}
    })

    $('#myFields tbody').on('click', 'i.editRow', function () {
        document.getElementById('id01').style.display='block';
        document.getElementById('updateItem').style.display='block';
        document.getElementById('addItem').style.display='none';
        document.getElementById('updateOld').style.display='block';
        document.getElementById('addNew').style.display='none';

        table2.column(3).visible(true);
        table2.column(4).visible(true);
        currentRow = {};

        var $row = $(this).closest("tr");
        var $tds0 = $row.find("td:eq(0)");
        var $tds1 = $row.find("td:eq(1)");
        var $tds2 = $row.find("td:eq(2)");
        var $tds3 = $row.find("td:eq(3)");
        var $tds4 = $row.find("td:eq(4)");

        $.each($tds0, function(i, el) {
            var txt = $(this).text();
            currentRow["dataField"] = txt;
        });
        $.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRow["dataType"] = txt;
        });    
        $.each($tds2, function(i, el) {
            var txt = $(this).text();
            currentRow["dataUOM"] = txt;
        });
        $.each($tds3, function(i, el) {
            var txt = $(this).text();
            currentRow["dataTable"] = txt;
        });
        $.each($tds4, function(i, el) {
            var txt = $(this).text();
            currentRow["id"] = txt;
        });

        table2.column(3).visible(false);
        table2.column(4).visible(false);

        document.getElementById('dataField').value = currentRow["dataField"];
        document.getElementById('dataUOM').value = currentRow["dataUOM"];
        var a = document.getElementById('dataType');
        a.options[a.selectedIndex].text = currentRow['dataType'];   
    });
    if(myCookies.selTable == "" || myCookies.selTable == undefined){
        document.getElementById('homepage').style.display='none';
        document.getElementById('loading').style.display='none';
        document.getElementById('error').style.display='block';
    }
    else{
        for(i=0; i<rowCollection["usersData"].length;i++){
            if(rowCollection["usersData"][i].tableName == myCookies.selTable && rowCollection["usersData"][i].userAccess == "Admin"){
                document.getElementById('homepage').style.display='block';
                document.getElementById('loading').style.display='none';
                document.getElementById('error').style.display='none';
                break;
            }
            else{
                document.getElementById('homepage').style.display='none';
                document.getElementById('loading').style.display='none';
                document.getElementById('error').style.display='block';
            }
        }
    }   
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

function popUser(){
    //var fullName = document.getElementById('fullName').value;
    var fullName = document.querySelector('#fullName').value;
    for(var i = 0; i < current["dir"].length; i++) {
        if(current["dir"][i].fullName == fullName){
            document.getElementById('userName').value = (current["dir"][i].userName).toLowerCase();
            document.getElementById('userEmail').value = (current["dir"][i].userEmail).toLowerCase();
        }
    }

}

function setupTable(data){

}
	
function getTables(data){
    
}

function getTable(){
    location.href = "http://wapp-bny.nlng.net/datacentric/dataEntry/mytables.html";
}

function addRow(){
    document.getElementById('id01').style.display='block';
}

function addRow2(){
    document.getElementById('id02').style.display='block';
}

$('#addItem').click(function(){
    var dataField = document.getElementById('dataField').value;
    var dataUOM = document.getElementById('dataUOM').value;
    var dataTable = myCookies.selTable;
    var a = document.getElementById("dataType");
    var dataType = a.options[a.selectedIndex].text;

    if(dataType == "Date" || dataType == "DateTime"){
        var dataType2 = "varchar(2000)"
    }
    else if(dataType == "Number"){
        var dataType2 = "varchar(2000)"
    }
    else{
        var dataType2 = "varchar(2000)"
    }

    if(dataField == ""){
        alert("Please enter a column name")
    }
    else if(dataType == ""){
        alert("Please select the data type")
    }
    else{
        for(i=0; i<current["Fields"].length;i++){
            if (dataTable == current["Fields"][i].dataTable && dataField == current["Fields"][i].dataField){
                var itemFound = "YES";
                break;
            }
            else{
                var itemFound = "NO";
            }
        }
        if(itemFound == "YES"){
            alert("Column name already exists for selected table, please use another column name");
        }
        else{
            var alterString = 'ALTER TABLE ' + dataTable + ' ADD ' + dataField + ' ' + dataType2;
            var postElement = "INSERT INTO dataFields VALUES ('" + dataField + "','" + dataTable + "','" + dataType + "','" + dataUOM + "')";

            postDb (postElement);
            postDb (alterString);
            location.reload();
        }
    }
});

$('#updateItem').click(function(){
    var dataField = document.getElementById('dataField').value;
    var dataUOM = document.getElementById('dataUOM').value;
    var a = document.getElementById("dataType");
    var dataType = a.options[a.selectedIndex].text;
    var oldName = myCookies.selTable + '.' + currentRow["dataField"]; 

    if(dataField == ""){
        alert("Please enter a column name")
    }
    else if(dataType == ""){
        alert("Please select the data type")
    }
    else{
        if(dataField == currentRow["dataField"]){
            var itemFound = "NO";
        }
        else{
            for(i=0; i<current["Fields"].length;i++){
                if (currentRow["dataTable"] == current["Fields"][i].dataTable && dataField == current["Fields"][i].dataField){
                    var itemFound = "YES";
                    break;
                }
                else{
                    var itemFound = "NO";
                }
            }
        }
        if(itemFound == "YES"){
            alert("Column name already exists for selected table, please use another column name");
        }
        else{
            var postElement = "UPDATE dataFields SET dataField='" + dataField + "', dataType='" + dataType + "', dataUOM='" + dataUOM + "' WHERE id=" + currentRow["id"];
            var postElement2 = "sp_rename '" + oldName + "', '" + dataField + "', 'COLUMN'";

            postDb(postElement);
            postDb(postElement2);
            location.reload();
        }
    }
});

$('#addUser').click(function(){
    var tableName = myCookies.selTable;
    var fullName = document.getElementById('fullName').value;
    var userName = document.getElementById('userName').value;
    var userEmail = document.getElementById('userEmail').value;
    var a = document.getElementById("userAccess");
    var userAccess = a.options[a.selectedIndex].text;

    if(fullName == ""){
        alert("Please enter the user's full name")
    }
    else if(userName == ""){
        alert("Please enter the user's windows logon id")
    }
    else if(userEmail == ""){
        alert("Please enter the user's email address")
    }
    else if(userAccess == ""){
        alert("Please select the user's access level")
    }
    else{
        for(i=0; i<rowCollection["usersData"].length;i++){
            if (tableName == rowCollection["usersData"][i].tableName && userName == rowCollection["usersData"][i].userName){
                var userFound = "YES";
                break;
            }
            else{
                var userFound = "NO";
            }
        }
        if(userFound == "YES"){
            alert("User already exists for selected table");
        }
        else{
            var postElement = "INSERT INTO dataUsers VALUES ('" + tableName + "','" + fullName + "','" + userName + "','" + userEmail + "','" + userAccess+ "')";

            postDb(postElement);
            location.reload();
        }
    }
});

$('#updateUser').click(function(){
    var fullName = document.getElementById('fullName').value;
    var userName = document.getElementById('userName').value;
    var userEmail = document.getElementById('userEmail').value;
    var a = document.getElementById("userAccess");
    var userAccess = a.options[a.selectedIndex].text;

    if(fullName == ""){
        alert("Please enter the user's full name")
    }
    else if(userName == ""){
        alert("Please enter the user's windows logon id")
    }
    else if(userEmail == ""){
        alert("Please enter the user's email address")
    }
    else if(userAccess == ""){
        alert("Please select the user's access level")
    }
    else{
        if(userName == currentRow["userName"]){
            var itemFound = "NO";
        }
        else{
            for(i=0; i<rowCollection["usersData"].length;i++){
                if (tableName == rowCollection["usersData"][i].tableName && userName == rowCollection["usersData"][i].userName){
                    var userFound = "YES";
                    break;
                }
                else{
                    var userFound = "NO";
                }
            }
        }
        if(userFound == "YES"){
            alert("User already exists for selected table");
        }
        else{
            var postElement = "UPDATE dataUsers SET fullName='" + fullName+ "', userName='" + userName + "', userEmail='" + userEmail + "', userAccess='" + userAccess + "' WHERE id=" + currentRow["id"];

            postDb(postElement);
            location.reload();
        }
    }
});

function checkName(){
    let onlyLetters = /^[a-zA-Z]+$/;
    var dataField = document.getElementById("dataField").value;
    if (onlyLetters.test(dataField.charAt(0))) {
        document.getElementById("dataField").value = dataField.replace(/[^a-zA-Z1234567890_]/g, "_");
    }else{
        alert("First character must be an alphabet!");
        document.getElementById("dataField").value = "";
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

function formatDate(data, type, row) {
    var d = new Date(data),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
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

function sort_by_key(array, key){
 return array.sort(function(a, b){
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
	var Page_Link = "datacentric/dataEntry/datatable.html";
	var Comment = "";
	var UpdatedDate = formatDate(new Date());
	var UpdatedBy = "DataSys";
	current["Page_Visited"] = myCookies.currTable;
	current["Logon_Time"] = convDate(new Date());
	
	postElement = postElement + "'" + RecordDate2 + "','" + UpdatedDate + "','" + UpdatedBy + "','" + current["Page_Visited"] + "','" + current["user"] + "','" + current["Logon_Time"] + "','" + Logoff_Time  + "','" + Comment + "','" + Page_Link + "')"
	postDb (postElement);
}
function updateVisit() {
	var postElement = "UPDATE Page_Visits SET Logoff_Time='" + convDate(new Date()) + "', Comment='Session timed out' WHERE Visitor='" + current["user"] + "' AND Logoff_Time='' AND Logon_Time='" + current["Logon_Time"] + "' AND Page_Visited='" + current["Page_Visited"] + "'";
	postDb (postElement);
	setTimeout(switchTab, 0.15*60*1000);
}
function switchTab() {
	//console.log("Switch Tab")
	location.replace("http://wapp-bny.nlng.net/datacentric/dataEntry/timeout.html")
}
window.addEventListener('beforeunload', function (e) {
	var postElement = "UPDATE Page_Visits SET Logoff_Time='" + convDate(new Date()) + "', Comment='Page closed by user' WHERE Visitor='" + current["user"] + "' AND Logoff_Time='' AND Logon_Time='" + current["Logon_Time"] + "' AND Page_Visited='" + current["Page_Visited"] + "'";
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