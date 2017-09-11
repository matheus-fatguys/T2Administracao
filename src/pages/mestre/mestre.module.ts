import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MestrePage } from './mestre';

@NgModule({
  declarations: [
    MestrePage,
  ],
  imports: [
    IonicPageModule.forChild(MestrePage),
    ComponentsModule,
  ],
})
export class MestrePageModule {}
