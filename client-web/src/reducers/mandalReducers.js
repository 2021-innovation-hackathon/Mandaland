import { CREATE_MANDAL, EDIT_MANDAL, FETCH_MANDAL } from "../type"

const mandalReducers = (state = [], action) => {
    switch (action.type) {
        case FETCH_MANDAL:
            return { ...state, [action.payload.mandal.id]: action.payload }
        case CREATE_MANDAL:
            return { ...state, [action.payload.mandal.id]: action.payload }
        case EDIT_MANDAL:
            return { ...state, [action.payload.mandal.id]: action.payload }
        default:
            return state
    }
}

export default mandalReducers
