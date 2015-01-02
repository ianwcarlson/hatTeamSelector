module.exports = function(username, key, teamAnalytics){
	var plotly = require('plotly')(username, key);

	var teamNames = [];
	for (var i=0; i<teamAnalytics.size; i++){
		teamNames.push('Team ' + i);		
	}

	var boyTotals = [];
	for (var i=0; i<teamAnalytics.size; i++){
		boyTotals.push(teamAnalytics.genderTotals[i].boys);
	}

	var girlTotals = [];
	for (var i=0; i<teamAnalytics.size; i++){
		girlTotals.push(teamAnalytics.genderTotals[i].girls);
	}

	var trace1 = {
		x: teamNames,
		y: boyTotals,
		name: 'Boys',
		type: 'bar'
	};

	var trace2 = {
		x: teamNames,
		y: girlTotals,
		name: 'Girls',
		type: 'bar'
	};

	debugger;

	var data = [trace1, trace2];

	var layout = {barmode: 'stack'};

	var graph_options = {layout: layout, filename: 'stacked-bar', fileopt: 'overwrite'};

	plotly.plot(data, graph_options, function(err, msg){
		console.log(msg);
	});

}