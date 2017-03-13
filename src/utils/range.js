const range = (end, start = 1, step = 1) => {
    const array = [];
    for ( let i = start; i <= end; i += step) {
        array.push(i)
    }
    return array
}

export default range