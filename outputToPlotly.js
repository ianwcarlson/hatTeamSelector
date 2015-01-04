/**
 * @module outputToPlotly
 */

/** 
 * @namespace Typedefs
 */

/**
 * @typedef {Object} GenderObjectType
 * @property {Number} boys - Number of something related to boys
 * @property {Number} girls - Number of something related to girls
 * @memberOf Typedefs
 */

/**
 * @typedef {Object} TeamObjectType
 * @property {String} size - Indicates the number of teams in object.
 * @property {GenderObjectType[]} genderTotals - Array of gender totals
 * @property {GenderObjectType[]} skillByGenderTotals - Array of skill totals for each gender
 * @memberOf Typedefs
 */

/**
 * Export team metrics to Plotly web service
 * @param	{String}	username  - created by opening Plotly account
 * @param	{String}	key - generated when opening Plotly account
 * @param	{TeamObjectType[]}	teamMetricsArray object that contains size, 
 * gender totals, and skill by gender totals 
 * @param	{Function}	called when error occurs or operation complete.  
 * First parameter is error that is propagated from Plotly API, or null if
 * not error occurred.
 */
module.exports = function(username, key, teamMetricsArray, callback){
	var plotly = require('plotly')(username, key);

	plotSums('Gender Totals', teamMetricsArray.genderTotals, 'Player Sums');
	plotSums('Skill By Gender Totals', teamMetricsArray.skillByGenderTotals, 'Skill Sums');

	/**
	 * Main plotting function that adapts data to Plotly format and applies common 
	 * layout settings
	 * @param	{String} filename - name of chart and what it will be saved as
	 * @param	{TeamObjectType} totals - object that contains gender data
	 * @param	{String} yAxisTitle - unique title for Y-axis
	 * @private
	 */ 
	function plotSums(filename, totals, yAxisTitle){

		var teamNames = [];
		for (var i=0; i<teamMetricsArray.size; i++){
			teamNames.push(i+1);		
		}

		var boyTotals = [];
		for (i=0; i<teamMetricsArray.size; i++){
			boyTotals.push(totals[i].boys);
		}

		var girlTotals = [];
		for (i=0; i<teamMetricsArray.size; i++){
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
			if (err){
				callback(err);
			} else {
				callback(null);
			}
		});
	}
};