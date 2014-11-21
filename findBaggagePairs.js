module.exports = function(inputPlayerList){
	var underscore = require('underscore');

	var baggageList = underscore.reject(inputPlayerList, function(listItem){
		if (listItem.baggage === ''){
			return true;
		} else {
			return false;
		}
	});

	var baggagePairs = [];
	while(baggageList.length > 0){
		var lowerBagPersonList = baggageList[0].baggage.split(" ");
		var firstName = lowerBagPersonList[0];
		var lastName = lowerBagPersonList[1];
		debugger;
		var foundList = underscore.filter(baggageList, function(item){
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
		});

		if (foundList.length === 1){
			// now check to see if baggage pair has already been found
			debugger;
			var foundIdx = underscore.indexOf(baggageList, foundList[0]);
			baggagePairs.push([baggageList[0], foundList[0]]);
			baggageList.splice(foundIdx, 1);
			baggageList.splice(0, 1);

			
			
		} else {
			debugger;
			console.log('Didnt find ', lastName, ' in baggage list');
			baggageList.splice(0, 1);
		}
	}
	return baggageList;
}