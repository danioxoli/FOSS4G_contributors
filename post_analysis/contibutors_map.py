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
import json
import pandas as pd
from geopy.geocoders import Nominatim

#from pandas.io.json import json_normalize

file_in = "path to input ../FOSS4G_contributors/output/resultNationality.json"

"""

file format is: owner1/repo1:[{'name': username1, 'nationality': place1},{'name': username2, 'nationality': place2},...], 
                owner2/repo2:[{'name': username3, 'nationality': place3},{'name': username4, 'nationality': place4},...],...

"""
start_time = time.clock()

df = pd.concat([pd.Series(json.loads(line)) for line in open(file_in, 'r', encoding="utf8")], axis=1).transpose()

repo_name = []
user_name = []
user_nationality = [] 

for repo in list(df):
    print (repo)        
    for item in list(df[repo]):
        for i in item:
            repo_name.append(repo)
            user_name.append(i['name'])
            user_nationality.append(i['nationality'])
            
df_contributors = pd.DataFrame()  

df_contributors['repo'] = repo_name
df_contributors['user'] = user_name
df_contributors['nationality'] = user_nationality

df_contr_clean_a = df_contributors.dropna()
               
geolocator = Nominatim(timeout=None)
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
            

df_contr_clean_b.to_csv("path to output ../FOSS4G_contributors/output/contributors_xy.csv")     

end_time = time.clock()   

print (end_time - start_time)    
            
            
            
            
        
             
