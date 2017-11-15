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

var args = {};

var reposWithContrib = {};

args.authToken = 'yourauthToken ';

var owners = ['OSGeo', 'geomoose', 'GeoNode', 'OSGeo', 'geotalleres', 'GRASS-GIS', 'iTowns', 'libLAS', 'mapbender', 'mapproxy', 'mapquery', 'mapserver', 'OpenDroneMap', 'openlayers', 'maphew', 'geopython', 'parallella', 'pgRouting', 'postgis', 'OSGeo', 'geopython', 'geopython', 'qgis', 'gltn', 'AnalyticalGraphicsInc', 'NASAWorldWind', 'GeoWebCache', 'proj4php', 'istSOS',  'opengeospatial', 'geopaparazzi', 'locationtech', 'Leaflet', 'deegree', '52North', '52North', 'geomajas', 'mapfish', 'georchestra', 'CartoDB'];
var repos = ['gdal', 'gm3', 'geonode', 'geos', 'geotalleres', 'grass-ci', 'itowns', 'libLAS', 'mapbender', 'mapproxy', 'mapquery', 'mapserver', 'OpenDroneMap', 'openlayers', 'apt', 'OWSLib', 'pal', 'pgrouting', 'postgis', 'proj.4', 'pycsw', 'pywps', 'QGIS', 'stdm', 'cesium', 'WebWorldWind', 'geowebcache', 'proj4php', 'java-core', 'teamengine', 'geopaparazzi', 'udig-platform', 'Leaflet', 'deegree3', 'sos', 'WPS', 'geomajas-project-server', 'mapfish', 'georchestra', 'cartodb'];

var currentRepo = 0;

function getRepo(currentRepo) {
console.log(currentRepo);
    if (currentRepo == repos.length-1) {
        fs.writeFile("result.json", JSON.stringify(reposWithContrib), function(err) {
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

getRepo(currentRepo);

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