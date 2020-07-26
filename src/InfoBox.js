import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"

import "./InfoBox.css"
function InfoBox({title, cases, total}) {
    return (
            <Card className="infoBox">
                <CardContent>
                    {/* Title */}
                    <Typography className="infoBox__title" color="textSecondary">
                        {title} 
                    </Typography>
                    {/* Number of Cases */}
                    <div style={{display:"flex",alignItems:"center"}}>
                        <h2 className="infoBox__cases">{cases}</h2>
                        <span style={{marginLeft:"5px"}}>Today</span>
                    </div>
                    {/* Total*/}
                    <Typography className="infoBox__total" color="textSecondary">
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
    )
}

export default InfoBox
