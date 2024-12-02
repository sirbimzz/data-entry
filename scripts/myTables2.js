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

function processAdmUsers(data){
	current["AdmUsers"] = data;
    for (var i=0; i<data.length; i++){
        if (lowCase(data[i].userName) == lowCase(current["user"])){
            current["accessLevel"] = data[i].accessLevel;
        }
        else {}
    }
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

function goToTab1(){
    location.href = "http://wapp-bny.nlng.net/datacentric/dataEntry/index.html";
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

}
	
function getTables(data){ 
    current["Table"] = data;

    $("#myTables").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
    });

    var table = $('#myTables').DataTable({
        deferLoading:true,
        paging: false,
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        buttons: [
            //{ extend: 'excel', text: 'Export  to Excel' }
        ],
        "bInfo" : false,
        sDom: 'lrtip',
        "data": data,
        select:"single",
        "autoWidth": false,
        "columns": [
            { "data": "tableName", title:"Table Name" },
            { "data": "tableOwner", title:"Table Owner", render: titleCase },
            { "data": "tableDept", title:"Table Dept" },
            { "data": "reportFreq", title:"Frequency" },
            { "data": "reportDay", title:"Day", render:naRender },
            { "data": "reportDate", title:"Date", render:naRender },
            { "data": "reportMonth", title:"Month", render:naRender },
            { "data": "getPrompt", title:"Email Prompts", render:naRender },
            { "data": "id" },
            { "mData": null,
                "bSortable": false,
                "mRender": function (o) { return '<i class="viewRow" style="font-size:11pt; color:green; cursor: pointer;"><i class="fas fa-eye" title="View"></i></i>&nbsp;<i class="editRow2" style="font-size:11pt; color:blue; cursor: pointer;"><i class="fas fa-edit" title="Edit"></i></i>&nbsp;<i class="editRow" style="font-size:11pt; color:purple; cursor: pointer;"><i class="fas fa-wrench" title="Setup"></i></i>&nbsp;<i class="delRow" style="font-size:11pt; color:red; cursor: pointer;"><i class="fas fa-trash-alt" title="Delete"></i></i>'; },
                width:"11%", title:"Action"
            },
            { "data": "tableName", render: checkAdmin },
        ],
        'searchCols': [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            { 'sSearch': "YES" },
        ],
        columnDefs: [ 
            { "targets": [1,8,10], "visible": false },
        ],
        "order": [[0, 'asc']],
    });

    //View row
    $('#myTables tbody').on('click', 'i.viewRow', function () {
        table.column(1).visible(true);
        table.column(8).visible(true);
        currentRow = {};

        var $row = $(this).closest("tr");
        var $tds0 = $row.find("td:eq(0)");
        var $tds1 = $row.find("td:eq(1)");
        var $tds2 = $row.find("td:eq(2)");
        var $tds3 = $row.find("td:eq(3)");
        var $tds4 = $row.find("td:eq(4)");
        var $tds5 = $row.find("td:eq(5)");
        var $tds6 = $row.find("td:eq(6)");
        var $tds7 = $row.find("td:eq(7)");
        var $tds8 = $row.find("td:eq(8)");

        $.each($tds0, function(i, el) {
            var txt = $(this).text();
            currentRow["tableName"] = txt;
        });
        $.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRow["tableOwner"] = txt;
        });    
        $.each($tds2, function(i, el) {
            var txt = $(this).text();
            currentRow["tableDept"] = txt;
        });
        $.each($tds3, function(i, el) {
            var txt = $(this).text();
            currentRow["reportFreq"] = txt;
        });
        $.each($tds4, function(i, el) {
            var txt = $(this).text();
            currentRow["reportDay"] = txt;
        });
        $.each($tds5, function(i, el) {
            var txt = $(this).text();
            currentRow["reportDate"] = txt;
        });
        $.each($tds6, function(i, el) {
            var txt = $(this).text();
            currentRow["reportMonth"] = txt;
        });
        $.each($tds7, function(i, el) {
            var txt = $(this).text();
            currentRow["getPrompt"] = txt;
        });
        $.each($tds8, function(i, el) {
            var txt = $(this).text();
            currentRow["id"] = txt;
        });

        table.column(1).visible(false);
        table.column(8).visible(false);

        document.cookie = "currTable=" + currentRow["tableName"];
        location.href = "http://wapp-bny.nlng.net/datacentric/dataEntry/datatable.html";
    });

    $('#myTables tbody').on('click', 'i.editRow2', function () {
        document.getElementById('id01').style.display='block';
        document.getElementById('updateItem').style.display='block';
        document.getElementById('addItem').style.display='none';
        document.getElementById('updateOld').style.display='block';
        document.getElementById('addNew').style.display='none';
        table.column(1).visible(true);
        table.column(8).visible(true);
        currentRow = {};

        var $row = $(this).closest("tr");
        var $tds0 = $row.find("td:eq(0)");
        var $tds1 = $row.find("td:eq(1)");
        var $tds2 = $row.find("td:eq(2)");
        var $tds3 = $row.find("td:eq(3)");
        var $tds4 = $row.find("td:eq(4)");
        var $tds5 = $row.find("td:eq(5)");
        var $tds6 = $row.find("td:eq(6)");
        var $tds7 = $row.find("td:eq(7)");
        var $tds8 = $row.find("td:eq(8)");

        $.each($tds0, function(i, el) {
            var txt = $(this).text();
            currentRow["tableName"] = txt;
        });
        $.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRow["tableOwner"] = txt;
        });    
        $.each($tds2, function(i, el) {
            var txt = $(this).text();
            currentRow["tableDept"] = txt;
        });
        $.each($tds3, function(i, el) {
            var txt = $(this).text();
            currentRow["reportFreq"] = txt;
        });
        $.each($tds4, function(i, el) {
            var txt = $(this).text();
            currentRow["reportDay"] = txt;
        });
        $.each($tds5, function(i, el) {
            var txt = $(this).text();
            currentRow["reportDate"] = txt;
        });
        $.each($tds6, function(i, el) {
            var txt = $(this).text();
            currentRow["reportMonth"] = txt;
        });
        $.each($tds7, function(i, el) {
            var txt = $(this).text();
            currentRow["getPrompt"] = txt;
        });
        $.each($tds8, function(i, el) {
            var txt = $(this).text();
            currentRow["id"] = txt;
        });

        table.column(1).visible(false);
        table.column(8).visible(false);

        document.getElementById('tableNo').innerHTML = currentRow["tableName"];
        document. getElementById("tableName"). disabled = true;
        document.getElementById('tableName').value = currentRow["tableName"];
        document.getElementById('tableDept').value = currentRow["tableDept"];
        document.getElementById('reportDate').value = currentRow["reportDate"];
        var a = document.getElementById('reportFreq');
        a.options[a.selectedIndex].text = currentRow['reportFreq'];
        var b = document.getElementById('reportDay');
        b.options[b.selectedIndex].text = currentRow['reportDay'];
        var c = document.getElementById('reportMonth');
        c.options[c.selectedIndex].text = currentRow['reportMonth'];
        var d = document.getElementById('getPrompt');
        d.options[d.selectedIndex].text = currentRow['getPrompt'];

        var reportFreq = currentRow['reportFreq'];
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
    });

    $('#myTables tbody').on('click', 'i.delRow', function () {
        table.column(1).visible(true);
        table.column(8).visible(true);
        currentRow = {};

        var $row = $(this).closest("tr");
        var $tds0 = $row.find("td:eq(0)");
        var $tds1 = $row.find("td:eq(1)");
        var $tds2 = $row.find("td:eq(2)");
        var $tds3 = $row.find("td:eq(3)");
        var $tds4 = $row.find("td:eq(4)");
        var $tds5 = $row.find("td:eq(5)");
        var $tds6 = $row.find("td:eq(6)");
        var $tds7 = $row.find("td:eq(7)");
        var $tds8 = $row.find("td:eq(8)");

        $.each($tds0, function(i, el) {
            var txt = $(this).text();
            currentRow["tableName"] = txt;
        });
        $.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRow["tableOwner"] = txt;
        });    
        $.each($tds2, function(i, el) {
            var txt = $(this).text();
            currentRow["tableDept"] = txt;
        });
        $.each($tds3, function(i, el) {
            var txt = $(this).text();
            currentRow["reportFreq"] = txt;
        });
        $.each($tds4, function(i, el) {
            var txt = $(this).text();
            currentRow["reportDay"] = txt;
        });
        $.each($tds5, function(i, el) {
            var txt = $(this).text();
            currentRow["reportDate"] = txt;
        });
        $.each($tds6, function(i, el) {
            var txt = $(this).text();
            currentRow["reportMonth"] = txt;
        });
        $.each($tds7, function(i, el) {
            var txt = $(this).text();
            currentRow["getPrompt"] = txt;
        });
        $.each($tds8, function(i, el) {
            var txt = $(this).text();
            currentRow["id"] = txt;
        });

        table.column(1).visible(false);
        table.column(8).visible(false);

        if (confirm(currentRow["tableName"] + ' will be deleted with all its associated data')) {
            var postElement = 'DROP TABLE ' + currentRow["tableName"];

            dropTable (currentRow["tableName"]);
            deleteTable(currentRow["id"]);
            deleteUserTable(currentRow["tableName"]);
            deleteFieldTable(currentRow["tableName"]);
            location.reload();
        } else {}
        
    });

    $('#myTables tbody').on('click', 'i.editRow', function () {
        currentRow = {};

        var $row = $(this).closest("tr");
        var $tds0 = $row.find("td:eq(0)");

        $.each($tds0, function(i, el) {
            var txt = $(this).text();
            currentRow["tableName"] = txt;
        });
        document.cookie = "selTable=" + currentRow["tableName"];
        location.href = "http://wapp-bny.nlng.net/datacentric/dataEntry/config.html";
    });

    if(current["accessLevel"] == "Admin" || current["accessLevel"] == "Super Admin"){
        document.getElementById('homepage').style.display='block';
        document.getElementById('loading').style.display='none';
        document.getElementById('error').style.display='none';
    }
    else {
        document.getElementById('homepage').style.display='none';
        document.getElementById('loading').style.display='none';
        document.getElementById('error').style.display='block';
    }
    
}

function addRow(){
    document.getElementById('id01').style.display='block';
}

$('#addItem').click(function(){
    var dateCreated = formatDate(new Date());
    var lastUpdate = formatDate(new Date());
    var lastUpdate2 = formatDate(new Date());
    var entryNo = 0;
    var tableName = document.getElementById('tableName').value;
    var tableOwner = titleCase(current["user"]);
    var tableDept = document.getElementById('tableDept').value;
    var a = document.getElementById("reportFreq");
    var reportFreq = a.options[a.selectedIndex].text;
    if (reportFreq == "Daily"){
        var reportDay = "";
        var reportDate = "";
        var reportMonth = "";
    }
    else if (reportFreq == "Weekly"){
        var b = document.getElementById("reportDay");
        var reportDay = b.options[b.selectedIndex].text;
        var reportDate = "";
        var reportMonth = "";
    }
    else if (reportFreq == "Monthly"){
        var reportDay = "";
        var reportDate = document.getElementById('reportDate').value;
        var reportMonth = "";
    }
    else if (reportFreq == "Annually"){
        var reportDay = "";
        var reportDate = "";
        var c = document.getElementById("reportMonth");
        var reportMonth = c.options[c.selectedIndex].text;
    }
    else {
        var reportDay = "";
        var reportDate = "";
        var reportMonth = "";
    }
    var d = document.getElementById("getPrompt");
    var getPrompt = d.options[d.selectedIndex].text;

    var fullName = current["fullName"];
    var userName = current["user"];
    var userEmail = current["userEmail"];
    var userAccess = "Admin";

    if(tableName == ""){
        alert("Please enter a table name")
    }
    else if(reportFreq == ""){
        alert("Please select the frequency of reporting")
    }
    else if(reportFreq == "Weekly" && reportDay == ""){
        alert("Please select the day of the week")
    }
    else if(reportFreq == "Monthly" && reportDate == ""){
        alert("Please input the date of the month")
    }
    else if(reportFreq == "Annually" && reportMonth == ""){
        alert("Please select the month of the year")
    }
    else{
        for(i=0; i<current["Table"].length;i++){
            if (tableName == current["Table"][i].tableName){
                var itemFound = "YES";
                break;
            }
            else{
                var itemFound = "NO";
            }
        }
        if(itemFound == "YES"){
            alert("Table name already exists, please use another table name");
        }
        else{
            var postElement1 = "CREATE TABLE " + tableName + " ( id int IDENTITY(1,1) PRIMARY KEY, RecordDate datetime, UpdatedDate datetime, UpdatedBy varchar(2000))";

            var postElement2 = "INSERT INTO dataTables VALUES ('" + dateCreated + "','" + tableName + "','" + tableOwner + "','" + tableDept + "','" + 
                reportFreq + "','" + reportDay + "','" + reportDate + "','" + reportMonth+ "','" + getPrompt + "','" + lastUpdate+ "','" + lastUpdate2+ "','" + entryNo + "')";
            
            var postElement3 = "INSERT INTO dataUsers VALUES ('" + tableName + "','" + fullName + "','" + userName + "','" + userEmail + "','" + userAccess+ "')";

            var postElement = postElement1 + '; ' +  postElement2 + '; '  + postElement3 + ';'


            postDb (postElement); 
            location.reload();
        }
    }
});


$('#updateItem').click(function(){
    var tableName = document.getElementById('tableName').value;
    var tableOwner = titleCase(current["user"]);
    var tableDept = document.getElementById('tableDept').value;
    var a = document.getElementById("reportFreq");
    var reportFreq = a.options[a.selectedIndex].text;
    if (reportFreq == "Daily"){
        var reportDay = "";
        var reportDate = "";
        var reportMonth = "";
    }
    else if (reportFreq == "Weekly"){
        var b = document.getElementById("reportDay");
        var reportDay = b.options[b.selectedIndex].text;
        var reportDate = "";
        var reportMonth = "";
    }
    else if (reportFreq == "Monthly"){
        var reportDay = "";
        var reportDate = document.getElementById('reportDate').value;
        var reportMonth = "";
    }
    else if (reportFreq == "Annually"){
        var reportDay = "";
        var reportDate = "";
        var c = document.getElementById("reportMonth");
        var reportMonth = c.options[c.selectedIndex].text;
    }
    else {
        var reportDay = "";
        var reportDate = "";
        var reportMonth = "";
    }
    var d = document.getElementById("getPrompt");
    var getPrompt = d.options[d.selectedIndex].text;

    if(tableName == ""){
        alert("Please enter a table name")
    }
    else if(reportFreq == ""){
        alert("Please select the frequency of reporting")
    }
    else if(reportFreq == "Weekly" && (reportDay == "" || reportDay == "N/A")){
        alert("Please select the day of the week")
    }
    else if(reportFreq == "Monthly" && (reportDate == "" || reportDate == "N/A")){
        alert("Please input the date of the month")
    }
    else if(reportFreq == "Annually" && (reportMonth == "" || reportMonth == "N/A")){
        alert("Please select the month of the year")
    }
    else{
        var postElement = "UPDATE dataTables SET tableName='" + tableName + "', tableOwner='" + tableOwner+ "', tableDept='" + tableDept + "', reportFreq='" + 
        reportFreq+ "', reportDay='" + reportDay + "', reportDate='" + reportDate + "', reportMonth='" + reportMonth + "', getPrompt='" + getPrompt + "' WHERE id=" + currentRow["id"];

        postDb(postElement);
        location.reload();
    }
});

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

function naRender(txt){
    if(txt==""){
        return "N/A"
    }
    else{
        return txt;
    }
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
/*
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
*/