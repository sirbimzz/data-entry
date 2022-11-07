var currentRowCollection = null;
var rowCollection = null;
var current = null;

current = {};
rowCollection = {};

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

function processDTUsers(data){}

function processAdmUsers(data){
	current["AdmUsers"] = data;

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
            { "data": "accessLevel", title:"Access Level" },
            { "data": "id" },
            { "mData": null,
                "bSortable": false,
                "mRender": function (o) { return '<i class="editRow2" style="font-size:11pt; color:blue; cursor: pointer;"><i class="fas fa-edit" title="Edit"></i></i>&nbsp;&nbsp;&nbsp;<i class="delRow2" style="font-size:11pt; color:red; cursor: pointer;"><i class="fas fa-trash-alt" title="Delete"></i></i>'; },
                width:"12%", title:"Action"
            },
        ],
        columnDefs: [ 
            { "targets": [4], "visible": false },
        ],
        'searchCols': [
            null,
            null,
            null,
            null,
        ],
        "order": [[0, 'asc']],
    });

    $('#dataUsers tbody').on('click', 'i.delRow2', function () {
        table.column(4).visible(true);
        currentRow = {};

        var $row = $(this).closest("tr");
        var $tds0 = $row.find("td:eq(0)");
        var $tds1 = $row.find("td:eq(1)");
        var $tds2 = $row.find("td:eq(2)");
        var $tds3 = $row.find("td:eq(3)");
        var $tds4 = $row.find("td:eq(4)");

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
            currentRow["accessLevel"] = txt;
        });    
        $.each($tds4, function(i, el) {
            var txt = $(this).text();
            currentRow["id"] = txt;
        });

        table.column(4).visible(false);

        if (confirm("Confirm Delete of " + currentRow["fullName"])) {
            deleteAdmUsers(currentRow["id"]);
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
        currentRow = {};

        var $row = $(this).closest("tr");
        var $tds0 = $row.find("td:eq(0)");
        var $tds1 = $row.find("td:eq(1)");
        var $tds2 = $row.find("td:eq(2)");
        var $tds3 = $row.find("td:eq(3)");
        var $tds4 = $row.find("td:eq(4)");

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
            currentRow["accessLevel"] = txt;
        });    
        $.each($tds4, function(i, el) {
            var txt = $(this).text();
            currentRow["id"] = txt;
        });

        table.column(4).visible(false);

        document.getElementById('fullName').value = currentRow["fullName"];
        document.getElementById('userName').value = currentRow["userName"];
        document.getElementById('userEmail').value = currentRow["userEmail"];
        var a = document.getElementById('accessLevel');
        a.options[a.selectedIndex].text = currentRow['accessLevel'];   
    });

    for(var i = 0; i < data.length; i++) {
        if(lowCase(data[i].userName) == lowCase(current["user"]) && data[i].accessLevel == "Super Admin"){
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

function processUsers(data){	
    rowCollection["usersData"] = data;
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

function popUser(){
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
    location.replace("http://wapp-bny.nlng.net/datacentric/dataEntry/mytables.html");
}

function addRow(){
    document.getElementById('id01').style.display='block';
}

function addRow2(){
    document.getElementById('id02').style.display='block';
}

$('#addItem').click(function(){
    var dataField = document.getElementById('dataField').value;
    var dataTable = myCookies.selTable;
    var a = document.getElementById("dataType");
    var dataType = a.options[a.selectedIndex].text;

    postField (dataField,dataTable,dataType);
    createField (dataTable, dataField);
    location.reload();
});

$('#updateItem').click(function(){
    var dataField = document.getElementById('dataField').value;
    var a = document.getElementById("dataType");
    var dataType = a.options[a.selectedIndex].text;
    var oldName = myCookies.selTable + '.' + currentRow["dataField"]

    updateField(currentRow["id"],dataField,dataType);
    renameColumn (oldName,dataField);
    location.reload();
});

$('#addUser').click(function(){
    var fullName = document.getElementById('fullName').value;
    var userName = document.getElementById('userName').value;
    var userEmail = document.getElementById('userEmail').value;
    var a = document.getElementById("accessLevel");
    var accessLevel = a.options[a.selectedIndex].text;

    var postElement = "INSERT INTO adminUsers VALUES ('" + fullName + "','" + userName + "','" + userEmail + "','" + accessLevel + "')";

    postDb(postElement);
    location.reload();
});

$('#updateUser').click(function(){
    var fullName = document.getElementById('fullName').value;
    var userName = document.getElementById('userName').value;
    var userEmail = document.getElementById('userEmail').value;
    var a = document.getElementById("accessLevel");
    var accessLevel = a.options[a.selectedIndex].text;

    var postElement = "UPDATE adminUsers SET fullName='" + fullName + "', userName='" + userName + "', userEmail='" + userEmail + "', accessLevel='" + accessLevel + "' WHERE id=" + currentRow["id"];

    postDb(postElement);
    location.reload();
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