module.exports = function(inputPlayerList){
	var underscore = require('underscore');

	var baggageList = underscore.reject(inputPlayerList, function(listItem){
		if (listItem.baggage === ''){
			return true;
		} else {
			return false;
		}
	});

	underscore.each(baggageList, function(element, index, list){
		element.baggage = element.baggage.toLowerCase();
		element.firstName = element.firstName.toLowerCase();
		element.lastName = element.lastName.toLowerCase();	
	})

	var baggagePairs = [];
	//for (var i=0; i<baggageList.length; i++){
	underscore.each(baggageList, function(element, index, list){
		//var lowerBagPerson = element.baggage.toLowerCase();
		var lowerBagPersonList = element.baggage.split(" ");
		var firstName = lowerBagPersonList[0];
		var lastName = lowerBagPersonList[1];
		var foundList = underscore.where(baggageList, {lastName: lastName});

		if (foundList.length === 1){
			// now check to see if baggage pair has already been found
			var foundIdx = underscore.indexOf(baggageList, foundList[0]);
			baggageList.splice(foundIdx, 1);
			baggageList.splice(index, 1);

			baggagePairs.push([element, foundList[0]])
			
		} else {
			console.log('Didnt find ', lastName, ' in baggage list');
		}	
	})
		
	//}

	debugger;

	return baggageList;
}