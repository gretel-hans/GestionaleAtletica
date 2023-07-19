import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import NavbarAthletix from "../HomePage/NavbarAthletix"

const RicercaAtleti=()=>{

  let atleti=[];
  let [risultatoAtleti,setRisultatoAtleti]=useState([])
  let [inputBarra,setInputBarra]=useState("");

  const fetchAtleti=async ()=>{
    try {
        let response=await fetch("http://localhost:8080/athletics/utenti");
        if(response.ok){
          let data=await response.json();
          
          data.forEach((utente,indexUtente) => {
            let ruoli=[...utente.roles]
            ruoli.forEach((ruolo,index)=>{
                 if(ruolo.roleName==="ROLE_ATLETA"){
                    atleti.push(utente)
                }
            })
          });
        }
      } catch (error) {
        console.log("ERRORE! Durante il caricamento di tutti gli utenti")
      }
}

useEffect(()=>{
  fetchAtleti()
},[])
  
    return(
        <>
        {(sessionStorage.getItem("username") === null ||
        sessionStorage.getItem("username") === "null") && (
        <div>
          Non sei loggato per accedere ai contenuti esegui il login o
          registrati!
        </div>
      )}

      {(sessionStorage.getItem("username") !== null ||
        sessionStorage.getItem("username") !== "null") && (

          <div>
            <NavbarAthletix />

        <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" value={inputBarra} placeholder="Ricerca atleti..." aria-label="Search" onChange={(e)=>{
        console.log(e.target.value)
        setInputBarra(e.target.value)
      }}/>
      <Button className="btn btn-outline-success" onClick={()=>{
      atleti.forEach((atleta,index)=>{
        if((atleta.nome).toLowerCase().includes(inputBarra.toLocaleLowerCase())){
          console.log(atleta)
          setRisultatoAtleti(...RicercaAtleti,atleta)
        }
      })
      console.log(atleti)
console.log("cliccato")
      }}>Cerca</Button>
    </form>
            </div>


        )}
        </>
    )
}

export default RicercaAtleti