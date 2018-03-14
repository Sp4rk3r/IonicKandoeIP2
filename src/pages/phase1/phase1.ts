import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Session} from "../../model/session";
import {SessionsProvider} from "../../providers/sessions/sessions";
import {UseridStorage} from "../../sessionStorage/userid-storage";
import {CardserviceProvider} from "../../providers/cardservice/cardservice";
import {MenuPage} from "../menu/menu";

/**
 * Generated class for the Phase1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phase1',
  templateUrl: 'phase1.html',
})
export class Phase1Page {

  public userId;
  public sessionId;
  public session = new Session(0, '', 0, 0, 0, 0, 0, [''], [0], 0, [0], 0, false);
  public cards = [];
  public selectedCards = [];
  public buttonStates = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private sessionService: SessionsProvider,
              private userIdStorage: UseridStorage,
              private cardService: CardserviceProvider) {
    this.userId = this.userIdStorage.getUserId();
    this.sessionId = this.navParams.get("sessionId");
    this.sessionService.getSession(this.sessionId,this.userId).subscribe(
      data => {
        this.session = data;
      },
      error => {
        alert("Error loading session");
      }, () => {
        this.cardService.getCardsByCategory(this.session.categoryId, this.session.themeId, this.userId).subscribe(
          data => {
            this.cards = data;
          },
          error => {
            alert("Error loading cards");
          }, () => {
            this.fillButtonStates();
          }
        )
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Phase1Page');
  }

  private fillButtonStates() {
    for (const card of this.cards) {
      this.buttonStates.push(false);
    }
  }

  selectCard(card, index) {
    this.selectedCards.push(card);
    this.buttonStates[index] = true;
  }

  deselectCard(card, index) {
    let cardIndex = this.selectedCards.indexOf(card);
    if (cardIndex > -1) {
      this.selectedCards.splice(cardIndex, 1);
    }
    this.buttonStates[index] = false;
  }

  saveCardsIds() {
    this.sessionService.saveSessionCards(this.selectedCards, this.session.id, this.userId).subscribe(
      data => {
        this.navCtrl.setRoot(MenuPage);
      }
    )
  }
}
