
const padding = (str, length =2, char = '0') => `${new Array(length).join(char)}${str}`.slice(-length)

export default (value, format = 'YYYY-MM-DD hh:mm') => {
    const time  = new Date(value);
    const year  = time.getFullYear();
    const month = time.getMonth() +1;
    const date = time.getDate();
    const hour = time.getHours();
    const min = time.getMinutes();

    const formated = format.replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', date)
        .replace('hh', padding(hour))
        .replace('mm', padding(min))

    return formated
}