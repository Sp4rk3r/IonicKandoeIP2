import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SessionDonePage } from './session-done';

@NgModule({
  declarations: [
    SessionDonePage,
  ],
  imports: [
    IonicPageModule.forChild(SessionDonePage),
  ],
})
export class SessionDonePageModule {}
