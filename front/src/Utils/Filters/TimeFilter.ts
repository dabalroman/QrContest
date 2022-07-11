export default function filterTimeHoursMinutes (date: Date) {
    const [year, month, day, hours, minutes] = [
        String(date.getUTCFullYear()).slice(2),
        String(date.getUTCMonth()).padStart(2, '0'),
        String(date.getUTCDate()).padStart(2, '0'),
        String(date.getHours()).padStart(2, '0'),
        String(date.getMinutes()).padStart(2, '0')
    ];

    return `${hours}:${minutes} ${day}/${month}`;
}
