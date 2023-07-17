import NavbarAthletix from "../HomePage/NavbarAthletix"

const RicercaEvento=(props)=>{
    return (
        <>
              {(sessionStorage.getItem("username") === null ||
        sessionStorage.getItem("username") === "null") && (
        <div>
          Non sei loggato per accedere ai contenuti esegui il login o
          registrati!
        </div>
      )}

{(sessionStorage.getItem("username") !== null ||
        sessionStorage.getItem("username") !== "null") &&(
            <>
            <NavbarAthletix/>
            Benvenuto nella sezione di ricerca degli eventi
            </>
        )}

        </>
    )
}

export default RicercaEvento