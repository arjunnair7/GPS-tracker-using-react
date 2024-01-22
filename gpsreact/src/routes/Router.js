import React from "react";
import {Route,Routes} from "react-router-dom"
import Vehicle from "../vehicle";

const Router = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Vehicle/>}/>
            
        </Routes>
    )
}


export default Router