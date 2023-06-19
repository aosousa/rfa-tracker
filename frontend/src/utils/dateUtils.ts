export class DateUtils {
    /**
     * Convert a number of seconds to HH:mm:ss format
     * @param {number} seconds Number of seconds
     * @returns Seconds in HH:mm:ss format
     */
    static secondsToReadableFormat(seconds: number): string {
        return new Date(seconds * 1000).toISOString().slice(11, 19);
    }
}