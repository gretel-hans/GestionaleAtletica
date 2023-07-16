import { useState } from "react";
import NavbarAthletix from "./NavbarAthletix";

const Homepage=()=>{
    
    return(
        <div>
            {(sessionStorage.getItem("username")===null || sessionStorage.getItem("username")==="null" )&&(
                <div>Non sei loggato per accedere ai contenuti esegui il login o registrati!</div>
            )}
       
        {(sessionStorage.getItem("username")!==null || sessionStorage.getItem("username")!=="null" )&&(
            <div>
                <NavbarAthletix/>
                <h1>Benvenuto {sessionStorage.getItem("username")}!!</h1>
                </div> 
        )}
        </div>
    )
}

export default Homepage;