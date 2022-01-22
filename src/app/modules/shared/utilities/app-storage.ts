export class AppStorage {
  constructor() {}

  static getTokenData(dataKey: string): string {
    // const token = localStorage.getItem(dataKey);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(currentUser){
      return currentUser.token;
    }
    return null;
    // return token ? decodeURIComponent(atob(token)) : '';
  }

  static storeTokenData(dataKey: string, data: any) {
    localStorage.setItem(dataKey, btoa(encodeURIComponent(data)));
  }
}
