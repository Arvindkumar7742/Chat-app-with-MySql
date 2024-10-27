export const formatDateTime=(isoString)=> {
    const date = new Date(isoString);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    return date.toLocaleDateString('en-US', options) + " ";
}
