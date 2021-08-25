import { CREATE_LOG, FETCH_LOG, FETCH_MONTH_LOG } from "../type"

const INITIAL_STATE = {
    id: null,
    userId: null,
    mandalId: null,
    checks: null,
    date: null,
    year: null,
    month: null,
    day: null,
    monthLog: [],
}

const logReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_LOG:
            return { ...state, ...action.payload }
        case CREATE_LOG:
            return { ...state, ...action.payload }
        case FETCH_MONTH_LOG:
            return { ...state, monthLog: action.payload }
        default:
            return state
    }
}

export default logReducers
