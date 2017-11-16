# FOSS4G contributors

#### This work has been derived from: https://github.com/mgechev/github-contributors-list

```sh
 $ work in progress ...
``` 


## HowTo
#### Prerequisites
 - Nodejs Installed

#### How to run
-  Download the Repository
-  run 'npm install'
-  edit bin/githubcontrib.js and insert your AUTH token (you can change the other preferences)
-  edit bin/getLocation and insert your AUTH token (you can change the other preferences)
-  run node bin/githubcontrib to generate the output file with the list of user per repository
-  run node bin/getlocation to generate the output file with nationalities

#### Files & Locations
-  input/repo_list.csv: CSV with repositories
-  output/repositories.json: JSON with repos and list of contributors
-  output/resultNationality.json: JSON with the repos, contirbutors and their nationality

#### Post-processing with Python
-  input/resultNationality.json: JSON with the repos, contirbutors and their nationality
-  output/repositories.json: JSON with repos and list of contributors
-  edit _post_analysis/contibutors_map.py_ by specifying input (.json) and output (.csv) file names with path
-  open the output (.csv) in a GIS software to visulize the results and perform further analyses

*note: geocoding procedure might require time

## GitHub Limit

The Github API has a 60-requests-per-hour rate-limit for non-authenticated use. If you need some more then a scope-limited Github OAuth token can be used to boost the limit to 5000.

## License

MIT
