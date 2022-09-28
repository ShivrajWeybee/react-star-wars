import { FETCH_CHAR_FAILURE, FETCH_CHAR_REUEST, FETCH_CHAR_SUCCESS } from "../../redux/types"

const initialState = {
    loading: true,
    error: '',
    users: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHAR_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_CHAR_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_CHAR_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }

        default: return state
    }
}

export default reducer