
function timeStampToDateTime(timestamp) {
    if (!timestamp)
        return '';
    const date = new Date(timestamp);
    const day = "0" + date.getDate();
    const month = "0" + (date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = "0" + date.getHours();
    const minutes = "0" + date.getMinutes();

    return `${day.substr(-2)}/${month.substr(-2)}/${year} ${hours.substr(-2)}:${minutes.substr(-2)}`
}

function dateTimeToTimeStamp(dateTime) {
    return new Date(dateTime).getTime();
}

module.exports = {
    timeStampToDateTime,
    dateTimeToTimeStamp
}