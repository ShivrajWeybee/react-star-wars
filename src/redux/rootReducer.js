import { FETCH_USERS_FAILURE, FETCH_USERS_REUEST, FETCH_USERS_SUCCESS } from "./userTypes"

const initialState = {
    loading: false,
    error: '',
    users: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }

        default: return state
    }
}

export default reducer