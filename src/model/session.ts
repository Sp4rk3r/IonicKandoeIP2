import {SessionState} from "./SessionState";

export class Session {
  constructor(public id: number,
              public name: string,
              public themeId: number,
              public maxCards: number,
              public totalRounds: number,
              public categoryId: number,
              public timeForMove: number,
              public participants: string[],
              public participantIds: number[],
              public type: number,
              public sessionCardIds: number[],
              public state: number,
              public userSubmitted: boolean) {
  }
}
