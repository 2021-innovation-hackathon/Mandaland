export const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"]

export const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Decr"]

const leapYearMonthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const yearMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export const getMonthDays = (date) => {
    if (date.getFullYear() % 4 === 0) {
        return leapYearMonthDays
    } else {
        return yearMonthDays
    }
}
