import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core"

import './App.css';
import InfoBox from "./InfoBox"
import Map from "./Map"
function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState(null)

  useEffect(() => {
    const url = "https://disease.sh/v3/covid-19/all"
    fetch(url).then(res => res.json()).then(data => {
      setCountryInfo(data)
    })
  }, [])
  useEffect(() => {
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
          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])
  // https://disease.sh/v3/covid-19/countries
  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    const url = countryCode === "worldwide" ?
      "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url).then(res => res.json()).then(data => {
      setCountry(countryCode)
      // All of the data ...
      // from the country code
      setCountryInfo(data)
      console.log("COUNTRY INFO >>>", data);
    })
  }
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
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
          <InfoBox title="Coronavirus Cases"
            cases={countryInfo ? countryInfo.todayCases : "loading..."}
            total={countryInfo ? countryInfo.cases : "loading..."} />
          <InfoBox title="Recovered"
            cases={countryInfo ? countryInfo.todayRecovered : "loading..."}
            total={countryInfo ? countryInfo.recovered : "loading..."} />
          <InfoBox title="Deaths"
            cases={countryInfo ? countryInfo.todayDeaths : "loading..."}
            total={countryInfo ? countryInfo.deaths : "loading..."} />
        </div>

        {/* Table */}
        {/* Graph */}

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right" >
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country ##Not Finished</h3>
          {/* Graph */}
          <h3>Worldwide New Cases ##Not Finished</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
