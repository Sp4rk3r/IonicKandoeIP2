import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {ChatPage} from "../chat/chat";
import {UserserviceProvider} from "../../providers/userservice/userservice";
import {UseridStorage} from "../../sessionStorage/userid-storage";
import {SessionsProvider} from "../../providers/sessions/sessions";

/**
 * Generated class for the SessionDonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-session-done',
  templateUrl: 'session-done.html',
})
export class SessionDonePage {
  username: string;
  email: string;
  user = [];
  public oldSessions = [];
  public pastSessions = [];

  constructor(private auth: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
              private userservice: UserserviceProvider,
              private useridStorage: UseridStorage,
              private sessionService: SessionsProvider) {
    this.userservice.getUser(this.useridStorage.getUserId()).subscribe(
      data => {
        this.user = data;
        console.log(data);
        console.log(this.user);
        //this.userarray = data.toString();
      }
    );
    this.sessionService.getSessionsOfUser(this.useridStorage.getUserId()).subscribe(
      data => {
        this.oldSessions = data;
      }
    );
    for (const session of this.oldSessions) {
      if (session.state === 4) {
        this.pastSessions.push(session);
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionDonePage');
  }

  GoToSessionActive() {
    this.navCtrl.setRoot(HomePage)
  }

  openMondal() {
    let popover = this.popoverCtrl.create(ChatPage, {}, {cssClass: 'chat-popover'});
    popover.present();
  }



}
