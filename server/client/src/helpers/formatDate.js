export const formatDate = date => {
    const dayAndTime = date.toString().split('T');
    const time = dayAndTime[1].split('.');
    const hhmmss = time[0].split(':');
    return `${dayAndTime[0]} at ${hhmmss[0]}:${hhmmss[1]}`;
}