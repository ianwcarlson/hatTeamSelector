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

	var teamSkillSums = [];
	var teamSkillGenderSums = [];
	var teamTotalNum = [];
	var teamGirlSums = [];
	var teamBoySums = [];
	teamsArray.forEach(function(element, index, list){
		var sum = 0;
		var numGirls = 0;
		var numBoys = 0;
		var sumSkillBoys = 0;
		var sumSkillGirls = 0;
		element.forEach(function(innerElement, innerIndex, innerList){
			sum += innerElement.skill + innerElement.speed;
			if (innerElement.gender === 'female'){
				numGirls += 1;
				sumSkillGirls += innerElement.skill + innerElement.speed;
			} else {
				numBoys += 1;
				sumSkillBoys += innerElement.skill + innerElement.speed;
			}
		});
		teamTotalNum.push({girls: numGirls, boys: numBoys});
		teamSkillSums.push(sum);
		teamBoySums.push(numBoys);
		teamGirlSums.push(numGirls);
		teamSkillGenderSums.push({girls: sumSkillGirls, boys: sumSkillBoys});
	});

	var stats = require('stats-lite');
	var teamSkillSpeedStdev = stats.stdev(teamSkillSums);
	var teamTotalStdev = stats.stdev(teamTotalNum);
	var teamBoyStdev = stats.stdev(teamBoySums);
	var teamGirlStdev = stats.stdev(teamGirlSums);

	return{
		getTeamNumStdev: function(){
			return {
				total: teamTotalStdev,
				boys: teamBoyStdev,
				girls: teamGirlStdev
			};
		},
		/**
		 * Get the sums of all skill levels for each player on a team
		 * @returns {Number[]} 
		 * @public
		 */
		getTeamTotals: function(){
			return teamSkillSums;
		},
		/**
		 * Get the standard deviation of team skill levels
		 * @returns {Number[]} 
		 * @public
		 */
		getStdev: function(){
			return teamSkillSpeedStdev;
		}, 
		/**
		 * Get the sums of boys and girls for each team
		 * @returns {Number[]} 
		 * @public
		 */
		getGenderTotals: function(){
			return teamTotalNum;
		},
		/**
		 * Get the sums of all skill levels for boys and girls for each team
		 * @returns {Number[]} 
		 * @public
		 */
		getSkillByGenderTotals: function(){
			return teamSkillGenderSums;
		}
	};
};