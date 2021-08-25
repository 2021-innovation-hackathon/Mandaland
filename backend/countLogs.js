const countLogsByDay = (checks) => {
    // checks는 9*9 2차원 array
    const rowCount = checks.map((row) => row.filter((e) => e === 1).length)
    return rowCount.reduce((acc, cur) => acc + cur)
}

module.exports = countLogs = {
    countLogsByDay,
}
