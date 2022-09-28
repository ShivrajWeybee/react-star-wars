import { FETCH_STARSHIP_FAILURE, FETCH_STARSHIP_REUEST, FETCH_STARSHIP_SUCCESS } from "../../redux/types"

const initialState = {
    loading: true,
    error: '',
    users: []
}

const starshipReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STARSHIP_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_STARSHIP_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_STARSHIP_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }

        default: return state
    }
}

export default starshipReducer