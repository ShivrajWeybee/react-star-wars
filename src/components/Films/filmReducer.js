import { FETCH_FILM_FAILURE, FETCH_FILM_REUEST, FETCH_FILM_SUCCESS } from "../../redux/types"

const initialState = {
    loading: true,
    error: '',
    users: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FILM_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_FILM_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_FILM_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }

        default: return state
    }
}

export default reducer