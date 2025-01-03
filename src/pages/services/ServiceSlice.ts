import {Service} from "../../app/models/Service.ts";
import {createSlice} from "@reduxjs/toolkit";
export interface ServiceState {
    services : Service[];
    filteredServices : Service[];
    loading: boolean;
    error: string | null;
}

const initialState: ServiceState = {
    services : [],
    filteredServices : [],
    loading: false,
    error: null
}

// const serviceSlice = createSlice({
//     name : 'services',
//     initialState: initialState,
//     reducers: {
//         // setServices
//
//     },
// })