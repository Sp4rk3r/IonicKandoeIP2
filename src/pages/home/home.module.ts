/**
 * Created by koenr on 21-2-2018.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HomePage} from "./home";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {SessionDonePage} from "../session-done/session-done";
import {SessionDonePageModule} from "../session-done/session-done.module";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    SessionDonePageModule,
    IonicPageModule.forChild(HomePage),
  ],
  entryComponents: [
    SessionDonePage,
  ]
})
export class HomePageModule {}
