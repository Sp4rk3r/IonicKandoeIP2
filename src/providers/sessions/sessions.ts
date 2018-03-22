import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Session} from "../../model/session";
import {SessionState} from "../../model/SessionState";
import {JwtHelper} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import {SessionCard} from "../../model/sessionCard";

/*
  Generated class for the SessionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable()
export class SessionsProvider {
  sessions: Session[] = [];
  jwtHelper: JwtHelper = new JwtHelper();
  accesToken: string;


  constructor(private http: HttpClient) {
    console.log('Hello SessionsProvider Provider');
    /*let sessions = [
      {id: 1, name: 'Vakantie 2018', themeId: 1 ,maxCards: 15, totalRounds: 5, categoryId: 6, timeForMove: 15, SessionState: SessionState.NOT_STARTED },
      {id: 1, name: 'Uitstappen Italië', themeId: 2 ,maxCards: 20, totalRounds: 10, categoryId: 5, timeForMove: 20, SessionState: SessionState.NOT_STARTED },
      {id: 1, name: 'Bezoek Bars Madrid', themeId: 3 ,maxCards: 16, totalRounds: 15, categoryId: 2, timeForMove: 10, SessionState: SessionState.ENDED },
      {id: 1, name: 'Laptops voor werknemer', themeId: 1 ,maxCards: 15, totalRounds: 5, categoryId: 6, timeForMove: 15, SessionState: SessionState.NOT_STARTED },
    ];*/
  }

  /*query(params?: any) {
    if (!params) {
      return this.sessions;
    }
    return this.sessions;
  }
*/
  getSessions(userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId +'/sessions');
  }

  getThemeOfSession(themeId: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId);
  }

  getSessionsOfUser(userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions');
  }

  updateSession(session: Session, userId: number): Observable<any> {
    const body = JSON.stringify(session);
    console.log('user id: ' + userId);
    console.log('json body:' + body);
    return this.http.put('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + session.id, body, httpOptions);
  }

  getSession(id: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + id);
  }

  saveSessionCards(cardIds: number[], sessionId: number ,userId: number): Observable<any> {
    const body = JSON.stringify(cardIds);
    return this.http.post('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + sessionId + '/saveCards', body, httpOptions);
  }

  saveSelectedCard(selectedCard: SessionCard, sessionId: number, userId: number): Observable<any> {
    const body = JSON.stringify(selectedCard);
    return this.http.put('http://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + sessionId + '/sessionCards/' + selectedCard.id, body, httpOptions);
  }
}




