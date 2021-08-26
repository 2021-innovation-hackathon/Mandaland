const countLogsByDay = (checks) => {
    // checks는 9*9 2차원 array
    const rowCount = checks.map((row) => row.filter((e) => e === 1).length)
    return rowCount.reduce((acc, cur) => acc + cur)
}

const countLogsOfUser = (allChecks) => {
    console.log(allChecks)
    if (allChecks.length === 0) return 0
    const everyDayCheckCounts = allChecks.map((checksOfDay) => countLogsByDay(checksOfDay.checks))
    return everyDayCheckCounts.reduce((acc, cur) => acc + cur)
}

module.exports = countLogs = {
    countLogsByDay,
    countLogsOfUser,
}
