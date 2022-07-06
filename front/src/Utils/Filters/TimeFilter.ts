export function filterTimeHoursMinutes (date: Date) {
    const [hours, minutes] = [date.getHours(), date.getMinutes()];

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function filterDurationMs (durationMs: number): string {
    const durationInTenthsOfASecond: number = Math.ceil(durationMs / 100);
    const tenthsOfMs: number = durationInTenthsOfASecond % 10;

    const durationLeftSeconds: number = (durationInTenthsOfASecond - tenthsOfMs) / 10;
    const s: number = durationLeftSeconds % 60;

    const durationLeftMinutes: number = (durationLeftSeconds - s) / 60;
    const m: number = durationLeftMinutes % 60;

    const h: number = (durationLeftMinutes - m) / 60;

    const hText: string = (h > 0) ? `${h}:` : '';
    const mText: string = String(m);
    const sText: string = String(s).padStart(2, '0');
    const msText: string = String(tenthsOfMs).padStart(1, '0');

    return `${hText}${mText}:${sText}.${msText}`;
}
