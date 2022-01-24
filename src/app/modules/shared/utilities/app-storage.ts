import { UserModel } from "../models/user.model";

export class AppStorage {
  constructor() {
  }

  static getTokenData(dataKey: string): string {
    const token = JSON.parse(localStorage.getItem(dataKey));
    return token ? token : '';
  }

  static storeTokenData(dataKey: string, data: any) {
    // localStorage.setItem(dataKey, btoa(encodeURIComponent(data)));
    localStorage.setItem(dataKey, JSON.stringify(data));
  }

  static getCurrentUser(dataKey: string): UserModel {
    const user = JSON.parse(localStorage.getItem(dataKey));
    return user ? user : '';
  }

  static storeCurrentUser(dataKey: string, data: any) {
    localStorage.setItem(dataKey, JSON.stringify(data));
  }

  static removeItem(datakey: string){
    localStorage.removeItem(datakey);
  }
}


