exports.writeCsv = function(teams2DArray){
	var totalCsv = '';
	var json2csv = require('json2csv');
	underscore.each(team2DList, function(element, index, list){
		json2csv({data: element, fields: ['firstName', 'lastName', 'skill']}, function(err, csv) {
			if (err) console.log(err);
		 	totalCsv += csv + '\r\n\r\n';
			//fs.writeFile('file' + index + '.csv', csv, function(err) {
		 	//  if (err) throw err;
		 	//  console.log('file saved');
			//});
		});	
	})

	fs.writeFile('Teams.csv', totalCsv, function(err) {
		if (err) throw err;
		console.log('file saved');
	});

	return{

	};
}