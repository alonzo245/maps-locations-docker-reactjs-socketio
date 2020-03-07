import React, { createContext, useReducer, useEffect } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'
import io from 'socket.io-client';

//Initiallization
const initialState = {
    locations: [],
    defaultCenter: {},
    error: null,
    loading: true
}

//Create context
export const GlobalContext = createContext(initialState)

//Provider
export const GlobalProvider = ({ children }) => {
    const url = `http://localhost:3001`
    const socket = io(url);
    const [state, dispatch] = useReducer(AppReducer, initialState)

    useEffect(() => {
        streamLocations()
    }, [state.locations])

    //Actions
    function streamLocations() {
        socket.on("locations", locations => {
            dispatch({
                type: 'GET_LOCATIONS',
                payload: locations
            })
            socket.close()
        });
    }

    async function getLocations() {
        try {
            const res = await axios.get(`${url}/api/v1/locations/get-default-locations`)
            dispatch({
                type: 'GET_LOCATIONS',
                payload: res.data.data
            })

        } catch (err) {
            dispatch({
                type: 'LOCATIONS_ERROR',
                payload: err.response
            })
        }
    }

    async function getDefaultCenter() {
        try {
            const res = await axios.get(`${url}/api/v1/locations/get-default-center`)
            dispatch({
                type: 'GET_DEFAULT_CENTER',
                payload: res.data.data
            })

        } catch (err) {
            dispatch({
                type: 'LOCATIONS_ERROR',
                payload: err.response.error
            })
        }
    }

    return (<GlobalContext.Provider value={{
        loading: state.loading,
        error: state.error,
        locations: state.locations,
        defaultCenter: state.defaultCenter,
        getLocations,
        getDefaultCenter,
        streamLocations
    }}>
        {children}
    </GlobalContext.Provider>)
}