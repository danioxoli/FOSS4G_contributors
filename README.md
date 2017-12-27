# FOSS4G contributors

#### This work has been derived from: https://github.com/mgechev/github-contributors-list

## HowTo
#### Prerequisites
 - Nodejs installed

#### How to run
-  Download the Repository
-  run 'npm install'
-  edit _bin/githubcontrib.js_ and insert your AUTH token (you can change the other preferences)
-  edit _bin/getLocation.js_ and insert your AUTH token (you can change the other preferences)
-  run node _bin/githubcontrib.js_ to generate the output file with the list of user per repository
-  run node _bin/getlocation.js_ to generate the output file with nationalities

#### Files & Locations
-  _input/repo_list.csv_: CSV with repositories, you can manually modify this list to add or remove repositories to be inquired
-  _output/repositories.json_: JSON with repos and list of contributors
-  _output/resultNationality.json_: JSON with the repos, contirbutors and their nationality

## Post-processing with Python
#### Prerequisites
 - Python with Geopy library installed

#### How to run
-  edit _post_analysis/contibutors_map.py_ by specifying input (use: _output/resultNationality.json_) and output (e.g. _.../output/contibutors_xy.csv_) full folder paths and the geocoding API (default: OSM NOMINATIM)
-  run _post_analysis/contibutors_map.py_ in a Python console
-  open the output (.csv) in a GIS software to visualize the results and perform further analyses


#### Files & Locations
-  _output/resultNationality.json_: JSON with the repos, contirbutors and their nationality i.e. the output of bin/getlocation.js, which represents the input dataset for post-processing
-  _output/contibutors_xy.csv_: .csv file of geo points depicting the position of single users

***note a***: geocoding procedure might require time </br>
***note b***: you will be able to save in the uotput only users having true "location" information in their GitHub profiles. No-geocoded users are excluded from the post-processing output</br>
***note c***: a user which is contributor of two or more repo will appear only once in the output</br>

## GitHub Limit

The Github API has a 60-requests-per-hour rate-limit for non-authenticated use. If you need some more then a scope-limited Github OAuth token can be used to boost the limit to 5000.

## License

MIT
