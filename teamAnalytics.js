module.exports = function(teamList){
	teamSkillSums = [];
	teamGenderSums = [];
	teamSkillGenderSums = [];
	teamList.forEach(function(element, index, list){
		var sum = 0;
		var numGirls = 0;
		var numBoys = 0;
		var sumSkillBoys = 0;
		var sumSkillGirls = 0;
		element.forEach(function(innerElement, innerIndex, innerList){
			sum += innerElement.skill;
			if (innerElement.gender === 'female'){
				numGirls += 1;
				sumSkillGirls += innerElement.skill;
			} else {
				numBoys += 1;
				sumSkillBoys += innerElement.skill;
			}
		})
		teamSkillSums.push(sum);
		teamGenderSums.push({girls: numGirls, boys: numBoys});
		teamSkillGenderSums.push({girls: sumSkillGirls, boys: sumSkillBoys});
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
		},
		getSkillByGenderTotals: function(){
			return teamSkillGenderSums;
		}
	};
};