import { useEffect, useState } from "react";
import NavbarAthletix from "../HomePage/NavbarAthletix";
import Select from "react-select";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import AccessoNegato from "../HomePage/AccessoNegato";

const IscrizioniGare = () => {
  let gareCorse = [
    "Velocita_60m",
    "Velocita_80m",
    "Velocita_100m",
    "Velocita_150m",
    "Velocita_200m",
    "Velocita_300m",
    "Velocita_400m",
    "Staffetta_4x100",
    "Staffetta_4x200",
    "Staffetta_4x400",
    "Staffetta_3x800",
    "Staffetta_3x1000",
    "Ostacoli_100hs",
    "Ostacoli_110hs",
    "Ostacoli_400hs",
    "MezzoFondo_800m",
    "MezzoFondo_1000m",
    "MezzoFondo_1500m",
    "MezzoFondo_2000m",
    "MezzoFondo_3000m",
    "MezzoFondo_4000m",
    "MezzoFondo_5000m",
    "MezzoFondo_10000m",
    "Marcia_5000m",
    "Marcia_10000m",
    "Marcia_20000m",
    "Marcia_35000m",
    "Marcia_50000m",
  ];
  let gareConcorsi = [
    "Salto_lungo",
    "Salto_alto",
    "Salto_triplo",
    "Salto_asta",
    "Lancio_peso",
    "Lancio_vortex",
    "Lancio_disco",
    "Lancio_martello",
    "Lancio_giavellotto",
  ];

  const [counter, setCounter] = useState(0);
  const [listaEventi, setListaEventi] = useState([]);
  const [listaAtleti, setListaAtleti] = useState([]);
  const [listaGareDisponibili, setListaGareDisponibili] = useState([{}]);
  const [eventoSelezionato, setEventoSelezionato] = useState([]);
  const [mostraDettagliIscrizioni, setMostraDettagliIscrizioni] =
    useState(false);

  let ContIscrizioni = document.getElementById("ContainerDettagliIscrizioni");
  const [iscrizioniGare, setIscrizioniGare] = useState([
    {
      gara: "",
      atletiPartecipanti: [{}],
    },
  ]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "black",
      color: "white",
    }),
  };

  const fetchTuttiEventi = async () => {
    try {
      let response = await fetch("http://localhost:8080/athletics/eventi", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
        },
      });
      if (response.ok) {
        let data = await response.json();
        const opzioniEventi = data.map((evento) => ({
          value: evento,
          label: `${evento.nomeEvento}`,
        }));
        setListaEventi(opzioniEventi);
      }
    } catch (error) {
      console.log("ERRORE!! " + error);
    }
  };

  const iscrizioneGaraFetch = async (iscrizione, garaCorsa) => {
    try {
      let url = garaCorsa ? "/gareCorse" : "/gareConcorsi";
      let response = await fetch(
        `http://localhost:8080/athletics/iscrizioni${url}`,
        {
          method: "POST",
          body: JSON.stringify(iscrizione),
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
            "content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Iscrizioni effettuate con successo!");
        window.location.replace(
          `eventoSpecifico/${eventoSelezionato.value.id}`
        );
      }
    } catch (error) {
      console.log("ERRORE!! " + error);
    }
  };

  const fetchAtleti = async () => {
    try {
      let response = await fetch(
        "http://localhost:8080/athletics/atleti/cercaAtletiConS",
        {
          method: "POST",
          body: sessionStorage.getItem("bearerToken"),
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
            "Content-Type": "text/plain",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        const opzioniAtleti = data.map((atleta) => ({
          value: atleta,
          label: `${atleta.name} ${atleta.lastname} ${atleta.age} ${atleta.genere}`,
        }));
        setListaAtleti(opzioniAtleti);
      }
    } catch (error) {
      console.log("ERRORE!! " + error);
    }
  };

  useEffect(() => {
    fetchTuttiEventi();
    fetchAtleti();
  }, []);

  return (
    <>
      {(sessionStorage.getItem("username") === null ||
        sessionStorage.getItem("username") === "null") && <AccessoNegato />}

      {(sessionStorage.getItem("username") !== null ||
        sessionStorage.getItem("username") !== "null") && (
          <div>
            <NavbarAthletix />
            <section className="gradient-custom contenitoreIscrizioni"  >
              <div className="container h-100">
                <div className="row d-flex justify-content-center h-100">
                  <div className="col-12 col-md-10">
                    <h1 className="mt-2">
                      Benvenuto nella creazione di Eventi!
                    </h1>
                    <div
                      className="card bg-dark text-white"
                      style={{ border: "border-radius: 6rem" }}
                    >
                      <div className="card-body md-p-5 text-center">
                        <div className="mb-md-5 mt-md-4 pb-0">
                          <p className="text-white-50 mb-4">
                            Inserisci i dati relativi alle iscrizioni
                          </p>
                          <Select
                            name="concorsi"
                            options={listaEventi}
                            className="basic-multi-select mb-3"
                            classNamePrefix="select"
                            placeholder="Seleziona evento"
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
                            onChange={(e) => {
                              setEventoSelezionato(e);
                              let gareMiste = [
                                ...e.value.listaGareCorse,
                                ...e.value.listaGareConcorsi,
                              ];
                              const o = gareMiste.map((gara) => ({
                                value: gara,
                                label: `${gara.tipo} - ${gara.categoria} - ${gara.genereGara}`,
                              }));
                              setListaGareDisponibili(o);
                              setMostraDettagliIscrizioni(false);
                              setCounter(0);
                            }}
                          />

                          <i
                            className="bi bi-plus-square-fill plusEvento"
                            onClick={() => {
                              if (eventoSelezionato.value === undefined) {
                                alert(
                                  "Seleziona almeno un evento per poter effettuare un'iscrizione!!"
                                );
                              } else {
                                setCounter(counter + 1);
                                setMostraDettagliIscrizioni(true);
                                if (ContIscrizioni !== null) {
                                  ContIscrizioni.style.display = "block";
                                }
                              }
                            }}
                          >
                            &nbsp; Aggiungi iscrizione
                          </i>
                          <br />
                          {counter > 0 && (
                            <>
                              {" "}
                              <Link
                                onClick={() => {
                                  setMostraDettagliIscrizioni(true);
                                  if (ContIscrizioni !== null) {
                                    ContIscrizioni.style.display = "block";
                                  }
                                }}
                              >
                                Mostra dettagli iscrizioni{" "}
                              </Link>{" "}
                              <br />
                            </>
                          )}

                          <Container id="ContainerDettagliIscrizioni">
                            {mostraDettagliIscrizioni && (
                              <>
                                <h3>Gestione iscrizioni</h3>
                                {Array.from(
                                  { length: counter },
                                  (elemento, index) => {
                                    return (
                                      <Row
                                        key={index}
                                        className="row-cols-1 row-cols-md-2 mb-3 d-flex align-items-center"
                                      >
                                        <Col className="mb-2 mb-md-0">
                                          <Select
                                            name="concorsi"
                                            options={listaGareDisponibili}
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
                                            onChange={(e) => {
                                              if (!iscrizioniGare[index]) {
                                                iscrizioniGare[index] = {
                                                  gara: "",
                                                  atletiPartecipanti: [{}],
                                                };
                                              }
                                              let iscrizioneUpdated = [
                                                ...iscrizioniGare,
                                              ];
                                              iscrizioneUpdated[index] = {
                                                gara: e.value,
                                                atletiPartecipanti:
                                                  iscrizioneUpdated[index]
                                                    .atletiPartecipanti,
                                              };
                                              setIscrizioniGare(
                                                iscrizioneUpdated
                                              );
                                            }}
                                          />
                                        </Col>
                                        <Col>
                                          <Select
                                            name="concorsi"
                                            isMulti
                                            options={listaAtleti}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Seleziona atleti"
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
                                            onChange={(e) => {
                                              if (!iscrizioniGare[index]) {
                                                iscrizioniGare[index] = {
                                                  gara: "",
                                                  atletiPartecipanti: [{}],
                                                };
                                              }
                                              let listaAtletiSelezionati = [];
                                              e.forEach((atleta) => {
                                                listaAtletiSelezionati.push(
                                                  atleta.value
                                                );
                                              });
                                              let iscrizioneUpdated = [
                                                ...iscrizioniGare,
                                              ];
                                              iscrizioneUpdated[index] = {
                                                atletiPartecipanti:
                                                  listaAtletiSelezionati,
                                                gara: iscrizioneUpdated[index]
                                                  .gara,
                                              };
                                              setIscrizioniGare(
                                                iscrizioneUpdated
                                              );
                                            }}
                                          />
                                        </Col>
                                      </Row>
                                    );
                                  }
                                )}

                                <Link
                                  onClick={() => {
                                    ContIscrizioni.style.display = "none";
                                  }}
                                >
                                  {" "}
                                  Nascondi dettagli iscrizioni
                                </Link>
                              </>
                            )}
                          </Container>

                          <button
                            className="btn btn-outline-light btn-lg px-5 mt-4"
                            onClick={() => {
                              iscrizioniGare.forEach((iscrizione) => {
                                gareCorse.forEach((gara) => {
                                  if (iscrizione.gara.tipo === gara) {
                                    iscrizioneGaraFetch(
                                      {
                                        garaCorsa: iscrizione.gara,
                                        atletiPartecipanti:
                                          iscrizione.atletiPartecipanti,
                                      },
                                      true
                                    );
                                  }
                                });
                                gareConcorsi.forEach((gara) => {
                                  if (iscrizione.gara.tipo === gara) {
                                    iscrizioneGaraFetch(
                                      {
                                        garaConcorso: iscrizione.gara,
                                        atletiPartecipanti:
                                          iscrizione.atletiPartecipanti,
                                      },
                                      false
                                    );
                                  }
                                });
                              });
                            }}
                          >
                            Conferma iscrizioni
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

export default IscrizioniGare;
