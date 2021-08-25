import { GET_USERLIST } from "../type"

const userlistReducers = (state = [], action) => {
    switch (action.type) {
        case GET_USERLIST:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default userlistReducers
