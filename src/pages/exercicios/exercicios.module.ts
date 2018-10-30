import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExerciciosPage } from './exercicios';

@NgModule({
  declarations: [
    ExerciciosPage,
  ],
  imports: [
    IonicPageModule.forChild(ExerciciosPage),
  ],
})
export class ExerciciosPageModule {}
