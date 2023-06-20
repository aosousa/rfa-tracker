export class DateUtils {
    /**
     * Convert a number of seconds to HH:mm:ss format
     * @param {number} seconds Number of seconds
     * @returns Seconds in HH:mm:ss format
     */
    static secondsToReadableFormat(seconds: number): string {
        return new Date(seconds * 1000).toISOString().slice(11, 19);
    }

    /**
     * Convert an HH:mm:ss string to its equivalent number of seconds
     * @param {string} hms HH:mm:ss string
     * @returns Hms equivalent in number of seconds
     */
    static hmsToSeconds(hms: string): number {
        const splitHms = hms.split(":");
        return Number(splitHms[0]) * 3600 + Number(splitHms[1]) * 60 + Number(splitHms[2]);
    }
}