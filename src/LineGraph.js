import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'
import './LineGraph.css'
const options = {
    legend: {
        display: false
    },
    elements: {
        point: {
            radius: 0
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0.0")
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a")
                    }
                }
            }
        ]
    }
}

const casesTypeColors = {
    cases:{
        hex:"#CC1031",
        rgb:"rgb(204,16,52)",
        half_op:"rgba(204,16,52,0.5)",
        multiplier:800
    },
    recovered:{
        hex:"#7dd71d",
        rgb:"rgb(125,215,29)",
        half_op:"rgba(125,215,29,0.5)",
        multiplier:1200
    },
    deaths:{
        hex:"#fb4443",
        rgb:"rgb(251,68,67)",
        half_op:"rgba(251,68,67,0.5)",
        multiplier:2000
    }
}

const buildChartData = (data, casesType = "cases") => {
    const chartData = []
    let lastDataPoint
    for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date]
        // lastDataPoint = data["cases"][date] 
    }
    return chartData
}
function LineGraph({ casesType }) {
    const [data, setData] = useState([])
    // "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(res => res.json())
            .then(data => {
                const chartData = buildChartData(data,casesType)
                console.log(chartData);
                setData(chartData)
            })
    }, [casesType])

    return (
        <div className="lineGraph">
            <Line
                data={{
                    datasets: [
                        {
                            data: data,
                            backgroundColor:  casesTypeColors[casesType].half_op,
                            borderColor: casesTypeColors[casesType].rgb
                        }
                    ]
                }}
                options={options}
            />
        </div>
    )
}

export default LineGraph
