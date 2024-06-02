export default class CookieManager {
  static set(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 1000 * 60);
    const expire = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expire};path=/;`;
  }

  static delete(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path/;`;
  }

  static get(cname: string): string | undefined {
    let name = cname + "=";
    let decodedCookie = decodeURI(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return undefined;
  }
}
