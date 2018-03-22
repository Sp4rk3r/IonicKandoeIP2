import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {SessionsProvider} from "../../providers/sessions/sessions";
import {CardserviceProvider} from "../../providers/cardservice/cardservice";
import {UseridStorage} from "../../sessionStorage/userid-storage";
import {Session} from "../../model/session";
import {ChatPage} from "../chat/chat";

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {SessionCard} from "../../model/sessionCard";
import {LoginPage} from "../login/login";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the Phase2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phase2',
  templateUrl: 'phase2.html',
})
export class Phase2Page implements OnChanges{
  ngOnChanges(changes: SimpleChanges): void {

  }

  public sessionId;
  public userId;
  public session = new Session(0, '', 0, 0, 0, 0, 0, [''], [''], [], [], 0, [], null, false, new Date(), false, 0,  0);
  public cards = [];
  @Input() sessionCards;
  public isMyTurn = true;
  public index;

  public selectedCard = new SessionCard(null, '', '', '', 0, 0, 0, 0);


  private stompClient;
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private sessionService: SessionsProvider,
              private userIdStorage: UseridStorage,
              private cardService: CardserviceProvider,
              private popoverCtrl: PopoverController,
              private auth: AuthServiceProvider) {
    this.sessionId = this.navParams.get("sessionId");
    this.userId = this.userIdStorage.getUserId();
    //alert(this.userId);

    this.sessionService.getSession(this.sessionId, this.userId).subscribe(
      data => {
        this.session = data;
        //alert(this.session.themeId);
        //alert(this.session.categoryId);
      },
      error => {
        alert("Error loading session");
      }, () => {
        this.cardService.getCardsByCategory(this.session.categoryId, this.session.themeId, this.userId).subscribe(
          data => {
            this.cards = data;
            console.log(data);
            //alert(this.cards);
          },
          error => {
            alert("Error loading cards");
          }
        )
      }
    );
    this.initializeWebSocketConnection(this.sessionId, this.userId, this);
  }

  openMondal(sessionId: number) {
    /*let popover = this.popoverCtrl.create(ChatPage, {}, {cssClass: 'chat-popover'});
    popover.present({ev});
    let ev = {
      target : {
        getBoundingClientRect : () => {
          return {
            top: '60',
            left: '5'
          };
        }
      }
    };*/
    this.navCtrl.push(ChatPage, {
      sessionIdParam : sessionId,
    });
  }

  confirmMoveCard() {
    console.log(this.selectedCard.name);
    this.sessionService.saveSelectedCard(this.selectedCard, this.sessionId, this.userIdStorage.getUserId()).subscribe(
      data => {
        this.stompClient.send('app/send/sessionCard/' + this.sessionId, [], this.selectedCard.id + ';' + data);
      }
    );
    this.isMyTurn = true;
  }

  selectCard(sessionCard, i) {
    this.selectedCard = sessionCard;
    this.index = i;
    console.log('Kaart is: '+sessionCard);
    console.log('Kaartnaam: ' + sessionCard.name);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Phase2Page');
  }

  private initializeWebSocketConnection(sessionId: number, userId: number, param3: this) {
    console.log('completed + sessionID: ' + this.sessionId );
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/cards/'+ sessionId, (cardid) => {
        if (cardid.body) {
          if (cardid.body.toString() === 'finished') {
            alert("early finished")
          } else {
            let selectedCardId = Number(cardid.body.toString().split(';')[0]);
            if (!(cardid.body.toString().split(';')[1] === '-11')) {
              let currentUserId = Number(cardid.body.toString().split(';')[1]);
              alert('Priority verhoogd');
              alert('setCards');
              if (currentUserId === userId) {
                alert('myturn is false');
              }
            } else {
              alert('increasepriotiry');
              alert('winningcards');
              alert('gameover');
            }
          }
        }
      })
    })
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }
}
