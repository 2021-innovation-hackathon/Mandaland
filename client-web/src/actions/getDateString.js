const date = new Date()
let month = date.getMonth() + 1
let day = date.getDate()
if (month < 10) month = "0" + month.toString()
if (day < 10) day = "0" + day.toString()
const dateString = date.getFullYear().toString() + month + day
export const getDateString = () => {
    return dateString
}
export const getYear = () => date.getFullYear()
export const getMonthIndex = () => date.getMonth()
export const getMonth = () => month
export const getDate = () => day
