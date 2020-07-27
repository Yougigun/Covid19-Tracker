import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"

import "./InfoBox.css"
function InfoBox({active, title, cases, total,selectedType, ...props}) {
    return (
            <Card 
            onClick={props.onClick}
            className={`infoBox ${active && selectedType}`}>
                <CardContent style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <Typography className="infoBox__title" color="textSecondary">
                        {title} 
                    </Typography>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <h2 className={`infoBox__cases ${title==='Recovered'&&'infoBox_recoverFont'}`}>{cases}</h2>
                        <p style={{marginLeft:"5px"}}>Today</p>
                    </div>
                    <Typography className="infoBox__total" color="textSecondary">
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
    )
}

export default InfoBox
