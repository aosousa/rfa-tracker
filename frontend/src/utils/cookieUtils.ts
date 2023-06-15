export class CookieUtils {
    /**
     * Get a cookie value by name
     * @param {string} name Name of the cookie
     * @returns Cookie value (string) if it is found, null otherwise
     */
    static getCookie(name: string): string | null {
        const cookies = document.cookie.split(';')
        let cookie: string | null = null

        for (let i = 0; i < cookies.length; i++) {
            const cookieInfo = cookies[i].trim().split('=')
            if (cookieInfo[0] === name) {
                cookie = cookieInfo[1]
                break
            }
        }

        return cookie
    }
}
