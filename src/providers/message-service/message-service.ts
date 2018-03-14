import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Message} from "../../model/message";

/*
  Generated class for the MessageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MessageServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MessageServiceProvider Provider');
  }

  sendMessage(message: Message, sessionId: number, userId: number): Observable<any>{
    const body = JSON.stringify(message);
    return this.http.post('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + sessionId + '/messages' , body , httpOptions);
  }

  getMessages(sessionId: number, userId: number): Observable<any>{
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + sessionId + '/messages');
  }

}
