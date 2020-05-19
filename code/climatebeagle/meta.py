import json
import math
import pandas as pd

with open('station-listing.html') as f:
    dfs = pd.read_html(io=f)

df = dfs[0]

crn = df[df['NETWORK'] == 'CRN']
stations = []
for idx, station in crn.iterrows():
    if str(station['CLOSED DATE']) != 'nan':
        continue
    conus = True
    if station['STATION'].startswith('AK'):
       conus = False
    if station['STATION'].startswith('HI'):
       conus = False

    js = {}
    js['name'] = station['STATION']
    js['state'] = station['STATION'].split()[0]
    #js['start_date'] = station['STATION']
    js['lat'] = station['LATITUDE']
    js['lon'] = station['LONGITUDE']
    js['conus'] = conus
    stations.append(js)

with open('../../src/pages/data/stations.js', 'w') as sf:
    sf.write("function uscrn_stations() { \n return ")
    json.dump(stations, sf)
    sf.write(";\n}\n")