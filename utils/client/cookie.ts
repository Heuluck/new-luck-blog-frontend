export function setCookie(name: string, value: string, expireDays: number, path?: string): void {
    const day = new Date();
    day.setTime(day.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + day.toUTCString();
    document.cookie = `${name}=${value};${expires};path=${path ?? "/"}`;
}

export function getCookie(name: string): string | null {
    name = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const currentCookie = cookies[i].trim();
        if (currentCookie.indexOf(name) == 0) return currentCookie.substring(name.length, currentCookie.length);
    }
    return null;
}

/** 注意：无法删除HTTPOnly的cookie */
export function deleteCookie(name: string, path?: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path ?? "/"};`;
}
