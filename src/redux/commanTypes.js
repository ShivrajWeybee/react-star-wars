import { FETCH_API_REUEST, FETCH_API_SUCCESS, FETCH_API_FAILURE } from "./types";
import axios from "axios";

export const fetchApiRequest = () => {
    return {
        type: FETCH_API_REUEST
    }
}

export const fetchApiSuccess = (apiData) => {
    return {
        type: FETCH_API_SUCCESS,
        payload: apiData,
    }
}

export const fetchApiFailure = (error) => {
    return {
        type: FETCH_API_FAILURE,
        payload: error,
    }
}

export const fetchApis = (category) => {
    return (dispatch) => {
        dispatch(fetchApiRequest)
        axios
            .get(`https://swapi.dev/api/${category}/`)
            .then(res => {
                const apiData = res.data;
                const page = Math.floor(apiData.results.count / 10) + 1
                dispatch(fetchApiSuccess(apiData))
            })
            .catch(error => {
                const errMsg = error;
                dispatch(fetchApiFailure(errMsg))
            })
    }
}