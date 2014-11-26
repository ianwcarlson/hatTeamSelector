module.exports = function(teamList){
	teamSums = [];
	teamList.forEach(function(element, index, list){
		var sum = 0;
		element.forEach(function(innerElement, innerIndex, innerList){
			sum += innerElement.skill;
		})
		teamSums.push(sum);
	});

	var stats = require('stats-lite');
	teamVariance = stats.variance(teamSums);
	teamStdev = stats.stdev(teamSums);

	return{
		getTeamTotals: function(){
			return teamSums;
		},
		getStdev: function(){
			return teamStdev;
		}
	};
};