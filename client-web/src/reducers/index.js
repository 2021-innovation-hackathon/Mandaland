import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import userReducers from "./userReducers"
import mandalReducers from "./mandalReducers"
import logReducers from "./logReducers"
import mandalartsReducers from "./mandalartsReducers"
import friendinfoReducers from "./friendinfoReducers"

export default combineReducers({
    user: userReducers,
    mandal: mandalReducers,
    log: logReducers,
    mandalarts: mandalartsReducers,
    form: formReducer,
    friends: friendinfoReducers,
})
