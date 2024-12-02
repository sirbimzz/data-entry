var currentRowCollection = null;
var rowCollection = null;
var current = null;

current = {};
rowCollection = {};

function processDTUsers(data){}

function showUnit(UOM){
    if(UOM != ""){
        return " (" + UOM + ")";
    }
    else{
        return "";
    }
}

function processUser(data){
	current["user"] = lowCase(data);
    document.getElementById('currUser').innerHTML = titleCase(data);

    var url = (window.location.search).substring(1);
    if(url != ""){
        document.cookie = "currTable=" + url;
        document.cookie = "refreshCount=" + 1;
        location.replace("http://wapp-bny.nlng.net/datacentric/dataEntry/datatable.html");
    }
    else{
        //document.cookie = "refreshCount=" + 3;
    }
}

function getActiveDir(data){
	current["dir"] = data;
}

function processUsers(data){	
    rowCollection["usersData"] = data;
}

function getFields(data){
	current["Fields"] = data;
    var cCol = 1;
    var colList = "&nbsp;&nbsp;- RecordDate<br>";
    for(i=0; i<current["Fields"].length;i++){
        if(current["Fields"][i].dataTable == myCookies.currTable){
            colList = colList + '&nbsp;&nbsp;- ' + current["Fields"][i].dataField + '<br>'
            cCol = cCol + 1;
        }
    }
    document.getElementById('colList').innerHTML = colList;
    document.getElementById('cCol').innerHTML = cCol;
}

function processAdmUsers(data){
	current["AdmUsers"] = data;
}

function checkDataType(col, tabl){
    for(i=0; i<current["Fields"].length;i++){
        if(col == current["Fields"][i].dataField && tabl == current["Fields"][i].dataTable){
            return current["Fields"][i].dataType;
        }
        else{}
    }
}
function daysInMonth (date) {
    var month = (new Date(date)).getMonth() +1;
    var year = (new Date(date)).getFullYear();
    return new Date(year, month, 0).getDate();
}
function convNo(txt){
    if(txt==""){
        return 0
    }
    else{
        return parseFloat(txt)
    }
}

function setupTable(data){
    current["data"] = data;

    var newRow = {};
    var thisdata = {};
    var thisArray = [];
    var thisdata2 = {};
    var thisArray2 = [];
    var thisdata3 = {};
    var thisArray3 = [];
    current["count"] = 0;

    if(myCookies.currTable == 'dt_divisional_kpis.audit_reviews_and_assurances' || myCookies.currTable == 'dt_divisional_kpis.contracts_and_procurements' || myCookies.currTable == 'dt_divisional_kpis.technical_services'){
        thisdata.data = 'RECORD_ID'
        thisdata.title = 'RecordDate'
        thisdata2.data = 'RECORD_ID'
        thisdata2.title = 'RecordDate'
        thisdata2.type = ''
        thisdata.render = dateRender2
        thisArray.push({...thisdata})
        thisArray2.push({...thisdata2})
        newRow['RECORD_ID'] = unRender(formatDate(new Date()));
    }
    else {
        thisdata.data = 'RecordDate'
        thisdata.title = 'RecordDate'
        thisdata2.data = 'RecordDate'
        thisdata2.title = 'RecordDate'
        thisdata2.type = ''
        thisdata.render = dateRender
        thisArray.push({...thisdata})
        thisArray2.push({...thisdata2})
        newRow['RecordDate'] = formatDate(new Date());
    }

    for(i=0; i<current["Fields"].length;i++){
        if(current["Fields"][i].dataTable == myCookies.currTable){
            thisdata.data = current["Fields"][i].dataField;
            thisdata.title = current["Fields"][i].dataField + showUnit(current["Fields"][i].dataUOM);

            thisdata2.data = current["Fields"][i].dataField;
            thisdata2.title = current["Fields"][i].dataField;

            thisdata3.data = current["Fields"][i].dataField;
            thisdata3.list = current["Fields"][i].dropList;

            newRow[current["Fields"][i].dataField] = "";

            if(current["Fields"][i].dataType == "Date"){
                thisdata.render = dateRender;
            }
            else if(current["Fields"][i].dataType == "DateTime"){
                thisdata.render = dateTimeRender;
            }
            else if(current["Fields"][i].dataType == "Number"){
                thisdata.render = numberWithCommas;
            }
            else{
                thisdata.render = noRender;
            }
            thisdata2.type = current["Fields"][i].dataType;
            thisArray.push({...thisdata})
            thisArray2.push({...thisdata2})
            thisArray3.push({...thisdata3})
            current["count"] = current["count"]+1;
        }
        else{}
    }

    if(myCookies.currTable == 'dt_divisional_kpis.audit_reviews_and_assurances' || myCookies.currTable == 'dt_divisional_kpis.contracts_and_procurements' || myCookies.currTable == 'dt_divisional_kpis.technical_services'){
        thisdata.data = 'UPDATED'
        thisdata.title = 'UpdatedDate'
        thisdata2.data = 'UPDATED'
        thisdata2.title = 'UpdatedDate'
        thisdata2.type = ''
        thisdata.render = dateRender
        thisArray.push({...thisdata})
        thisArray2.push({...thisdata2})

        thisdata.data = 'UPDATED_BY'
        thisdata.title = 'UpdatedBy'
        thisdata2.data = 'UPDATED_BY'
        thisdata2.title = 'UpdatedBy'
        thisdata2.type = ''
        thisdata.render = noRender
        thisArray.push({...thisdata})
        thisArray2.push({...thisdata2})

        thisdata.data = null
        thisdata.title = 'ID'
        thisdata2.data = null
        thisdata2.title = 'ID'
        thisdata2.type = ''
        thisdata.render = noRender
        thisArray.push({...thisdata})
        thisArray2.push({...thisdata2})
    }
    else {
        thisdata.data = 'UpdatedDate'
        thisdata.title = 'UpdatedDate'
        thisdata2.data = 'UpdatedDate'
        thisdata2.title = 'UpdatedDate'
        thisdata2.type = ''
        thisdata.render = dateRender
        thisArray.push({...thisdata})
        thisArray2.push({...thisdata2})

        thisdata.data = 'UpdatedBy'
        thisdata.title = 'UpdatedBy'
        thisdata2.data = 'UpdatedBy'
        thisdata2.title = 'UpdatedBy'
        thisdata2.type = ''
        thisdata.render = noRender
        thisArray.push({...thisdata})
        thisArray2.push({...thisdata2})

        thisdata.data = 'id'
        thisdata.title = 'ID'
        thisdata2.data = 'id'
        thisdata2.title = 'ID'
        thisdata2.type = ''
        thisdata.render = noRender
        thisArray.push({...thisdata})
        thisArray2.push({...thisdata2})
    }

    thisdata.data = null;
    thisdata.title = 'Action'
    thisdata2.data = null
    thisdata2.title = 'Action'
    thisdata2.type = ''
    thisdata.render = editRender
    thisArray.push({...thisdata})
    thisArray2.push({...thisdata2})

    thisdata.data = null;
    thisdata.title = 'Action'
    thisdata2.data = null
    thisdata2.title = 'Action2'
    thisdata2.type = ''
    thisdata.render = editRender2
    thisArray.push({...thisdata})
    thisArray2.push({...thisdata2})

    if(myCookies.currTable == 'dt_divisional_kpis.audit_reviews_and_assurances' || myCookies.currTable == 'dt_divisional_kpis.contracts_and_procurements' || myCookies.currTable == 'dt_divisional_kpis.technical_services'){
        newRow['UPDATED'] = "";
        newRow['UPDATED_BY'] = "";
        current["newRow"] = newRow;
    }
    else {
        newRow['id'] = "";
        newRow['UpdatedDate'] = "";
        newRow['UpdatedBy'] = "";
        current["newRow"] = newRow;
    }

    current["tableDef"] = thisArray;
    current["tableDef2"] = thisArray2;
    current["List"] = thisArray3;

    //current["highlightRules"] = "if(data.id==''){$('td', row).addClass('highlightRow')}"

    setTable(data);
}

function editRender(data){
    return '<i class="editRow" style="font-size:11pt; color:blue; cursor: pointer;"><i class="fas fa-edit" title="Edit"></i></i>';
}

function editRender2(data){
    return '';
}

function numberWithCommas(x) {
    if(x == ""){
        return "";
    }
    else{
        x = (parseFloat(x)).toFixed(2);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

  	
function setTable(data){
    current["data"] = data;
        
    $("#dataEntry").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
    });

    var table = $('#dataEntry').DataTable({
        "rowCallback": function( row, data ) {
            if(data.id==''){$('td', row).addClass('highlightRow')}

            if(myCookies.currTable == 'ROB_Report'&&data.Category=='Laden'){$('td', row).addClass('ladenColor')}
            if(myCookies.currTable == 'ROB_Report'&&data.Category=='Loading/Discharging'){$('td', row).addClass('loadColor')}
            if(myCookies.currTable == 'ROB_Report'&&data.Category=='Dry Dock/Intermediate Survey/Refit'){$('td', row).addClass('dryColor')}
            if(myCookies.currTable == 'ROB_Report'&&data.Category=='Sub Charter'){$('td', row).addClass('subColor')}

            if(myCookies.currTable == 'GHG_Shipping_Monthly' && (data.CO2e<0 || data.CO2<0 || data.N20<0 || data.CH4<0 || data.CII<0)){$('td', row).addClass('badData')}
        },
        deferLoading:true,
        paging: false,
        "fixedHeader": {
            "header": true,
        },
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        buttons: [
            { extend: 'excel', text: 'Export  to Excel' }
        ],
        "data": data,
        select:"single",
        "columns": current["tableDef"],
        columnDefs: [ 
            { type: 'date', 'targets': [0, current["count"]+1] },
            //{ "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10] }
        ],
        "order": [[0, 'desc'], [current["count"]+3, 'asc']],
    });

    $('#addRow').on('click', function () {
        table.row.add(current["newRow"]).draw(false);
    });

    table.column(current["count"]+3).visible(false);
    table.column(current["count"]+5).visible(false);

    // Special set up for Fin fans table based on user request
    if (myCookies.currTable == "TR4_Fin_Fans" || myCookies.currTable == "TR5_Fin_Fans" || myCookies.currTable == "TR6_Fin_Fans") {
        table.column(0).visible(false);
        table.column(5).visible(false);
        table.column(11).visible(false);
        table.column(12).visible(false);
    }

    if(myCookies.currTable == undefined || myCookies.currTable == ""){
        document.getElementById('homepage').style.display='none';
        document.getElementById('loading').style.display='none';
        document.getElementById('error').style.display='block';
    }
    else{
        for(i=0; i<rowCollection["usersData"].length;i++){
            if((current["user"] ==rowCollection["usersData"][i].userName && rowCollection["usersData"][i].tableName == myCookies.currTable && rowCollection["usersData"][i].userAccess == "Admin") || (current["user"] ==rowCollection["usersData"][i].userName && rowCollection["usersData"][i].tableName == myCookies.currTable && rowCollection["usersData"][i].userAccess == "Read & Write")){
                table.column(current["count"]+4).visible(true);
                document.getElementById('addRow').style.display='block';
                //document.getElementById('batchUpload').style.display='block';
                document.getElementById('delAll').style.display='none';
                document.getElementById('homepage').style.display='block';
                document.getElementById('loading').style.display='none';
                document.getElementById('error').style.display='none';
                break;
            }
            else if(current["user"] ==rowCollection["usersData"][i].userName && rowCollection["usersData"][i].tableName == myCookies.currTable && rowCollection["usersData"][i].userAccess == "Read Only"){
                table.column(current["count"]+4).visible(false);
                document.getElementById('homepage').style.display='block';
                document.getElementById('loading').style.display='none';
                document.getElementById('error').style.display='none';
                document.getElementById('addRow').style.display='none';
                document.getElementById('batchUpload').style.display='none';
                document.getElementById('delAll').style.display='none';
                break;
            }
            else{
                document.getElementById('homepage').style.display='none';
                document.getElementById('loading').style.display='none';
                document.getElementById('error').style.display='block';
                document.getElementById('addRow').style.display='none';
                //document.getElementById('batchUpload').style.display='none';
                document.getElementById('delAll').style.display='none';
            }
        }
    }
    document.getElementById('tableNo').innerHTML = myCookies.currTable;

    if (myCookies.currTable == "TR4_Fin_Fans" || myCookies.currTable == "TR5_Fin_Fans" || myCookies.currTable == "TR6_Fin_Fans") {
        document.getElementById('addRow').style.display='none';
    }

    /*
    $('#dataEntry thead th').each(function() {
        var title = $(this).text();
        if(title == 'CO2 (T)'){
          $(this).append('<br /><input>');		  
        }
        var title = $(this).text();
        if(title == 'CO2e (T)'){
          $(this).append('<br /><input>');		  
        }
        var title = $(this).text();
        if(title == 'N2O (T)'){
          $(this).append('<br /><input>');		  
        }
        var title = $(this).text();
        if(title == 'CH4 (T)'){
          $(this).append('<br /><input>');		  
        }
        var title = $(this).text();
        if(title == 'CII (T)'){
          $(this).append('<br /><input>');		  
        }
      });
    */

    $('#dataEntry thead th').each(function() {
        if (myCookies.currTable == 'MSE_Actions') {
            $('th.sorting').off();
            var title = $(this).text();
            if(title == 'RecordDate' || title == 'MSE_ID' || title == 'MSE_ID' || title == 'sNo' || title == 'MSE_Themes' || title == 'MSE_Who' || title == 'MSE_When' || title == 'UpdatedDate'){
                $(this).append('<br /><input style="color: black;">');		  
            }
        }
        
    });

    table.columns().every( function () {
        var that = this;
             
        $( 'select', this.header() ).on( 'keyup change', function () {
          if ( that.search() !== this.value ) {
            that
            .search( this.value )
            .draw();
          }
        } );
        $( 'textarea', this.header() ).on( 'keyup change', function () {
          if ( that.search() !== this.value ) {
            that
            .search( this.value )
            .draw();
          }
        } );
        $( 'input', this.header() ).on( 'keyup change', function () {
          if ( that.search() !== this.value ) {
            that
            .search( this.value )
            .draw();
          }
        } );
    });

    //postVisit() 
    
    //Edit Rows
    $('#dataEntry tbody').on('click', 'i.editRow', function () {
        currentRow = {};
        table.column(current["count"]+3).visible(true);
        table.column(current["count"]+5).visible(true);

        //special set up for fin fans tables
        if (myCookies.currTable == "TR4_Fin_Fans" || myCookies.currTable == "TR5_Fin_Fans" || myCookies.currTable == "TR6_Fin_Fans") {
            table.column(0).visible(true);
            table.column(5).visible(true);
            table.column(11).visible(true);
            table.column(12).visible(true);
        }

        var $row = $(this).closest("tr");
        for(j=0; j<current["tableDef2"].length;j++){
            var thisID = String(current["tableDef2"][j].title)
            if(current["tableDef2"][j].title == "RecordDate"){
                var $tdsj = $row.find('td:eq('+ j +')');
                $.each($tdsj, function(i, el) {
                    var txt = formatDatee($(this).text());
                    currentRow["RecordDate"] = txt;
                    $(this).text('');
                    $(this).append('<input type="date" id="' + thisID + '" value="' + txt + '">');
                });
            }
            else if(current["tableDef2"][j].type == "Date"){
                var $tdsj = $row.find('td:eq('+ j +')');
                $.each($tdsj, function(i, el) {
                    var txt = formatDatee($(this).text());
                    $(this).text('');
                    $(this).append('<input type="date" id="' + thisID + '" value="' + txt + '">');
                });
            }
            else if(current["tableDef2"][j].type == "DateTime"){
                var $tdsj = $row.find('td:eq('+ j +')');
                $.each($tdsj, function(i, el) {
                    var txt = fmtDateTime($(this).text());
                    $(this).text('');
                    $(this).append('<input type="datetime-local" id="' + thisID + '" value="' + txt + '">');
                });
            }
            else if(current["tableDef2"][j].type == "Number"){
                var $tdsj = $row.find('td:eq('+ j +')');
                $.each($tdsj, function(i, el) {
                    var txt = ($(this).text()).replace(/\,/g,'');
                    $(this).text('');
                    $(this).append('<input type="number" id="' + thisID + '" value="' + parseFloat(txt) + '">');
                });
            }
            else if(current["tableDef2"][j].type == "Drop-down List"){
                var $tdsj = $row.find('td:eq('+ j +')');
                $.each($tdsj, function(i, el) {
                    var txt = $(this).text();
                    $(this).text('');
                    $(this).append('<select id="' + thisID + '">' + getList(current["tableDef2"][j].title) + '</select>');
                    var a = document.getElementById(String(thisID));
                    a.options[a.selectedIndex].text = txt; 
                });
            }
            else if (current["tableDef2"][j].title == "Action2" && (myCookies.currTable == "TR4_Fin_Fans" || myCookies.currTable == "TR5_Fin_Fans" || myCookies.currTable == "TR6_Fin_Fans")){
                var $tdsj = $row.find('td:eq('+ j +')');
                $.each($tdsj, function(i, el) {
                    var txt = $(this).text(); 
                    $(this).text('');
                    $(this).append('<i class="saveRow" style="font-size:11pt; color:green; cursor: pointer;"><i class="fas fa-save" title="Save"></i></i>');
                });
            }
            else if (current["tableDef2"][j].title == "Action2"){
                var $tdsj = $row.find('td:eq('+ j +')');
                $.each($tdsj, function(i, el) {
                    var txt = $(this).text(); 
                    $(this).text('');
                    $(this).append('<i class="saveRow" style="font-size:11pt; color:green; cursor: pointer;"><i class="fas fa-save" title="Save"></i></i>&nbsp;&nbsp;&nbsp;<i class="delRow" style="font-size:11pt; color:red; cursor: pointer;"><i class="fas fa-trash-alt" title="Delete"></i></i>');
                });
            }
            else if (current["tableDef2"][j].data == null || current["tableDef2"][j].title == "UpdatedBy" || current["tableDef2"][j].title == "UpdatedDate"){}
            else if (current["tableDef2"][j].title == "ID"){
                var $tdsj = $row.find('td:eq('+ j +')');
                $.each($tdsj, function(i, el) {
                    var txt = $(this).text(); 
                    currentRow["id"] = txt;
                });
            }
            else if(current["tableDef2"][j].type == "Long Text"){
                var $tdsj = $row.find('td:eq('+ j +')');
                $.each($tdsj, function(i, el) {
                    var txt = $(this).text();
                    $(this).text('');
                    $(this).append('<textarea rows="2" cols="50" id="' + thisID + '">' + txt + '</textarea>');
                });
            }
            else {
                var $tdsj = $row.find('td:eq('+ j +')');
                $.each($tdsj, function(i, el) {
                    var txt = $(this).text(); 
                    $(this).text('');
                    $(this).append('<input id="' + thisID + '" value="' + txt + '">');
                });
            }
        }
        table.column(current["count"]+3).visible(false);
        table.column(current["count"]+4).visible(false); 

        //special set up for fin fans table
        // if (myCookies.currTable == "TR4_Fin_Fans" || myCookies.currTable == "TR5_Fin_Fans" || myCookies.currTable == "TR6_Fin_Fans") { {
        //     table.column(0).visible(false);
        //     table.column(5).visible(false);
        //     table.column(11).visible(false);
        //     table.column(12).visible(false);
        // }
    })
    $('#dataEntry tbody').on('click', 'i.delRow', function () {
        if (confirm("Confirm Delete")) {
            var tableName = myCookies.currTable;
            var lastUpdate2 = formatDate2(new Date());
            var entryNo = data.length - 1;

            var postElement = "UPDATE dataTables SET lastUpdate2='" + lastUpdate2 + "', entryNo='" + entryNo + "' WHERE tableName='" + tableName + "'";

            if (myCookies.currTable == "dt_divisional_kpis.audit_reviews_and_assurances" || myCookies.currTable == 'dt_divisional_kpis.contracts_and_procurements' || myCookies.currTable == 'dt_divisional_kpis.technical_services'){
                var postElement2 = "DELETE FROM " + tableName + " WHERE RECORD_ID=" + unRender(currentRow["RecordDate"]);
            }
            else {
                var postElement2 = "DELETE FROM " + tableName + " WHERE id=" + currentRow["id"];
            }

            postElement = postElement + "; " + postElement2;

            //deleteData(currentRow["id"]);
            postDb (postElement);
            location.reload();
        } else {}
    })

    $('#dataEntry tbody').on('click', 'i.saveRow', function () {
        var UpdatedDate = formatDate(new Date());
        var UpdatedBy = titleCase(current["user"]);
        var tableName = myCookies.currTable;
        var lastUpdate2 = formatDate2(new Date());
        var entryNo = data.length;

        if(currentRow["id"] == '' || String(currentRow["id"])  == "undefined"){
            var postElement = "INSERT INTO " + myCookies.currTable + " (";

            for(i=0; i<current["tableDef2"].length - 3; i++){
                if(current["tableDef2"][i].data == null){}
                else if(String(current["tableDef2"][i].title) == "RecordDate" && (myCookies.currTable == "dt_divisional_kpis.audit_reviews_and_assurances" || myCookies.currTable == 'dt_divisional_kpis.contracts_and_procurements' || myCookies.currTable == 'dt_divisional_kpis.technical_services')){
                    var thisID = "RECORD_ID"
                    var currField = thisID;
                    postElement = postElement + currField + ","
                } 
                else if(String(current["tableDef2"][i].title) == "UpdatedDate" && (myCookies.currTable == "dt_divisional_kpis.audit_reviews_and_assurances" || myCookies.currTable == 'dt_divisional_kpis.contracts_and_procurements' || myCookies.currTable == 'dt_divisional_kpis.technical_services')){
                    var thisID = "UPDATED"
                    var currField = thisID;
                    postElement = postElement + currField + ","
                } 
                else if(String(current["tableDef2"][i].title) == "UpdatedBy" && (myCookies.currTable == "dt_divisional_kpis.audit_reviews_and_assurances" || myCookies.currTable == 'dt_divisional_kpis.contracts_and_procurements' || myCookies.currTable == 'dt_divisional_kpis.technical_services')){
                    var thisID = "UPDATED_BY"
                    var currField = thisID;
                    postElement = postElement + currField + ","
                } 
                else{
                    var thisID = String(current["tableDef2"][i].title)
                    var currField = thisID;
                    postElement = postElement + currField + ","
                }                
            }
            postElement = postElement.substring(0, postElement.length - 1) + ") VALUES (";

            for(i=0; i<current["tableDef2"].length - 5; i++){
                if(current["tableDef2"][i].title == "RecordDate"){
                    var thisID = String(current["tableDef2"][i].title)
                    var currField = thisID;
                    var currData = formatDate(document.getElementById(thisID).value);
                    postElement = postElement + "'" + unRender(currData) + "',"
                }
                else if(current["tableDef2"][i].type == "Date"){
                    var thisID = String(current["tableDef2"][i].title)
                    var currField = thisID;
                    var currData = formatDate(document.getElementById(thisID).value);
                    if (currData == 'NaN-NaN-NaN'){
                        postElement = postElement + "'',"
                    }
                    else{
                        postElement = postElement + "'" + currData + "',"
                    }
                }
                else if(current["tableDef2"][i].type == "DateTime"){
                    var thisID = String(current["tableDef2"][i].title)
                    var currField = thisID;
                    var currData = formatDateTime(document.getElementById(thisID).value);
                    if (currData == 'NaN-NaN-NaN'){
                        postElement = postElement + "'',"
                    }
                    else{
                        postElement = postElement + "'" + currData + "',"
                    }
                }
                else if(current["tableDef2"][i].type == "Drop-down List"){
                    var thisID = String(current["tableDef2"][i].title)
                    var currField = thisID;
                    var a = document.getElementById(thisID);
                    var currData = a.options[a.selectedIndex].text;
                    postElement = postElement + "'" + currData + "',"
                }
                else if(current["tableDef2"][i].data == "Planned_Availability"){}
                else{
                    var thisID = String(current["tableDef2"][i].title);
                    var currField = thisID;
                    var currData = document.getElementById(thisID).value;
                    postElement = postElement + "'" + currData + "',"
                }
            }
            postElement = postElement + "'" + UpdatedDate + "','" + UpdatedBy + "')"

            var postElement2 = "UPDATE dataTables SET lastUpdate2='" + lastUpdate2 + "', entryNo='" + entryNo + "' WHERE tableName='" + tableName + "'";

            postElement = postElement + "; " + postElement2;

            postDb (postElement);
            postDb (postElement2);
            location.reload();
        }
        else{
            if (myCookies.currTable == "dt_divisional_kpis.audit_reviews_and_assurances" || myCookies.currTable == 'dt_divisional_kpis.contracts_and_procurements'){
                var postElement = "UPDATE " + myCookies.currTable + " SET UPDATED='" + UpdatedDate + "',UPDATED_BY='" + UpdatedBy + "',";
            }
            else {
                var postElement = "UPDATE " + myCookies.currTable + " SET UpdatedDate='" + UpdatedDate + "',UpdatedBy='" + UpdatedBy + "',";
            }

            for(i=0; i<current["tableDef2"].length - 5;i++){
                if(current["tableDef2"][i].data == null){}
                else if(current["tableDef2"][i].title == "RecordDate" && myCookies.currTable != "dt_divisional_kpis.audit_reviews_and_assurances" && myCookies.currTable != 'dt_divisional_kpis.contracts_and_procurements' && myCookies.currTable != 'dt_divisional_kpis.technical_services'){
                    var thisID = String(current["tableDef2"][i].title)
                    var currField = thisID;
                    var currData = formatDate(document.getElementById(thisID).value);
                    postElement = postElement + currField + "='" + currData + "',";
                }
                else if(current["tableDef2"][i].type == "Date" && current["tableDef2"][i].title != "RecordDate"){
                    var thisID = String(current["tableDef2"][i].title)
                    var currField = thisID;
                    var currData = formatDate(document.getElementById(thisID).value);
                    if (currData == 'NaN-NaN-NaN'){
                        postElement = postElement + currField + "='',"
                    }
                    else{
                        postElement = postElement + currField + "='" + currData + "',"
                    }
                }
                else if(current["tableDef2"][i].type == "DateTime"){
                    var thisID = String(current["tableDef2"][i].title)
                    var currField = thisID;
                    var currData = formatDateTime(document.getElementById(thisID).value);
                    if (currData == 'NaN-NaN-NaN'){
                        postElement = postElement + currField + "='',"
                    }
                    else{
                        postElement = postElement + currField + "='" + currData + "',"
                    }
                }
                else if(current["tableDef2"][i].type == "Drop-down List"){
                    var thisID = String(current["tableDef2"][i].title)
                    var currField = thisID;
                    var a = document.getElementById(thisID);
                    var currData = a.options[a.selectedIndex].text;
                    postElement = postElement + currField + "='" + currData + "',"
                }
                else if(current["tableDef2"][i].data == "Planned_Availability"){}
                else if (current["tableDef2"][i].title != "RecordDate"){
                    var thisID = String(current["tableDef2"][i].title)
                    var currField = thisID;
                    var currData = document.getElementById(thisID).value;
                    postElement = postElement + currField + "='" + currData + "',"
                }
            }

            if (myCookies.currTable == "dt_divisional_kpis.audit_reviews_and_assurances" || myCookies.currTable == 'dt_divisional_kpis.contracts_and_procurements' || myCookies.currTable == 'dt_divisional_kpis.technical_services'){
                postElement = postElement.substring(0, postElement.length - 1) + " WHERE RECORD_ID = " + unRender(currentRow["RecordDate"]);
            }
            else {
                postElement = postElement.substring(0, postElement.length - 1) + " WHERE id = " + currentRow["id"];
            }

            var postElement2 = "UPDATE dataTables SET lastUpdate2='" + lastUpdate2 + "', entryNo='" + entryNo + "' WHERE tableName='" + tableName + "'";

            postElement = postElement + "; " + postElement2;
            postDb (postElement);
            location.reload();
        }
        
    }) 

    /*if(myCookies.refreshCount == 1){
        document.cookie = "refreshCount=" + 2;
        location.reload();
    }
    else if(myCookies.refreshCount == 2){
        document.cookie = "refreshCount=" + 3;
        location.replace("http://wapp-bny.nlng.net/datacentric/dataEntry/datatable.html");
    }
    else{}*/
}

function sort_by_key(array, key){
	return array.sort(function(a, b){
		var x = a[key]; var y = b[key];
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
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

//console.log(myCookies.currTable);

function getTable(){
    current["data2"] = sort_by_key(current["data"], 'UpdatedDate');
    var tableName = myCookies.currTable;
    var entryNo = current["data2"].length;
    if(entryNo == 0){
        var lastUpdate2 = "";
    }
    else{
        var lastUpdate2 = formatDate2(current["data2"][current["data2"].length-1]['UpdatedDate']);
    }
    var postElement = "UPDATE dataTables SET lastUpdate2='" + lastUpdate2 + "', entryNo='" + entryNo + "' WHERE tableName='" + tableName + "'";

    postDb(postElement);
    location.href = "http://wapp-bny.nlng.net/datacentric/dataEntry/index.html";
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
        (String(d.getFullYear())).slice(-2)
    ].join(sep || '-');

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
		var dd = date;
        var d=  new Date(dd);
        return yyyymmmdd(d);
    }else{
        return "<Null>";
    }
}

function dateRender2( ID ) {
	if (ID != "" && String(ID) != "undefined") {
        var yyyy = ID.substring(0,4)
        var mm = ID.substring(4,6)
        var dd = ID.substring(6,8)
        var date = yyyy + "-" + mm + "-" + dd;
        return dateRender(date)
    }
}

function unRender(date){
    return date.replace(/-/g,"");
}

function noRender(data){
    return data;
}

    
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var monthNo = ["01","02","03","04","05","06","07","08","09","10","11","12"];

function formatDate2(data, type, row) {
    var d = new Date(data),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

function formatDate(data, type, row) {
    var d = new Date(data),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    //return [day, month, year].join('/');
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

function fmtDateTime(date) {
    if (date == "") {
		return "";
	}
	else {
        var date = date.split(" ");
        var dateParts = date[0];
        var timeParts = date[1];
        var d = new Date(dateParts),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-') + "T" + timeParts;
    }
}

function formatDateTime(date) {
	if (date == "") {
		return "";
	}
	else {
		//var dateString = "23/10/2015"; // Oct 23
		var date = date.split("T");
        var dateParts = date[0];
        var timeParts = date[1];

        var d = new Date(dateParts),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        //return [day, month, year].join('/') + " " + timeParts;
        return [year, month, day].join('-') + " " + timeParts;
	}
}

function getList(col){
    var selList = '<option value=""></option>';

    for(var i=0; i<current["List"].length; i++){
        if(col == current["List"][i].data){
            var dropList = current["List"][i].list;
            dropList = dropList.split(',')
        }
    }
    for(var j=0; j<dropList.length; j++){
        selList = selList + '<option value="' + dropList[j] + '">' + dropList[j] + '</option>'
    }
    return selList
}

function dateTimeRender( date ) {
    if (date == "") {
		return "";
	}
	else if(date){
        var date = date.split(" ");
        var dateParts = date[0];
        var timeParts = date[1];
		var dd = dateParts;
        var d=  new Date(dd);
        return yyyymmmdd(d) + " " + timeParts.substring(0,5);
    }
    else{
        return "<Null>";
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

function getTables(data){}

$('#batchUpload').on('click', function () {
    //var postElement = "UPDATE batchInfo SET tableName='" + myCookies.currTable + "', currUser='" + current["user"] + "', status='" + 0 + "', entryNo='" + 'BNY-S-560' + "', dbName='" + 'dataEntryDB' + "' WHERE id=1";

    /*var jsonObj = [{"tableName": + "" + myCookies.currTable + "" ,"currUser": + "" + current["user"] + "","status": 0,"entryNo":0}];
    $.ajax({
        url: "php/createFile.php",
        data: {
            data: jsonObj
        },
        type: "POST"
    });
    */
    //postDb(postElement);
    document.getElementById('id01').style.display='block';
});


/*window.setInterval(function(){
    $.ajax({
        url : 'php/uploads/batch_info.json', // your php file
        type : 'GET', // type of the HTTP request
        dataType : 'json',
        async: true,
        cache: false,
        success : function(data){
            if(data[0].status == "Complete"){
                document.getElementById('loadPg').innerHTML = '<span style="color:green; font-size:12pt;">File uploaded to database successfully</span><br><br><button onclick="upload3()">Done</button>';
                current["entryNo"] = data[0].entryNo;
            }
            else{
                document.getElementById('loadPg').innerHTML = '<div style="font-size:12pt; color:red;">Running Batch Upload. ' + data[0].status + '% Loading...</div>';
            }
        }
    });
}, 1000);*/

$('#delAll').on('click', function () {
    if (confirm("Confirm delete of all the table entries")) {
        deleteAll(myCookies.currTable);
        var tableName = myCookies.currTable;
        var lastUpdate2 = formatDate2(new Date());
        var entryNo = 0;

        var postElement = "UPDATE dataTables SET lastUpdate2='" + lastUpdate2 + "', entryNo='" + entryNo + "' WHERE tableName='" + tableName + "'";

        postDb(postElement);
        location.reload();
    } else {}
});

function openFolder(){
    runBat('fileName');
}
/*
$('#upload2').on('click', function () {
    runBat('fileName');
    document.getElementById("loadPg").style.display = "block";
    document.getElementById("uploadPg").style.display = "none";
});

$('#upload').on('click', function() {
    var formData = new FormData();
    uploadFile(formData);
});

function upload3(){
    var tableName = myCookies.currTable;
    var lastUpdate2 = formatDate2(new Date());
    var entryNo = current["entryNo"];

    var postElement = "UPDATE dataTables SET lastUpdate2='" + lastUpdate2 + "', entryNo='" + entryNo + "' WHERE tableName='" + tableName + "'";

    postDb(postElement);
    location.reload();
};
  
function uploadFile(form_data) {
    var file_data = $('#sortpicture').prop('files')[0];               
    form_data.append('file', file_data);                             
    $.ajax({
      url: 'php/uploadFile.php', // <-- point to server-side PHP script 
      dataType: 'text',  // <-- what to expect back from the PHP script, if anything
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,                    
      type: 'post',
      success: function(php_script_response){
        var dataResult = JSON.parse(php_script_response);
  
        if(dataResult.statusCode==201 && dataResult.fileName==null){
          alert("No file selected!");
        }
        else if(dataResult.statusCode==201 && dataResult.fileName!=null){
          alert("Filename already exists!");
        }
        else if(dataResult.statusCode==202){
          alert("Your fille is too large!");
        }
        else if(dataResult.statusCode==203){
            console.log(dataResult.fileName)
          alert("Only csv files are allowed!");
        }
        else if(dataResult.statusCode==201){
          alert("There was an error uploading your file!");
        }
        else if(dataResult.statusCode==200) {
          //alert("File uploaded successfully!")
          document.getElementById("uploadMsg").style.display = "block";
          document.getElementById("upload2").style.display = "block";
          document.getElementById("sortpicture").style.display = "none";
          document.getElementById("upload").style.display = "none";
          console.log(dataResult.fileName)
        }
        else if(dataResult.statusCode==204){
          alert("There was an error uploading your file!"); 						
        }
        else if(dataResult.statusCode==205){
          alert("No file selected!");					
        }
      }
    });
}
*/

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
function reloadPage(){
    $("#dataEntry").dataTable().fnDestroy()
    $.ajax({
        url : 'php/getUser.php', // your php file
        type : 'GET', // type of the HTTP request
        success : function(data){
            var obj = data.split('\\');
            var userName = obj[1];
            processUser(userName);
            $.ajax({
                url : 'php/getAdminUsers.php', // your php file
                type : 'GET', // type of the HTTP request
                cache: false,
                success : function(data){
                    var obj = jQuery.parseJSON(data);
                    processAdmUsers(obj);
                    $.ajax({
                        url : 'php/getUsersData.php', // your php file
                        type : 'GET', // type of the HTTP request
                        cache: false,
                        success : function(data){
                            var obj = jQuery.parseJSON(data);
                            processUsers(obj);
                            $.ajax({
                                url : 'php/getDTUsers.php', // your php file
                                type : 'GET', // type of the HTTP request
                                cache: false,
                                success : function(data){
                                    var obj = jQuery.parseJSON(data);
                                    processDTUsers(obj);
                                    $.ajax({
                                        url : 'php/getActiveDir.php', // your php file
                                        type : 'GET', // type of the HTTP request
                                        cache: false,
                                        success : function(data){
                                            var obj = jQuery.parseJSON(data);
                                            getActiveDir(obj);
                                            $.ajax({
                                                url : 'php/getDataTables.php', // your php file
                                                type : 'GET', // type of the HTTP request
                                                cache: false,
                                                success : function(data){
                                                    var obj = jQuery.parseJSON(data);
                                                    getTables(obj);
                                                    $.ajax({
                                                        url : 'php/getDataFields.php', // your php file
                                                        type : 'GET', // type of the HTTP request
                                                        cache: false,
                                                        success : function(data){
                                                            var obj = jQuery.parseJSON(data);
                                                            getFields(obj);
                                                            $.ajax({
                                                                url : 'php/getData.php', // your php file
                                                                type : 'GET', // type of the HTTP request
                                                                cache: false,
                                                                success : function(data){
                                                                    var obj = jQuery.parseJSON(data);
                                                                    setupTable(obj);
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}