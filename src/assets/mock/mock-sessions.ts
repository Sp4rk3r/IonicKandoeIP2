import {Session} from "../../model/session";
import {SessionState} from "../../model/SessionState";
import {Injectable} from "@angular/core";

@Injectable()
export class Sessions {
  sessions: Session[] = [];

  constructor() {
    let sessions = [
      {id: 1, name: 'Vakantie 2018', themeId: 1 ,maxCards: 15, totalRounds: 5, categoryId: 6, timeForMove: 15, SessionState: SessionState.NOT_STARTED },
      {id: 1, name: 'Uitstappen Italië', themeId: 2 ,maxCards: 20, totalRounds: 10, categoryId: 5, timeForMove: 20, SessionState: SessionState.NOT_STARTED },
      {id: 1, name: 'Bezoek Bars Madrid', themeId: 3 ,maxCards: 16, totalRounds: 15, categoryId: 2, timeForMove: 10, SessionState: SessionState.ENDED },
      {id: 1, name: 'Laptops voor werknemer', themeId: 1 ,maxCards: 15, totalRounds: 5, categoryId: 6, timeForMove: 15, SessionState: SessionState.NOT_STARTED },
    ];

    /*for (let session of sessions) {
      this.sessions.push(new Session(session));
    }*/
  }

  query(params?: any) {
    if (!params) {
      return this.sessions;
    }
  }
}


