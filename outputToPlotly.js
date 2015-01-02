module.exports = function(username, key, teamAnalytics){
	var plotly = require('plotly')(username, key);

	plotSums('Gender Totals', teamAnalytics.genderTotals, 'Player Sums');
	plotSums('Skill By Gender Totals', teamAnalytics.skillByGenderTotals, 'Skill Sums');

	function plotSums(filename, totals, yAxisTitle){

		var teamNames = [];
		for (var i=0; i<teamAnalytics.size; i++){
			teamNames.push(i+1);		
		}

		var boyTotals = [];
		for (var i=0; i<teamAnalytics.size; i++){
			boyTotals.push(totals[i].boys);
		}

		var girlTotals = [];
		for (var i=0; i<teamAnalytics.size; i++){
			girlTotals.push(totals[i].girls);
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

		var data = [trace1, trace2];
		var layout = {
			xaxis: {
				title: 'Teams'
			},
			yaxis: {
				title: yAxisTitle
			},
			title: filename, 
			barmode: 'stack'
		};

		var graph_options = {layout: layout, filename: filename, fileopt: 'overwrite'};

		plotly.plot(data, graph_options, function(err, msg){
			console.log(msg);
		});
	}



}