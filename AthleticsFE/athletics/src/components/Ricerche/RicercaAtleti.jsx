const RicercaAtleti=({listaAtleti})=>{
    console.log(listaAtleti)
    return(
        <>
        <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Ricerca atleti..." aria-label="Search" onChange={(e)=>{
        console.log(e.target.value)
      }}/>
      <button className="btn btn-outline-success" type="submit">Cerca</button>
    </form>
        </>
    )
}

export default RicercaAtleti