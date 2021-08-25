const axios = require("axios")

const db = axios.create({
    baseURL: "http://localhost:4001",
})

module.exports = db
