import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, Loading, AlertController, LoadingController} from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import {HomePage} from "../home/home";
import {MenuPage} from "../menu/menu";
import {UserserviceProvider} from '../../providers/userservice/userservice'
import {TokenStorage} from "../../sessionStorage/token-storage";
import {UseridStorage} from "../../sessionStorage/userid-storage";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//Username : KoenKandoe pw: KoenPass

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [TokenStorage, UseridStorage, AuthServiceProvider]
})
export class LoginPage implements OnInit {
  ngOnInit(): void {
  }
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  error = '';
  redirectUrl: string;
  usernametext: string;
  passwordtext: string;

  private userUrl = 'api/users';

  constructor(public nav: NavController,
              private auth: AuthServiceProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private userservice: UserserviceProvider,
              private tokenStorage: TokenStorage,
              private userIdStorage: UseridStorage) {
  }

  public createAccount() {
    this.nav.setRoot('RegisterPage');
  }

  /*public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          this.nav.setRoot(MenuPage); //HomePage
        } else
         {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
  }

  login2() {
    this.showLoading();

    this.auth.login2(this.registerCredentials.email, this.registerCredentials.password)
      .subscribe(result => {
        if (result) {
          this.userservice.login(result);
          this.navigateAftherSucces();
        }
        else {
          this.error = 'Username or password is ncorrect';
        }
      },
        error => {
        this.error = 'Username or Password is incorrect!';

        }
      )
  }*/

  login3(): void {
    this.auth.login2(this.usernametext, this.passwordtext).subscribe(
      data => {
        this.tokenStorage.saveToken(data.authToken);
        this.userIdStorage.saveUserId(data.userId);
        this.userIdStorage.saveUsername(data.username);
        this.nav.setRoot(MenuPage);
      },
      error => {
        console.log('Error logging in!');
        console.log(this.error);
        alert('Unable to login');
      }
    );
  }

  navigateAftherSucces() {
    if (this.redirectUrl) {
      this.nav.setRoot(this.redirectUrl);
    } else {
      this.nav.setRoot(LoginPage);
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
