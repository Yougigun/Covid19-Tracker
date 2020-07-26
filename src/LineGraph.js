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
function LineGraph({ caseType }) {
    const [data, setData] = useState([])
    // "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(res => res.json())
            .then(data => {
                const chartData = buildChartData(data)
                console.log(chartData);
                setData(chartData)
            })
    }, [caseType])

    console.log("data>>>>", data);
    return (
        <div className="lineGraph">
            {/* <h1>I am a Graph</h1> */}
            <Line
                data={{
                    datasets: [
                        {
                            data: data,
                            backgroundColor: "rgba(204,16,52,0.5)",
                            borderColor: "#CC1034"
                        }
                    ]
                }}
                options={options}
            />
        </div>
    )
}

export default LineGraph
