# -*- coding: utf-8 -*-
"""
Created on Wed Oct 18 09:59:24 2017
#
# Project:  FOSS4G contributors
# Purpose:  Enabling a semi-automatic procedure for a demographic analysis of the FOSS4G developers’ community. 
#           This script use the output of the GitHub contributors' census (resultNationality.json),
#           to geocode nationality and create a layer of points (.csv) to be analised in a GIS like software.
# Author:   Daniele Oxoli (daniele.oxoli@polimi.it)
# Affiliation: Department of Civil and Environmental Engineering | GEOlab, Politecnico di Milano, P.zza Leonardo da Vinci 32, 20133, Milano, Italy
#
"""
import time
import os
import json
import csv
import pandas as pd
from geopy.geocoders import GoogleV3, Nominatim


file_in = "path to input ../FOSS4G_contributors/output/resultNationality.json" #input file path
file_out = "path to output ../FOSS4G_contributors/output/contributors_xy.csv" #output file path

"""

input json file format is: owner1/repo1:[{'name': username1, 'nationality': place1},{'name': username2, 'nationality': place2},...], 
                owner2/repo2:[{'name': username3, 'nationality': place3},{'name': username4, 'nationality': place4},...],...

"""
start_time = time.clock()

df = pd.concat([pd.Series(json.loads(line)) for line in open(file_in, 'r')], axis=1).transpose()

repo_name = []
user_name = []
user_nationality = [] 

for repo in list(df):
    print (repo)        
    for item in list(df[repo]):
        for name in item:
            repo_name.append(repo)
            user_name.append(name)
            user_nationality.append(item[name]['nationality'])
            
df_contributors = pd.DataFrame()  

df_contributors['repo'] = repo_name
df_contributors['user'] = user_name
df_contributors['nationality'] = user_nationality

df_contr_clean_a = df_contributors.dropna()
               
#geolocator = Nominatim(timeout=None) # geocoding with OSM
geolocator = GoogleV3(api_key='your GOOGLE API key', timeout=None) # geocodind with Google API:
df_contr_clean_a['coordinates'] = df_contr_clean_a['nationality'].apply(geolocator.geocode)

df_contr_clean_b = df_contr_clean_a.dropna()

df_contr_clean_b['coordinates'] = df_contr_clean_b['coordinates'].apply(lambda x: (x.latitude, x.longitude))
               
x = []
y = []    
            
for i in df_contr_clean_b.index:
    x.append(df_contr_clean_b['coordinates'][i][1])
    y.append(df_contr_clean_b['coordinates'][i][0])  

df_contr_clean_b['x'] = x
df_contr_clean_b['y'] = y     
            
df_contr_clean_b.to_csv(file_out, encoding = "utf8", quoting=csv.QUOTE_NONNUMERIC)     

# Additional output reports

#full list
file_out_contributors = os.path.split(file_out)[0] + '/contributors_full.csv' 
df_contributors.to_csv(file_out_contributors, encoding = "utf8", quoting=csv.QUOTE_NONNUMERIC)

#full list unique contributors
file_out_single_users_full = os.path.split(file_out)[0] + '/contributors_unique_full.csv' 
df_contributors_single_users = df_contributors.drop_duplicates(subset='user', keep='first', inplace=False)
df_contributors_single_users.to_csv(file_out_single_users_full, encoding = "utf8", quoting=csv.QUOTE_NONNUMERIC)

#unique geocoded contributors
file_out_single_users = os.path.split(file_out)[0] + '/contributors_unique_xy.csv' 
df_contr_clean_b_single_users = df_contr_clean_b.drop_duplicates(subset='user', keep='first', inplace=False)
df_contr_clean_b_single_users.to_csv(df_contr_clean_b_single_users, encoding = "utf8", quoting=csv.QUOTE_NONNUMERIC)

end_time = time.clock()   

print (end_time - start_time)    
            
            
            
            
        
             
