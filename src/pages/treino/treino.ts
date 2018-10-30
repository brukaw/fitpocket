import { WorkoutProvider } from './../../providers/auth/workout';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
//import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-treino',
  templateUrl: 'treino.html',
})
export class TreinoPage {

  treino: string;
  a: Observable<any[]>;
  b: Observable<any[]>;
  c: Observable<any[]>;
  d: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private workoutProvider: WorkoutProvider) {

      this.a = this.workoutProvider.getA();
      this.b = this.workoutProvider.getB();
      this.c = this.workoutProvider.getC();
      this.d = this.workoutProvider.getD();
  }

  newExercicio(){
    this.navCtrl.push('ExerciciosPage');
  }

  // removeExercicio(key: string){
  //   this.workoutProvider.remove(key);
  //   this.toast.create({message:'Exercicio removido com sucesso!', duration: 3000}).present();
  // }

  removeExA(exercicio: any){
    this.workoutProvider.removeA(exercicio.key);
    this.toast.create({message: 'Exercicio removido com sucesso!', duration: 3000}).present();
  }

  removeExB(exercicio: any){
    this.workoutProvider.removeB(exercicio.key);
    this.toast.create({message: 'Exercicio removido com sucesso!', duration: 3000}).present();
  }

  removeExC(exercicio: any){
    this.workoutProvider.removeC(exercicio.key);
    this.toast.create({message: 'Exercicio removido com sucesso!', duration: 3000}).present();
  }

  removeExD(exercicio: any){
    this.workoutProvider.removeD(exercicio.key);
    this.toast.create({message: 'Exercicio removido com sucesso!', duration: 3000}).present();
  }


}
