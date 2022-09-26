import { FETCH_USERS_FAILURE, FETCH_USERS_REUEST, FETCH_USERS_SUCCESS } from "./types"
import axios from 'axios'

export const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REUEST
    }
}

export const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    }
}

export const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error,
    }
}

export const fetchUsers = (category) => {
    return (dispatch) => {
        dispatch(fetchUserRequest)
        axios
            .get(`https://swapi.dev/api/${category}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchUserSuccess(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchUsersFailure(errMsg))
            })
    }
}