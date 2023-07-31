import { configureStore } from "@reduxjs/toolkit";
import InfoReducer from "../reducers/SalvaInfoUtente";

const store=configureStore({
    reducer:InfoReducer
})

export default store