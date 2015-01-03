# hatTeamSelector



Application that parses an HTML table, exported from a Google spreadsheet, and picks randomize teams with equal skill level.  The HTML files are provided, but since the schema is very use-case specific querying from a database would be more ideal.  Currently, the results are outputted to a Google spreadsheet and Plotly chart for analytics.  

The main.js file should be customized for your use case.  The spreadsheet output needs to comply with the Google developer process like generating your own authentication token.  This [site](http://www.nczonline.net/blog/2014/03/04/accessing-google-spreadsheets-from-node-js/) is super useful.  To use Plotly, you will have to sign up and get a user ID and key.  In addition, you can set how many times the algorithm will iterate to converge on the best solution.  

Still need to refine error handling because there are a few asynchronous calls that could fail, but most of the compute intensive stuff is synchronous.

# Installation
- Install [Node](http://nodejs.org/)
- Install [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Git clone this repo `git clone https://github.com/ianwcarlson/hatTeamSelector` in your development directory
- Navigate to new project file and Install NPM packages
```
npm install
npm install -g gulp jsdoc
```

# Documentation
`gulp docs`



