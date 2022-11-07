function hidePopup(){
	$("#popup").hide();
}

function showActive(evt){	
	loadDataToDisplayTable(testdata.data, "Active Concessoins");
}

function showPendingApproval(){
	loadDataToDisplayTable(processedData.Status[0].PendingList, "Concessoins Awaiting Approval");
}

function showHseRelated(){
	loadDataToDisplayTable(processedData.HSSECount.list, "HSE Barrier Related Concessoins");
}

function popUpClicked(e){
	console.log(e);
}
$("#popup").click(function(e){console.log(e);});;

function stopPropagation(evt){
	evt.stopPropagation();
}

var fullMonths = ["January",
				  "February",
				  "March",
				  "April",
				  "May",
				  "June",
				  "July",
				  "August",
				  "September",
				  "October",
				  "November",
				  "December"
				  ];
function handleTrendClicked(d, element) { 

	console.log("In data point click, d",d,"element",element);
	var date = new Date(d.x);
	var mm = date.getMonth();
	var yy = date.getFullYear();
	loadDataToDisplayTable(processedData.AllTrend.findByMonth(yy, mm+1).list,
		"Concessions Active in "+fullMonths[mm]+" " + yy);
}

function handleAgeClicked(d, element){
	console.log(d);
}

var table;

function loadDataToDisplayTable(data, title){
	$("#popup").show();
	$("#popupTitle").html(title);
	if(!table){
		table = $('#displayTable').DataTable( {
    	    data: data,
    	    columns: [
    	    	{
    	            "className":      'details-control',
    	            "orderable":      false,
    	            "data":           null,
    	            "defaultContent": ''
    	        },
				{ "data": "area" },
				{ "data": "equipTag" },
				{ "data": "dateRecord" },
				{ "data": "planCloseDate" },
				{ "data": "revCloseDate" },
				{ "data": "criticality" },
				{ "data": "taskOwner" },
				{ "data": "status" },
    	    ],
    	    "scrollY":        "400px",
    	    "scrollCollapse": true,
    	    "paging":         false,
    	     buttons: [
     		   'excel'
    		]
    	} );
    
    
    	$('#displayTable tbody').on('click', 'td.details-control', function () {
    	    var tr = $(this).closest('tr');
    	    var row = table.row( tr );
 	
    	    if ( row.child.isShown() ) {
    	        // This row is already open - close it
    	        row.child.hide();
    	        tr.removeClass('shown');
    	    }
    	    else {
    	        // Open this row
    	        row.child( format(row.data()) ).show();
    	        tr.addClass('shown');
    	    }
    	} );
    }
    else{
    	table.clear();
    	//
    	table.draw();
    	
    	table.rows.add(data);
    	table.draw();
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

  return [d.getFullYear(),
          months[d.getMonth()],
          (dd>9 ? '' : '0') + dd
         ].join(sep || '.');
};


function dateRenderer( data, type, row ) {
	if(data){
        var d=  new Date(data);
        return yyyymmmdd(d);
     }else{
     	return "<Null>";
     }
}
    
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];   

function format(d){
                
	// `d` is the original data object for the row
	return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
		'<tr>' +
			'<td>Description:</td>' +
			'<td>' + d.description + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td>Is there a plan?</td>' +
			'<td>' + d.isPlan + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td>Is it according to plan?</td>' +
			'<td>' + d.accordPlan + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td>Measurement:</td>' +
			'<td>' + d.measurement + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td>Potential Impact:</td>' +
			'<td>' + d.impact + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td>Why is it happening?</td>' +
			'<td>' + d.why + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td>How to fix/ Next steps:</td>' +
			'<td>' + d.fix + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td>Actions:</td>' +
			'<td>' + d.actions + '</td>' +
		'</tr>' +
	'</table>'; 
};
