import { FETCH_VEHICLE_FAILURE, FETCH_VEHICLE_REUEST, FETCH_VEHICLE_SUCCESS, FETCH_VEHICLE_RELATED } from "../../redux/types"

const initialState = {
    loading: true,
    error: '',
    users: [],
    related: []
}

const vehicleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VEHICLE_REUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_VEHICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: '',
            }

        case FETCH_VEHICLE_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload,
            }

        case FETCH_VEHICLE_RELATED:
            return {
                ...state,
                loading: false,
                related: [...state.related, action.payload]

            }

        default: return state
    }
}

export default vehicleReducer