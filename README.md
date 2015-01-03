# hatTeamSelector

In ultimate frisbee there's a kind of tournament called a hat tournament.  Everyone signs up ahead of time and registers all their personal information including ranking their playing ability and who they want to play with.  Every player is usually allowed to name another 'baggage' player, such as a significant other or close friend, which allows them to be mandatorily assigned on the same team.  

No matter how good the algorithm is in picking teams it will always have two main weaknesses.  First, people have to rank their skill level on a numbered scale (usually 1-5) based on the honer system.  It's common to have good players underrank themselves (sandbagging) and some high-minded unskilled players overrank themselves.  Second, the baggage players throw a monkey wrench into team sorting because it will automatically bias a team for good or worse.  If there are two many baggage players the algorithm may not converge on a good solution.  Also, it's difficult to match people up if they misspell the other person's name.  

I think it's possible to design a system to address the problems with bad inputs or sandbagging.  Possible improvements include storing player information in a database and creating a front-end to filter user's inputs more effectively.  However, Any improvement would probably require much more effort than implementing human administrative controls.  

Currently this Node application parses an HTML table, exported from a Google spreadsheet, and picks randomize teams with equal skill level.  The HTML files are provided, but since the schema is very use-case specific querying from a database would be more ideal.  Currently, the results are outputted to a Google spreadsheet and Plotly chart for analytics.  

The main.js file should be customized for your use case.  The spreadsheet output needs to comply with the Google developer process like generating your own authentication token.  This [site](http://www.nczonline.net/blog/2014/03/04/accessing-google-spreadsheets-from-node-js/) is super useful.  To use Plotly, you will have to sign up and get a user ID and key.  In addition, you can set how many times the algorithm will iterate to converge on the best solution.  

Still need to refine error handling because there are a few asynchronous calls that could fail, but most of the compute intensive stuff is synchronous.

# Installation
- Install [Node](http://nodejs.org/)
- Install [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Git clone this repo `git clone https://github.com/ianwcarlson/hatTeamSelector` in your development directory
- Navigate to new project file and Install NPM packages
```
npm install
npm install -g gulp jsdoc jasmine-node
```

# Documentation
`gulp docs`

# Test
`jasmine-node test/` from root directory



