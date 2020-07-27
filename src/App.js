import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core"

import {sortData, prettyPrintStat} from './util'
import './App.css';
import InfoBox from "./InfoBox"
import Map from "./Map"
import Table from "./Table"
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css"
function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState(null)
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({
    lat:34.80746,lng:-40.4796
  })
  const [mapZoom, setMapZoom] = useState(2)
  const [mapCountries,setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')

  useEffect(() => {
    // Get worldwide data
    console.log("useEffect-1")
    const url = "https://disease.sh/v3/covid-19/all"
    fetch(url).then(res => res.json()).then(data => {
      setCountryInfo(data)
    }).catch((error)=>{console.log("error>>>>","https://disease.sh/v3/covid-19/all",error)})
  }, [])
  useEffect(() => {
    //Get all countries data for table
    console.log("useEffect-2")
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ))
          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries)
          setMapCountries(data)
        }).catch((error)=>{console.log("error>>>>","https://disease.sh/v3/covid-19/countries",error)})
    }
    getCountriesData()
  }, [])
  // https://disease.sh/v3/covid-19/countries
  const onCountryChange = async (event) => {
    console.log("onCountryChange")
    const countryCode = event.target.value
    const url = countryCode === "worldwide" ?
      "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url).then(res => res.json()).then(data => {
      setCountry(countryCode)
      setCountryInfo(data)
      if (countryCode!=="worldwide"){
        setMapCenter([data.countryInfo.lat,data.countryInfo.long])
        setMapZoom(4)
      }else{
        setMapCenter([23.69,120.96])
        setMapZoom(4)
      }
    }).catch((error)=>{console.log("error>>>>","https://disease.sh/v3/covid-19/countries[all]",error)})
  }
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER - Gary</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country, i) => <MenuItem key={i} value={country.value}>{country.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox 
            active={casesType==="cases"}
            title="Covid-19 Cases" 
            selectedType="InfoBox--selected--cases"
            onClick={e=>setCasesType('cases')}
            cases={countryInfo ? prettyPrintStat(countryInfo.todayCases) : "loading..."}
            total={countryInfo ? prettyPrintStat(countryInfo.cases) : "loading..."} />
          <InfoBox 
            active={casesType==="recovered"}
            selectedType="InfoBox--selected--recovered"
            title="Recovered" 
            onClick={e=>setCasesType('recovered')}
            cases={countryInfo ? prettyPrintStat(countryInfo.todayRecovered) : "loading..."}
            total={countryInfo ? prettyPrintStat(countryInfo.recovered) : "loading..."} />
          <InfoBox 
            active={casesType==="deaths"}
            selectedType="InfoBox--selected--deaths"
            title="Deaths" 
            onClick={e=>setCasesType('deaths')}
            cases={countryInfo ? prettyPrintStat(countryInfo.todayDeaths) : "loading..."}
            total={countryInfo ? prettyPrintStat(countryInfo.deaths) : "loading..."} />
        </div>
        <Map 
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right" >
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3 style={{marginTop:"10px"}}>Worldwide New {casesType}</h3>
          <LineGraph casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
