import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import NavbarAthletix from "../HomePage/NavbarAthletix";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import gareCorse from "../../dati/gareCorse.json"
import gareConcorsi from "../../dati/gareConcorsi.json"
import AccessoNegato from "../HomePage/AccessoNegato";

const CreazioneEventi = () => {
  const [formCorse, setFormCorse] = useState(false);
  const [formConcorsi, setFormConcorsi] = useState(false);
  const [mostraAltroFormConcorsi, setMostraAltroFormConcorsi] = useState(false);
  const [mostraAltroFormCorse, setMostraAltroFormCorse] = useState(false);
  const ConGareConcorso=document.getElementById("ContainerDettagliGareConcorso")
  const ConGareCorse=document.getElementById("ContainerDettagliGareCorse")

  let categorie = [
    { label: "Esordienti", value: "Esordienti" },
    { label: "Ragazzi", value: "Ragazzi" },
    { label: "Cadetti", value: "Cadetti" },
    { label: "Allievi", value: "Allievi" },
    { label: "Juniores", value: "Juniores" },
    { label: "Promesse", value: "Promesse" },
    { label: "Seniores", value: "Seniores" },
    { label: "Master", value: "Master" },
    { label: "Assoluti", value: "Assoluti" },
  ]

  let genere = [
    { label: "Uomini", value: "M" },
    { label: "Donne", value: "F" },]

  const [gareConcorsiSelezionti,setGareConcorsiSelezionti]=useState([])
  const [gareCorseSelezionti,setGareCorseSelezionti]=useState([])


  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "black",
      color: "white",
    }),
  };

  const [evento, setEvento] = useState({
    codice: sessionStorage.getItem("bearerToken"),
    nomeEvento: "",
    dataEvento: "",
    listaGareCorse: [{
      tipo:"",
      massimoPartecipanti:"",
      genereGara:"",
      categoria:""
    }],
    listaGareConcorsi: [{
      tipo:"",
      massimoPartecipanti:"",
      genereGara:"",
      categoria:""
    }],
  });

  const [counter,setCounter]=useState(0);
  const [counterCorse,setCounterCorse]=useState(0);

const fetchEvento= async ()=>{
  try {
    let response = await fetch("http://localhost:8080/athletics/eventi",{
      method:"POST",
      headers:{
        Authorization:"Bearer "+sessionStorage.getItem("bearerToken"),
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(evento),
    });
    if(response.ok){
      alert("Evento creato con successo!")
      window.location.replace("/Homepage")
    }
    
  } catch (error) {
    console.log("ERRORE!! Durante la creazione dell'evento!"+error)
  }
}

  return (
    <>
      {(sessionStorage.getItem("username") === null ||
        sessionStorage.getItem("username") === "null") && (
          <AccessoNegato/>
      )}

      {(sessionStorage.getItem("username") !== null &&
        sessionStorage.getItem("username") !== "null") && (
        <div>
          <NavbarAthletix />
          <section className="vh-100 gradient-custom">
            <div className="container h-100">
              <div className="row d-flex justify-content-center h-100">
                <div className="col-12 col-md-10">
                  <h1 className="mt-2">Benvenuto nella creazione di Eventi!</h1>
                  <div
                    className="card bg-dark text-white"
                    style={{ border: "border-radius: 6rem" }}
                  >
                    <div className="card-body md-p-5 text-center">
                      <div className="mb-md-5 mt-md-4 pb-0">
                        <p className="text-white-50 mb-5">
                          Inserisci i dati dell'evento che vuoi creare
                        </p>
                        <Container fluid>
                          <Row className="row-cols-1 row-cols-md-2 justify-content-center pb-md-4">
                            <Col>
                              {" "}
                              <div className="form-outline form-white mb-4">
                                <input
                                  type="text"
                                  id="nomeEventi"
                                  className="form-control form-control-lg"
                                  placeholder="Nome evento...."
                                  value={evento.nomeEvento}
                                  onChange={(e) => {
                                    setEvento({
                                      ...evento,
                                      nomeEvento: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </Col>

                            <Col>
                              {" "}
                              <div className="form-outline form-white mb-4">
                                <input
                                  type="date"
                                  id="civico"
                                  className="form-control form-control-lg"
                                  value={evento.dataEvento}
                                  onChange={(e) => {
                                    setEvento({
                                      ...evento,
                                      dataEvento: e.target.value,
                                    });
                                    //console.log(e.value)
                                  }}
                                />
                              </div>
                            </Col>
                            <Col>
                              <button
                                className="btn btn-outline-light"
                                onClick={() => {
                                  setFormCorse(true);
                                  setFormConcorsi(false);
                                  //ConGareConcorso.style.display="none"
                                  if(ConGareConcorso!==null){
                                    ConGareConcorso.style.display="none"
                                  }}}
                              >
                                Gestione lista Gare di Corsa
                              </button>
                            </Col>
                            <Col className="py-3 py-md-0">
                              <button
                                className="btn btn-outline-light"
                                onClick={() => {
                                  setFormConcorsi(true);
                                  setFormCorse(false);
                                  if(ConGareCorse!==null){
                                    ConGareCorse.style.display="none"
                                  }
                                }}
                              >
                                Gestione lista Gare Concorsi
                              </button>
                            </Col>
                          </Row>
                        </Container>

                        {formConcorsi && (
                          <Container fluid>
                            <Row className="row-cols-1 justify-content-center">
                              <Col>
                                <Select
                                  isMulti
                                  name="concorsi"
                                  options={gareConcorsi}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  placeholder="Seleziona/ricerca le gare dei concorsi da aggiungere"
                                  styles={customStyles}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "hotpink",
                                      primary: "black",
                                    },
                                  })}
                                  onChange={(e)=>{
                                    //console.log(e)
                                  setGareConcorsiSelezionti(e)
                                  }}
                                  value={gareConcorsiSelezionti}
                                />
                              </Col>
                              <Col>
                              <i className="bi bi-plus-square-fill plusEvento" onClick={()=>{
                                setMostraAltroFormConcorsi(true)
                                //console.log(counter)
                                setCounter(counter+1)
                                //ConGareCorse.style.display="none"
                                }}>
                                  &nbsp;Aggiungi gara</i><br/>
                                {((evento.listaGareConcorsi[0].tipo!=="")===true)&&(<Link onClick={()=>{
                                  if(ConGareConcorso!==null&&ConGareConcorso!==undefined){
                                    ConGareConcorso.style.display="block"
                                  }
                                  
                                }}> Mostra dettagli gare concorsi</Link>)}
                                
                              </Col>
                            </Row>
                          </Container>
                        )}
                        
                        {mostraAltroFormConcorsi&&(<>
                        <Container id="ContainerDettagliGareConcorso" >
                          <h3>Dettagli gare di Concorso</h3>
                        {
                          Array.from({length:counter},(elemento,index)=>{
                            return (
                              <Row key={index} className="row-cols-2 row-cols-md-4 mb-3 d-flex align-items-center">
                              <Col className="mb-2 mb-md-0">
                              <Select
                                  name="concorsi"
                                  options={gareConcorsiSelezionti}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  placeholder="Seleziona gara"
                                  styles={customStyles}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "hotpink",
                                      primary: "black",
                                    },
                                  })}
                                 onChange={(e)=>{
                                    let updatedGareConcorsi=[...evento.listaGareConcorsi]
                                    updatedGareConcorsi[index]={tipo:e.value}
                                  setEvento({...evento,listaGareConcorsi:updatedGareConcorsi})
                                  //console.log(selezioniGare.listaGareConcorsi[index])
                                  }}
                                   />
                              </Col>
                              <Col className="mb-2 mb-md-0">
                              <Select
                                  name="concorsi"
                                  options={categorie}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  placeholder="Seleziona categoria"
                                  styles={customStyles}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "hotpink",
                                      primary: "black",
                                    },
                                  })}
                                  onChange={(e)=>{
                                    let updatedGareConcorsi=[...evento.listaGareConcorsi]
                                    updatedGareConcorsi[index]={...updatedGareConcorsi[index],categoria:e.value}
                                  setEvento({...evento,listaGareConcorsi:updatedGareConcorsi})
                                  }}
                                  />
                              </Col>
                              <Col>
                              <Select
                                  name="concorsi"
                                  options={genere}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  placeholder="Seleziona genere"
                                  styles={customStyles}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "hotpink",
                                      primary: "black",
                                    },
                                  })}
                                  onChange={(e)=>{
                                    let updatedGareConcorsi=[...evento.listaGareConcorsi]
                                    updatedGareConcorsi[index]={...updatedGareConcorsi[index],genereGara:e.value}
                                  setEvento({...evento,listaGareConcorsi:updatedGareConcorsi})
                                  }}
                                  />
                              </Col>
                              <Col>
                              <input
                                  type="number"
                                  id="civico"
                                  placeholder="massimo partecipanti"
                                  className="form-control form-control-lg"
                                  onChange={(e)=>{
                                    let updatedGareConcorsi=[...evento.listaGareConcorsi]
                                    updatedGareConcorsi[index]={...updatedGareConcorsi[index],massimoPartecipanti:e.target.value}
                                  setEvento({...evento,listaGareConcorsi:updatedGareConcorsi})
                                  }}
                                />
                              </Col>
                              </Row>
                              )
                          })
                        }
                        {
                          ((evento.listaGareConcorsi[0].genereGara!=="")===true&&(

                            <Link onClick={()=>{
                              //setMostraAltroFormConcorsi(false)
                              ConGareConcorso.style.display="none"
                              }}>Chiudi Info Gare</Link>
                          ))
                        }
                        
                      </Container>
                         </>)}
                        {formCorse && (
                          <Container fluid>
                            <Row className="row-cols-1 justify-content-center">
                              <Col>
                                <Select
                                  isMulti
                                  name="corse"
                                  options={gareCorse}
                                  placeholder="Seleziona/ricerca le gare di corsa da aggiungere"
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  styles={customStyles}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "hotpink",
                                      primary: "black",
                                    },
                                  })}
                                  onChange={(e)=>{
                                    //console.log(e)
                                  setGareCorseSelezionti(e)
                                  }}
                                  value={gareCorseSelezionti}
                                />

                                
                              </Col>
                              <Col>
                              <i className="bi bi-plus-square-fill plusEvento" onClick={()=>{
                                setMostraAltroFormCorse(true)
                                setCounterCorse(counterCorse+1)
                                //ConGareConcorso.style.display="none"
                              }}>
                                 &nbsp;Aggiungi gara</i><br/>

                                 {((evento.listaGareCorse[0].tipo!=="")===true)&&(<Link onClick={()=>{
                                  if(ConGareCorse!==null||ConGareCorse!==undefined){
                                    ConGareCorse.style.display="block"
                                  }
                                }}> Mostra dettagli gare corse</Link>)}
                              </Col>
                            </Row>
                          </Container>
                        )}

{mostraAltroFormCorse&&(<>
                        <Container id="ContainerDettagliGareCorse" >
                          <h3>Dettagli gare di Corsa</h3>
                        {
                          Array.from({length:counterCorse},(elemento,index)=>{
                            return (
                              <Row key={index} className="row-cols-2 row-cols-md-4 mb-3 d-flex align-items-center">
                              <Col className="mb-2 mb-md-0">
                              <Select
                                  name="concorsi"
                                  options={gareCorseSelezionti}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  placeholder="Seleziona gara"
                                  styles={customStyles}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "hotpink",
                                      primary: "black",
                                    },
                                  })}
                                 onChange={(e)=>{
                                    let updatedGareCorse=[...evento.listaGareCorse]
                                    updatedGareCorse[index]={tipo:e.value}
                                  setEvento({...evento,listaGareCorse:updatedGareCorse})
                                  //console.log(selezioniGare.listaGareConcorsi[index])
                                  }}
                                   />
                              </Col>
                              <Col className="mb-2 mb-md-0">
                              <Select
                                  name="concorsi"
                                  options={categorie}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  placeholder="Seleziona categoria"
                                  styles={customStyles}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "hotpink",
                                      primary: "black",
                                    },
                                  })}
                                  onChange={(e)=>{
                                    let updatedGareCorse=[...evento.listaGareCorse]
                                    updatedGareCorse[index]={...updatedGareCorse[index],categoria:e.value}
                                  setEvento({...evento,listaGareCorse:updatedGareCorse})
                                  }}
                                  />
                              </Col>
                              <Col>
                              <Select
                                  name="concorsi"
                                  options={genere}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  placeholder="Seleziona genere"
                                  styles={customStyles}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "hotpink",
                                      primary: "black",
                                    },
                                  })}
                                  onChange={(e)=>{
                                    let updatedGareCorse=[...evento.listaGareCorse]
                                    updatedGareCorse[index]={...updatedGareCorse[index],genereGara:e.value}
                                  setEvento({...evento,listaGareCorse:updatedGareCorse})
                                  }}
                                  />
                              </Col>
                              <Col>
                              <input
                                  type="number"
                                  id="civico"
                                  placeholder="massimo partecipanti"
                                  className="form-control form-control-lg"
                                  onChange={(e)=>{
                                    let updatedGareCorse=[...evento.listaGareCorse]
                                    updatedGareCorse[index]={...updatedGareCorse[index],massimoPartecipanti:e.target.value}
                                  setEvento({...evento,listaGareCorse:updatedGareCorse})
                                  }}
                                />
                              </Col>
                              </Row>
                              )
                          })
                        }{
                          ((evento.listaGareCorse[0].genereGara!=="")===true&&(
                            <Link onClick={()=>{
                            if(ConGareCorse!==null){
                              ConGareCorse.style.display="none"
                            }
                            }}>Chiudi Info Gare</Link>
                          ))
                        }
                          
                        
                      </Container>
                         </>)}
                        <button className="btn btn-outline-light btn-lg px-5 mt-4"
                        onClick={()=>{
                          if((evento.nomeEvento&&evento.dataEvento)!==""&&(evento.listaGareConcorsi.length&&evento.listaGareCorse.length)>1){
                            fetchEvento()
                          }else {
                            alert("Compila tutti i campi e inserisci almeno due gare di corsa e concorso!")
                          }
                        }}
                        >
                          Crea Evento
                        </button>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default CreazioneEventi;
