# FOSS4G contributors

#### This work has been derived from: https://github.com/mgechev/github-contributors-list

## HowTo
#### Prerequisites
 - Nodejs installed (see: https://nodejs.org/en/download/package-manager)

#### How to run
-  Download the Repository
-  Open a terminal and browse to the downloaded Repository folder 
-  run ***_npm install_***
-  edit _bin/githubcontrib.js_ and insert [your GitHub Personal Access Token] at line 50 (you can change the other preferences)
-  edit _bin/getLocation.js_ and insert [your GitHub Personal Access Token] at line 16 (you can change the other preferences)
-  run ***_node bin/githubcontrib.js_*** to generate the output file with the list of contributors per repository
-  run ***_node bin/getlocation.js_*** to generate the output file with contributor's nationalities

#### Files & Locations
-  _input/repo_list.csv_: CSV with repositories, you can manually modify this list to add or remove repositories to be inquired
-  _output/repositories.json_: JSON with repositories and list of contributors
-  _output/resultNationality.json_: JSON with repositories, contributors and their nationality

***note a***: the input CSV list (i.e. repo_list.csv) must contain only links to active repositories with more than 0 contributors </br>

## Post-processing with Python
#### Prerequisites
 - Python with Geopy and Pandas libraries installed

#### How to run
-  edit _post_analysis/contibutors_map.py_ by specifying input (use: _output/resultNationality.json_) and output (e.g. _.../output/contibutors_xy.csv_) full folder paths and the geocoding API (default: GOOGLE, optional: OSM NOMINATIM)
-  edit _post_analysis/contibutors_map.py_ and insert [your GOOGLE API Key] at line 55
-  run ***_post_analysis/contibutors_map.py_*** in a Python console
-  open the output CSV report in a GIS software to visualize the results and perform further analyses


#### Files & Locations
-  _output/resultNationality.json_: JSON with repositories, contributors and their nationality i.e. the output of _bin/getlocation.js_, which represents the input dataset for post-processing
-  _output/contibutors_xy.csv_: CSV report including geo points depicting the position of single users

***note b***: geocoding procedure might require time </br>
***note c***: you will be able to save in the output only users having true "location" information in their GitHub profiles. No-geocoded users are excluded from the post-processed output</br>
***note d***:a user which is contributor of two or more repo will appear more than one time in the output. An additional output CSV as _contributors_single_users_xy.csv_ containing only unique users is automatically created in the same position of the main output</br>

## GitHub Limit

The GitHub Personal Access Token is constrained to a rate-limit of 5000-requests-per-hour. 

## License

MIT

[your GitHub Personal Access Token]:<https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/>
[your GOOGLE API Key]:<https://developers.google.com/maps/documentation/geocoding/get-api-key>
