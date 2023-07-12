import { useState } from "react";
import Navbar from "./NavbarAthletix";

const Homepage=()=>{
//console.log(sessionStorage.getItem("username"))

    return(
        <div>
            {sessionStorage.getItem("username")===null&&(
                <div>Non sei loggato per accedere ai contenuti fai il login!</div>
            )}
       
        {sessionStorage.getItem("username")!==null&&(
            <div>
                <Navbar/>
                <h1>Benvenuto {sessionStorage.getItem("username")}!!</h1>
                </div> 
        )}
        </div>
    )
}

export default Homepage;