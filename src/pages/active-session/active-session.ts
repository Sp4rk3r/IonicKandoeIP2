import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Session} from "../../model/session";

/**
 * Generated class for the ActiveSessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-active-session',
  templateUrl: 'active-session.html',
})
export class ActiveSessionPage {
  themaNaam: string;
  themaDesc: string;
  sessions: Session[];


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthServiceProvider) {
    this.themaNaam = this.navParams.get("themaNaam");
    this.themaDesc = this.navParams.get("themaDesc");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActiveSessionPage');
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }



}
