import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {UserserviceProvider} from "../../providers/userservice/userservice";
import {UseridStorage} from "../../sessionStorage/userid-storage";
//import { ImagePicker } from '@ionic-native/image-picker';
//import { GalleryPage } from '../gallery/gallery';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  username: string;
  email: string;
  account= {};
  user= [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider,
              private userservice: UserserviceProvider,
              private useridStorage: UseridStorage) {
    this.userservice.getUser(this.useridStorage.getUserId()).subscribe(
      data => {
        this.user = data;
        console.log(data);
        console.log(this.user);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logForm() {
    console.log(this.account);
  }




}
