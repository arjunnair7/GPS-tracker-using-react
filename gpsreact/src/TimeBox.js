import React from "react";
import "./TimeBox.css"
const TimeBox = ({time})=>{

    
    return(
        <div className="container">
            <div className="time"> Current time: {time.value}</div>
        </div>
    )
}

export default TimeBox