export function parseCookieString(cookie: string, name: string): string | null {
    name = name + "=";
    const cookies = cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const currentCookie = cookies[i].trim();
        if (currentCookie.indexOf(name) == 0) return currentCookie.substring(name.length, currentCookie.length);
    }
    return null;
}
