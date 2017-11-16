"use strict";

var q = require('q'),
    https = require('https'),
    merge = require('merge');
var sleep = require('system-sleep');
var fs = require('fs');

//Input JSON to be read (generated from githubcontrib)
var repos = require('../output/repositories.json')

//Output JSON with nationalities
var outputFile="output/resultNationality.json"

//Your AUTH token -> https://github.com/settings/tokens
var authToken = 'AUTH TOKEN'

//Sleep time between requests
var sleepTime=1000

var newRepos = {};

for (var key in repos) {
    var repo = repos[key];
    repo.forEach(function (name) {
        getLocation(key, name);
        sleep(sleepTime);
    });
}

fs.writeFile(outputFile, JSON.stringify(newRepos), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

function getLocation(repo, name) {
    var jsonResponse = '', result = [], deferred = q.defer();
    var concatData = function (chunk) {
        jsonResponse += chunk;
    };
    var reject = function (e) {
        console.log(e);
        deferred.reject(e);
    };
    var headers = { 'Authorization' : 'token '+authToken };
    var requestOptions = {
        port: 443,
        method: 'GET',
        host: 'api.github.com',
        headers: merge({
            'Content-Type': 'application/json',
            'User-Agent': 'contributors-list'
        }, headers)
    };

    loadUser(repo, name);


    function loadUser(repo, name) {
        jsonResponse = '';
       requestOptions.path = '/users/' + name;

        https.request(requestOptions, function (response) {
            response.on('error', reject);
            response.on('data', concatData);
            response.on('end', function () {
                result = result.concat(JSON.parse(jsonResponse));
                if (!newRepos[repo]) {
                    newRepos[repo] = {};
                }
                newRepos[repo][name] = {name: name, nationality: result[0].location}

            });
        }).end();
    }


}

