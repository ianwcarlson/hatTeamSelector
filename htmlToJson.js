/**
 * @module htmlToJson
 */

/**
 * Reads in an html file that was exported from google spreadsheet. 
 * Parses the file and returns a two-dimensional array structure that
 * contains all the player profiles
 * The assumed schema is very specific and eventually would like to
 * replace with database and front end.  
 * @param {String} inputHtmlFilePath - File path of exported HTML file
 * @returns {PlayerProfileType[]}
 */
module.exports = function(inputHtmlFilePath){
	var htmlparser = require("htmlparser");
	var fs = require('fs');

	var rawHtml = fs.readFileSync(inputHtmlFilePath);

	var handler = new htmlparser.DefaultHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rawHtml);

	var inputArray = [];
	var inputRow = [];
	var headerRowArray = handler.dom[4].children[0].children[1].children[0].children;

	for (i=1; i<headerRowArray.length; i++){
		var prefix = headerRowArray[i].children[0];	
		if (prefix.type === "tag"){
			prefix = headerRowArray[i].children[0].children[0];
		} 
		inputRow.push(prefix.data);
	}

	// walk the dom structure and parse each row
	var tableArray = handler.dom[4].children[0].children[1].children;
	for (rowIdx = 2; rowIdx<tableArray.length; rowIdx++){
		var rowArray = tableArray[rowIdx].children;
		var newRowObject = {};
		for (cellIdx=1; cellIdx<rowArray.length; cellIdx++){
			if (typeof rowArray[cellIdx].children !== 'undefined'){
				var newPrefix = rowArray[cellIdx].children[0];
				if (newPrefix.type === "tag"){
					newPrefix = rowArray[cellIdx].children[0].children[0];
				}
				newRowObject[inputRow[cellIdx-1]] = newPrefix.data;
			} else {
				newRowObject[inputRow[cellIdx-1]] = '';
			}
		}
		inputArray.push(newRowObject);	
	}
	return inputArray;
};