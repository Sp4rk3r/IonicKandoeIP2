import { Injectable } from "@angular/core";

const USER_ID = 'UserId';
const USER_NAME='Username';

@Injectable()
export class UseridStorage {
  public saveUserId(userId: number) {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, userId.toString());
  }

  public getUserId(): number {
    return Number(sessionStorage.getItem(USER_ID));
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USER_NAME);
  }
}
