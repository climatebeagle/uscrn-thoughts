import requests
from bs4 import BeautifulSoup as soup
import json
import math
import pandas as pd

def loadStationsId(stations):
    sm = {}
    #url = requests.get("https://www.ncdc.noaa.gov/isis/stationlist?networkid=1")
    with open("list-stations.html", encoding="utf-8") as f:
        data = f.read()
        page = soup(data, 'html.parser')
    sl = page.find('ul', id='stationList')
    for s in sl.find_all('li'):
        name = None
        for a in s.find_all('a'):
            name = a.string
            hr = a.attrs['href'].split('=')
            id_ = hr[-1]
        txt = s.text
        ds = int(txt.find('('))
        de = int(txt.rfind(')'))
        desc = txt[ds+1:de]

        if name in stations:
            stations[name]['id'] = id_
            stations[name]['description'] = desc
        else:
            print("STATION NOT FOUND!", name, desc)

with open('station-listing.html', encoding="utf-8") as f:
    dfs = pd.read_html(io=f)

df = dfs[0]

crn = df[df['NETWORK'] == 'CRN']
stations = {}
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
    js['start_date'] = station['OPERATIONAL DATE']
    js['lat'] = station['LATITUDE']
    js['lon'] = station['LONGITUDE']
    js['elevation'] = station['ELEVATION (FT)']
    js['conus'] = conus
    stations[js['name']] = js

loadStationsId(stations)

with open('../../src/components/data/stations.js', 'w') as sf:
    sf.write("export function uscrn_stations() { \n return ")
    json.dump(list(stations.values()), sf)
    sf.write(";\n}\n")

