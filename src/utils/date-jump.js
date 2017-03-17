export default (timeStamp, step) => {
    const millisecondsOfOneDay = new Date(2017, 0, 2).getTime() - new Date(2017, 0, 1).getTime();
    return new Date(timeStamp + step * millisecondsOfOneDay).getTime();
}