import dateJump from './date-jump';

export default (timeStamp) => {
    const millisecondsOfOneDay = new Date(2017, 0, 2).getTime() - new Date(2017, 0, 1).getTime();
    const day = new Date(timeStamp).getDay();
    const start = timeStamp - (day ? day -1 : 6) * millisecondsOfOneDay;
    const end = dateJump(start, 6);

    return  [start, end];
}