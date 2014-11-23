exports.writeCsv = function(teams2DArray){
	var fs = require('fs');
	var underscore = require('underscore');
	var totalCsv = '';
	var json2csv = require('json2csv');

	var Spreadsheet = require('edit-google-spreadsheet');

	Spreadsheet.load({
		debug: true,
		spreadsheetName: 'node-edit-spreadsheet',
		worksheetName: 'Sheet1',
		// Choose from 1 of the 3 authentication methods:
		//    1. Username and Password
		username: 'ianwcarlson@google.email.com',
		password: 'bt3c4x12',
	}, function sheetReady(err, spreadsheet) {
    	if(err) throw err;

    	spreadsheet.add({ 
    		3: { 
    			5: "hello!" 
    		} 
    	});

    	spreadsheet.send(function(err){
	     	if(err) throw err;
	     	console.log("Updated Cell at row 3, column 5 to 'hello!'");
    	});
 	})

	//var numTeams = teams2DArray.length;
	//var numRows = numTeams/4
	//newRows = Math.ceil(numRows);
	//tableHeader = 'First Name, Last Name, Skill,,,';
	//for (var i=0; i<2; i++){
	//	totalCsv += 'team' + 4*i+1 + ',,,,' + 'team' + 4*i+2 +
	//		',,,,' + 'team' + 4*i+3 + ',,,,' + 'team' + 4*i+4 + '\r\n';
	//	totalCsv += tableHeader + tableHeader + tableHeader + tableHeader + '\r\n';
	//	//for (var k= 0; k<teams2DArray){
	//	for (var j=0; j<4; j++){
	//		debugger;
	//		totalCsv += teams2DArray[j].firstName + ',' + teams2DArray[j].firstName + ',' +
	//			teams2DArray[j].skill + ',';
	//	}
	//	totalCsv += '\r\n';
//
//	}
	//underscore.each(teams2DArray, function(element, index, list){
		//json2csv({data: element, fields: ['firstName', 'lastName', 'skill']}, function(err, csv) {
		//	if (err) console.log(err);
		// 	totalCsv += csv + '\r\n\r\n';
		//	//fs.writeFile('file' + index + '.csv', csv, function(err) {
		// 	//  if (err) throw err;
		// 	//  console.log('file saved');
		//	//});
		//});	
	//})

	//fs.writeFile('Teams.csv', totalCsv, function(err) {
	//	if (err) throw err;
	//	console.log('file saved');
	//});
};