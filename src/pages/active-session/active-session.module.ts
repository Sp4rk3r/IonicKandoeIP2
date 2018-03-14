import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveSessionPage } from './active-session';

@NgModule({
  declarations: [
    ActiveSessionPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiveSessionPage),
  ],
})
export class ActiveSessionPageModule {}
