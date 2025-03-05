function changeNumber(start, step, symbol) {
    if (symbol === '*') {
        return start * step;
    } else if (symbol === '+') {
        return start + step;
    } else if (symbol === '-') {
        return start - step;
    } else {
        return start;
    }
}

export default changeNumber;