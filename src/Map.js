import React from 'react'
import {Map as LeafletMap, TileLayer} from 'react-leaflet'
import './Map.css'
import {showDataOnMap} from './util'

function Map({countries, casesType, center,zoom}) {
    console.log("countries>>",countries);
    console.log("casesType>>",casesType);
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom} viewport={null}>
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenstreetMap</a>contributors'
                />
                {/* Loop through countries and draw circles on the screen*/}
                {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
