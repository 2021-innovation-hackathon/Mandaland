export const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"]

export const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const leapYearMonthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const yearMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export const getMonthDays = (date) => {
    if (date.getFullYear() % 4 === 0) {
        return leapYearMonthDays
    } else {
        return yearMonthDays
    }
}
