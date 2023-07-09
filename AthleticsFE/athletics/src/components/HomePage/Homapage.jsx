import { useState } from "react";

const Homepage=()=>{


console.log(sessionStorage.getItem("Username"))



    return(
        <div>
            {sessionStorage.getItem("Username")==="null"&&(
                <div>Non sei loggato per accedere ai contenuti fai il login!</div>
            )}
       
        {sessionStorage.getItem("Username")!=="null"&&(
            <div><h1>Benvenuto {sessionStorage.getItem("Username")}!!</h1></div> 
        )}
        </div>
    )
}

export default Homepage;