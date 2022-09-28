import { FETCH_SPECIES_FAILURE, FETCH_SPECIES_REUEST, FETCH_SPECIES_SUCCESS } from "../../redux/types"

const initialState = {
    loading: true,
    error: '',
    users: []
}

const speciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SPECIES_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_SPECIES_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_SPECIES_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }

        default: return state
    }
}

export default speciesReducer