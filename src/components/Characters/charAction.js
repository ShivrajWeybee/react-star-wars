import { FETCH_CHAR_FAILURE, FETCH_CHAR_REUEST, FETCH_CHAR_SUCCESS, FETCH_CHAR_RELATED } from "../../redux/types"
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
    }
}

export const fetchCharFailure = (error) => {
    return {
        type: FETCH_CHAR_FAILURE,
        payload: error,
    }
}

export const fetchCharRelated = (relatedData) => {
    return {
        type: FETCH_CHAR_RELATED,
        payload: relatedData
    }
}

export const fetchUsers = (charId) => {
    return (dispatch) => {
        dispatch(fetchCharRequest)
        axios
            .get(`https://swapi.dev/api/people/${charId}/`)
            .then(res => {
                const users = res.data
                dispatch(fetchCharSuccess(users))
                dispatch(fetchCharRelated(users))
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(fetchCharFailure(errMsg))
            })
    }
}