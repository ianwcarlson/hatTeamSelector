/**
 * @module findBaggagePairs
 */

/**
 * @typedef {Object} PlayerProfileType
 * @property {String} baggage - Name of person this player must play with
 * @property {String} bothDays - Either 'yes' or 'no' as to whether player is playing Sat. and/or Sun 
 * @property {String} firstName - First name of player
 * @property {String} lastName - Last name of player
 * @property {String} gender - Gender of player ('male' or 'female')
 * @property {Number} skill - Skill level from 1 to 5
 * @property {Number} speed - Speed level from 1 to 5
 * @property {String} state - Player's state of residence
 * @memberOf Typedefs
 */

/** 
 * @typedef {PlayerProfileType[]} BaggagePairArrayType
 * @memberOf Typedefs
 */

/**
 * Finds all the baggage players and returns a new structure with
 * baggage players paired together.  Handles case sensitivity issues and
 * shortened names, but doesn't handle misspelled names
 * @param {PlayerProfileType} inputPlayerArray - Array of player profiles
 * @returns {BaggagePairArrayType[]}
 */
module.exports = function(inputPlayerArray){
	var underscore = require('underscore');

	// filter out players that haven't specified baggage player
	var baggageList = underscore.reject(inputPlayerArray, function(listItem){
		return (listItem.baggage === '') ? true : false;
	});

	// process the entire array and construct new array 
	var baggagePairs = [];
	while(baggageList.length > 0){
		var lowerBagPersonList = baggageList[0].baggage.split(" ");
		var firstName = lowerBagPersonList[0];
		var lastName = lowerBagPersonList[1];
		var foundList = underscore.filter(baggageList, findMatch);

		// now check to see if baggage pair has already been found
		if (foundList.length === 1){			
			var foundIdx = underscore.indexOf(baggageList, foundList[0]);
			baggagePairs.push([baggageList[0], foundList[0]]);
			baggageList.splice(foundIdx, 1);
		} 

		baggageList.splice(0, 1);
	}

	/** 
	 * Find matching baggage player, if one exists. 
	 * @param {PlayerProfileType} item - Individual player profile
	 * @private
	 */
	function findMatch(item){
		var found = false;
		// last names should always match (they're never shortened or abbreviated)
		if (item.lastName === lastName){
			// if one is shorter than the other, use the shorter one as reference
			if (item.firstName.length < firstName.length){
				if (firstName.search(item.firstName) !== -1){
					found = true;
				}
			} else {
				if (item.firstName.search(firstName) !== -1){
					found = true;
				}
			}
		}
		return found;	
	}

	return baggagePairs;
};