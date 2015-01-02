module.exports = function(teamList){
	teamSkillSums = [];
	teamGenderSums = [];
	teamList.forEach(function(element, index, list){
		var sum = 0;
		var numGirls = 0;
		var numBoys = 0;
		element.forEach(function(innerElement, innerIndex, innerList){
			sum += innerElement.skill;
			if (innerElement.gender === 'female'){
				numGirls += 1;
			} else {
				numBoys += 1;
			}
		})
		teamSkillSums.push(sum);
		teamGenderSums.push({girls: numGirls, boys: numBoys});
	});

	var stats = require('stats-lite');
	teamVariance = stats.variance(teamSkillSums);
	teamStdev = stats.stdev(teamSkillSums);

	return{
		getTeamTotals: function(){
			return teamSkillSums;
		},
		getStdev: function(){
			return teamStdev;
		}, 
		getGenderTotals: function(){
			return teamGenderSums;
		}
	};
};