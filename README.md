# FOSS4G contributors

#### This work has been derived from: https://github.com/mgechev/github-contributors-list

## HowTo
#### Prerequisites
 - Nodejs installed

#### How to run
-  Download the Repository
-  run 'npm install'
-  edit bin/githubcontrib.js and insert your AUTH token (you can change the other preferences)
-  edit bin/getLocation.js and insert your AUTH token (you can change the other preferences)
-  run node bin/githubcontrib.js to generate the output file with the list of user per repository
-  run node bin/getlocation.js to generate the output file with nationalities

#### Files & Locations
-  input/repo_list.csv: CSV with repositories (you can manually modify this list to add or remove repo to be inquired)
-  output/repositories.json: JSON with repos and list of contributors
-  output/resultNationality.json: JSON with the repos, contirbutors and their nationality

## Post-processing with Python
#### Prerequisites
 - Python with Geopy library installed

#### How to run
-  edit _post_analysis/contibutors_map.py_ by specifying input (.json) and output (.csv) file names with path
-  run _post_analysis/contibutors_map.py_ in a Python console
-  open the output (.csv) in a GIS software to visualize the results and perform further analyses


#### Files & Locations
-  input/resultNationality.json: JSON with the repos, contirbutors and their nationality i.e. the output of bin/getlocation.js
-  output/contibutors_xy.csv: .csv file of geo points depicting the position of single users

***note a***: geocoding procedure might require time </br>
***note b***: you will be able to save in the uotput only users having true "location" information in their GitHub profiles</br>
***note c***: a user which is contributor of two or more repo will appear only once in the output</br>

## GitHub Limit

The Github API has a 60-requests-per-hour rate-limit for non-authenticated use. If you need some more then a scope-limited Github OAuth token can be used to boost the limit to 5000.

## License

MIT
