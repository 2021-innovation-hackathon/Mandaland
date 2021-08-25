import axios from "axios"

export default axios.create({
    baseURL: process.env.REACT_APP_BACK_SERVER,
    headers: {
        "Content-Type": "application/json",
    },
})
