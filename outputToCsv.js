exports.writeCsv = function(teams2DArray){
	var fs = require('fs');
	var underscore = require('underscore');
	var totalCsv = '';
	var json2csv = require('json2csv');
	
	var maxRowsPerTeam = findMaxNumPlayers(teams2DArray)+2;
	var numCols = 4;


	var Spreadsheet = require('edit-google-spreadsheet');

	Spreadsheet.load({
	    debug: true,
	    spreadsheetId: '1V_lQ5YNCSLV9pS4PuB-XoXmc9sD4RnMOwaC8gJ_rEig',
	    worksheetId: 'od6',

	    oauth : {
	        email: '645548898529-dpda3l2486rg903aakmq9438ok8q88k2@developer.gserviceaccount.com',
	        keyFile: 'my-key-file.pem'
	    }

	}, function sheetReady(err, spreadsheet) {

	    if (err) {
	        throw err;
	    }
	    var rowIdx = 0;
		var colIdx = 0;
	    teams2DArray.forEach(function(element, index){

	    	rowIdx = calcNewRowIdx(rowIdx, index, maxRowsPerTeam);
	    	colIdx = calcNewColIdx(colIdx, index, numCols);
	    	var teamArray = removeObjectKeys(element);
	    	var rowString = rowIdx.toString();
	    	var colString = colIdx.toString();
	    	var newSheetObject = {};
	    	var newColObj = {};
	    	newColObj[colString] = teamArray;
	    	newSheetObject[rowString] = newColObj; 
			spreadsheet.add(newSheetObject);			
		});

		spreadsheet.send(function(err) {
	    	if(err) throw err;
	    });	



	    //spreadsheet.receive(function(err, rows, info) {
	    //	if(err) throw err;
	    //
	    //    console.dir(rows);
	    //    console.dir(info);
	    //});

	});

	function findMaxNumPlayers(teamsArray){
		var maxPlayers = 0;
		teamsArray.forEach(function(element){
			var numPlayers = element.length;
			if (numPlayers > maxPlayers){
				maxPlayers = numPlayers;
			}
		})
		console.log('max players: ', maxPlayers);
		return maxPlayers;
	}

	function removeObjectKeys(team){
		var outputArray = [];
		team.forEach(function(element, index){
			var innerArray = [];
			innerArray.push(element.firstName);
			innerArray.push(element.lastName);
			innerArray.push(element.skill);
			outputArray.push(innerArray);
		})
		return outputArray;
	}

	function calcNewRowIdx(oldRowIdx, index, maxRowsPerTeam){
		if (index === 0){
			oldRowIdx = 0;
		} else if (index % 4 == 0){
			oldRowIdx += maxRowsPerTeam;
		}
		return oldRowIdx;
	}

	function calcNewColIdx(oldColIdx, index, numCols){
		if (index % 4 === 0 || index === 0){
			oldColIdx = 0;
		} else {
			oldColIdx += numCols;
		}
		return oldColIdx;
	}
};