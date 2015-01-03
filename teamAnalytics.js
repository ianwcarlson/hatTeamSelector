/**
 * @module teamAnalytics
 */

/**
 * Calculates useful metrics that can be accessed in different ways
 * @param {TeamProfileArrayType[]} teamsArray - Array of teams and array of players
 */ 
module.exports = function(teamsArray){
	// temp
	var fs = require('fs');
	fs.writeFileSync('test/data/inputTeamAnalytics.json', JSON.stringify(teamsArray));

	teamSkillSums = [];
	teamGenderSums = [];
	teamSkillGenderSums = [];
	teamsArray.forEach(function(element, index, list){
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
		});
		teamSkillSums.push(sum);
		teamGenderSums.push({girls: numGirls, boys: numBoys});
		teamSkillGenderSums.push({girls: sumSkillGirls, boys: sumSkillBoys});
	});

	var stats = require('stats-lite');
	teamVariance = stats.variance(teamSkillSums);
	teamStdev = stats.stdev(teamSkillSums);

	return{
		/**
		 * Get the sums of all skill levels for each player on a team
		 * @returns {Number[]} 
		 */
		getTeamTotals: function(){
			return teamSkillSums;
		},
		/**
		 * Get the standard deviation of team skill levels
		 * @returns {Number[]} 
		 */
		getStdev: function(){
			return teamStdev;
		}, 
		/**
		 * Get the sums of boys and girls for each team
		 * @returns {Number[]} 
		 */
		getGenderTotals: function(){
			return teamGenderSums;
		},
		/**
		 * Get the sums of all skill levels for boys and girls for each team
		 * @returns {Number[]} 
		 */
		getSkillByGenderTotals: function(){
			return teamSkillGenderSums;
		}
	};
};