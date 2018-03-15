import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {UserserviceProvider} from "../../providers/userservice/userservice";
import {UseridStorage} from "../../sessionStorage/userid-storage";
import {User} from "../../model/user";
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
  userId: number;
  currentPass: string;
  //user= [];
  public user: User = {
    'id': 0,
    'email': '',
    'lastname': '',
    'firstname': '',
    'username': 'No user found',
    'password': '',
  };
  pwHash: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider,
              private userservice: UserserviceProvider,
              private useridStorage: UseridStorage) {
    this.userservice.getUser(this.useridStorage.getUserId()).subscribe(
      data => {
        this.user = data;
        this.pwHash = this.user.password;
        this.user.password = '';
        this.userId = this.useridStorage.getUserId();
        console.log(data);
        console.log(this.user);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  updateUser() {
      if (this.user.password === '') {
        this.user.password = this.pwHash;
      }
      //if (this.user.username === '' || this.user.firstname === '' || this.user.lastname === '' || this.user.email === '') {
        this.userservice.updateUser(this.user, this.userId).subscribe(
          data => {
            if (data !== null) {
              this.user = data;
              this.navCtrl.setRoot(SettingsPage);
            }
          }
        )
      //}
  }

  updatePassword () {
    if (this.user.password === '') {
      this.user.password = this.pwHash;
    }

  }

  logForm() {
    console.log(this.account);
  }




}
