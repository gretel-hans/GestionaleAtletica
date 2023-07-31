export const SALVA_INFO="SALVA_INFO"

const InitialState={
    UserInfo:[]
}

const InfoReducer=(state=InitialState, action)=>{
    switch(action.type){
        case SALVA_INFO:
        return{
            UserInfo:action.payload
        }
        default: return state
    }
}

export default InfoReducer