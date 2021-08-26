import { SAVE_LAND, FETCH_LAND } from "../type"

const landReducers = (state = [], action) => {
    switch (action.type) {
        case SAVE_LAND:
            return { ...state }
        case FETCH_LAND:
            return { ...state, land: action.payload.land, count: action.payload.nOfCount }
        default:
            return state
    }
}

export default landReducers
