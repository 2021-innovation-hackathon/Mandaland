export const calculateColor = (score) => {
    if (score === 0) return "#ffffff"
    else {
        const opacity = score / 64 < 1 ? score / 64 : 1
        return `rgba(240, 103, 86, ${opacity})`
    }
}
