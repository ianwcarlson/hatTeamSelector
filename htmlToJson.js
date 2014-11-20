//module.exports = function(){
	var htmlparser = require("htmlparser");
	var fs = require('fs');
	var rawHtml = fs.readFileSync('./data/formResponses1.html');



	var handler = new htmlparser.DefaultHandler(function (error, dom) {
	    if (error){

	    } else {

	    }
	});
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

	var tableArray = handler.dom[4].children[0].children[1].children;
	for (rowIdx = 2; rowIdx<tableArray.length; rowIdx++){
		var rowArray = tableArray[rowIdx].children;
		var newRowObject = {};
		for (cellIdx=1; cellIdx<rowArray.length; cellIdx++){
			if (typeof rowArray[cellIdx].children !== 'undefined'){
				prefix = rowArray[cellIdx].children[0];
				if (prefix.type === "tag"){
					prefix = rowArray[cellIdx].children[0].children[0];
				}
				newRowObject[inputRow[cellIdx-1]] = prefix.data;
				//console.log('cell contents: ', prefix.data);
			} else {
				newRowObject[inputRow[cellIdx-1]] = '';
			}
		}
		inputArray.push(newRowObject);
		
	}
	debugger;		
	//sys.puts(sys.inspect(handler.dom, false, null));
//}