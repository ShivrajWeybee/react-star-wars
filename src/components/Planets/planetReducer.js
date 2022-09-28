import { FETCH_PLANET_FAILURE, FETCH_PLANET_REUEST, FETCH_PLANET_SUCCESS } from "../../redux/types"

const initialState = {
    loading: true,
    error: '',
    users: []
}

const planetReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLANET_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_PLANET_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_PLANET_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }

        default: return state
    }
}

export default planetReducer