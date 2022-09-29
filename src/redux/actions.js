import { FETCH_CHAR_FAILURE, FETCH_CHAR_REUEST, FETCH_CHAR_SUCCESS } from "./types"
import axios from 'axios'

export const fetchCharRequest = () => {
    return {
        type: FETCH_CHAR_REUEST
    }
}

export const fetchCharSuccess = (users) => {
    return {
        type: FETCH_CHAR_SUCCESS,
        payload: users,
        page: Math.floor(users.count / 10) + 1,
    }
}

export const fetchCharFailure = (error) => {
    return {
        type: FETCH_CHAR_FAILURE,
        payload: error,
    }
}

export const fetchUsersComman = (category) => {
    return (dispatch) => {
        dispatch(fetchCharRequest)
        axios
            .get(`https://swapi.dev/api/${category}/`)
            .then(res => {
                console.log(res.data)
                const users = res.data
                dispatch(fetchCharSuccess(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchCharFailure(errMsg))
            })
    }
}