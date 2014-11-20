var underscore = require('underscore');

var parser = require('./htmlToJson.js');
var parsedList = parser('./data/formResponses1.html');

var girls = underscore.where(parsedList, {'Gender':'Female'});

var sortedListBySkill = underscore.sortBy(parsedList, function(listItem){
	return listItem['Ultimate Skill'];
});



debugger;