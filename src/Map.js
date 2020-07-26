import React from 'react'
import {Map as LeafletMap, TileLayer} from 'react-leaflet'
import './Map.css'
function Map({center,zoom}) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom} viewport={null}>
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenstreetMap</a>contributors'
                />
            </LeafletMap>
            
        </div>
    )
}

export default Map
