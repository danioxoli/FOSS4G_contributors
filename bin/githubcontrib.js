#!/usr/bin/env node

var LAYOUT_TABLE = 'lib/strategies/layout_strategies/table.js';
var LAYOUT_JSON = 'lib/strategies/layout_strategies/json.js';
var FILTER_STRATEGY = 'lib/strategies/filter_strategies/login.js';
var SORT_STRATEGY = 'lib/strategies/sort_strategies/sort_%s.js';


var layoutStrategy=require('../lib/strategies/layout_strategies/json.js');
var filterStrategy=require('../lib/strategies/filter_strategies/login.js');
var sortStrategy=require('../lib/strategies/sort_strategies/sort_asc.js');


var contributors = require('../lib/contributors');
var sprintf = require('sprintf-js').sprintf;
var path = require('path');
var fs = require('fs');

var lib = path.dirname(path.dirname(fs.realpathSync(__filename)));
var csv = require("fast-csv");


var logResults = function (obj) {
    var repoAndName = owners[currentRepo] + '/' + repos[currentRepo];
    reposWithContrib[repoAndName] = [];

    obj.contributors[0].forEach(function (current) {
        reposWithContrib[repoAndName].push(current.login);
    });
    currentRepo++;
    getRepo(currentRepo);
};
var logErrors = function (obj) {
    console.error(obj);
    currentRepo++;
    getRepo(currentRepo);
};




/**
 * Main
 */

var args = {};
var reposWithContrib = {};

//Your AUTH token -> https://github.com/settings/tokens
args.authToken = 'Your GitHub Personal Access Token';

//Input CSV to read
args.inputFile="input/repo_list.csv"

//Output file to save
args.outputFile= 'output/repositories.json'

//List of owners that will be filled
var owners=[]

//List of repos that will be filled
var repos = []

//CSV to read
var stream = fs.createReadStream(args.inputFile);

//Skip first line of csv
var firstLine=true;

//Repo index to loop
var currentRepo = 0;
/**
 * Read from CSV
 */


//Reading the csv and starting the queries
var csvStream = csv()
  .on("data", function(data){
   if(firstLine)
       firstLine=false
    else{
       owners.push(data[2])
        repos.push(data[3])
   }
  })
  .on("end", function(){
    getRepo(currentRepo);
  });

stream.pipe(csvStream);


/**
 * Side Functionalities
 */

function getRepo(currentRepo) {
console.log(currentRepo);
    if (currentRepo == repos.length-1) {
        fs.writeFile(args.outputFile, JSON.stringify(reposWithContrib), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
        return;
    }

    args.owner = owners[currentRepo];
    args.repository = repos[currentRepo];

    try {
        contributors(validateArgs())
            .loadAll(args.owner, args.repository, args.authToken)
            .then(logResults, logErrors);
    } catch (e) {
        logErrors(e.message);
    }
}



/**
 * INTERNAL OPTIONS
 */

function validateArgs() {
    var ERROR_ARGS = "both arguments '--repo' and '--owner' are required! ";
    var nonEmptyFn = function (u) {
        return u.length > 0;
    };
    var trimFn = function (u) {
        return u.trim();
    };

    args.owner = args.owner || args.user;
    args.repository = args.repository || args.repo;
    if (!args.repository || !args.owner) throw new Error(ERROR_ARGS);

    args.sortBy = args.sortBy || 'contributions';
    args.sortOrder = (args.sortOrder == 'desc') ? 'desc' : 'asc';
    args.filter = '';
    args.layoutStrategy=layoutStrategy;
    args.filterStrategy=filterStrategy;
    args.sortStrategy=sortStrategy;


    return args
}

/**
 * Use specified strategy path or calculate the fullpath
 * then load the strategy using `require()`
 */
