/**
 * @module outputToGDoc
 */

/**
 * @typedef {Object} SpreadsheetAuthInfoType
 * @property {String} spreadsheetID - Spreadsheet identification encoded in
 * url: https://docs.google.com/spreadsheet/ccc?key=<spreadsheetID>&usp=sharing
 * @property {String} worksheetID - Worksheet identification
 * @property {String} emailID - Developer account generated account identification
 * @property {String} keyFile - PEM file contained generated authorization key
 * @memberOf Typedefs
 */

/** 
 * @typedef {PlayerProfileType[]} TeamProfileArrayType
 * @memberOf Typedefs
 */

/** 
 * @typedef {Array} GDocFormattedArrayType
 * @property {String} firstName 
 * @property {String} lastName
 * @property {Number} skillLevel
 * @memberOf Typedefs
 */

// go to http://www.nczonline.net/blog/2014/03/04/accessing-google-spreadsheets-from-node-js/
// for more details on opening Google developer account and oauth tokens

/** 
 * Interfaces with Google Spreadsheet API and populates it with
 * player/team information.  Will format the document into four columns
 * @param {TeamProfileArrayType[]} teams2DArray - Two-dimensional array
 * containing all the teams and players
 * @param {SpreadsheetAuthInfoType} spreadsheetAuthInfo - object containing
 * all the document and oauth information
 */
module.exports = function(teams2DArray, spreadsheetAuthInfo){
	var fs = require('fs');
	debugger;
	var underscore = require('underscore');
	var totalCsv = '';
	var json2csv = require('json2csv');
	
	var maxRowsPerTeam = findMaxNumPlayers(teams2DArray)+2;
	var numCols = 4;

	var Spreadsheet = require('edit-google-spreadsheet');

	Spreadsheet.load({
	    debug: true,
	    spreadsheetId: spreadsheetAuthInfo.spreadsheetID,
	    worksheetId: spreadsheetAuthInfo.worksheetID,
	    oauth : {
	        email: spreadsheetAuthInfo.emailID,
	        keyFile: spreadsheetAuthInfo.keyFile
	    }

	}, function sheetReady(err, spreadsheet) {

	    if (err) {
	        throw err;
	    }
	    var rowIdx = 0;
		var colIdx = 1;
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
	});

	/** 
	 * Returns the maximum number of players on any one team.  This is
	 * used to format the spreadsheet so the teams don't overlap each
	 * other
	 * @param {TeamProfileArrayType} teamsArray - Array containing the
	 * player profiles
	 * @returns {Number} maxPlayers 
	 * @private
	 */
	function findMaxNumPlayers(teamsArray){
		var maxPlayers = 0;
		teamsArray.forEach(function(element){
			var numPlayers = element.length;
			if (numPlayers > maxPlayers){
				maxPlayers = numPlayers;
			}
		});
		console.log('max players: ', maxPlayers);
		return maxPlayers;
	}

	/** 
	 * Returns a new data structure that doesn't contain any of the 
	 * object keys.  This is formatting to the spreadsheet format since
	 * cells are indexed like arrays
	 * @param {TeamProfileArrayType} teamsArray - Array containing the
	 * player profiles
	 * @returns {GDocFormattedArrayType}
	 * @private
	 */
	function removeObjectKeys(teamArray){
		var outputArray = [];
		teamArray.forEach(function(element, index){
			var innerArray = [];
			innerArray.push(element.firstName);
			innerArray.push(element.lastName);
			innerArray.push(element.skill);
			outputArray.push(innerArray);
		});
		return outputArray;
	}

	/** 
	 * Calculates new row index.  Will auto-wrap.
	 * @param {Number} oldRowIdx - Old row index
	 * @param {Number} index - Index of team 
	 * @param {Number} maxRowsPerTeam - Maximum Rows Per Team
	 * @returns {Number}
	 * @private
	 */
	function calcNewRowIdx(oldRowIdx, index, maxRowsPerTeam){
		if (index === 0){
			oldRowIdx = 0;
		} else if (index % 4 === 0){
			oldRowIdx += maxRowsPerTeam;
		}
		return oldRowIdx;
	}

	/** 
	 * Calculates new column index.  Will auto-wrap.
	 * @param {Number} oldRowIdx - Old row index
	 * @param {Number} index - Index of Team
	 * @param {Number} maxRowsPerTeam - Maximum Rows Per Team
	 * @returns {Number}
	 * @private
	 */
	function calcNewColIdx(oldColIdx, index, numCols){
		if (index % 4 === 0 || index === 0){
			oldColIdx = 1;
		} else {
			oldColIdx += numCols;
		}
		return oldColIdx;
	}
};