import { SelectionPage } from './../selection/selection';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { WorkoutProvider } from './../../providers/auth/workout';

@IonicPage()
@Component({
  selector: 'page-exercicios',
  templateUrl: 'exercicios.html',
})
export class ExerciciosPage {

  //adicionado: string;
  costas: Observable<any[]>;
  peito: Observable<any[]>;
  perna: Observable<any[]>;
  braco: Observable<any[]>;
  ombro: Observable<any[]>;
  exercicios: string = "braco";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private workoutProvider: WorkoutProvider,
    private toastController: ToastController) {

      this.braco = this.workoutProvider.getBraco();
      this.perna = this.workoutProvider.getPerna();
      this.peito = this.workoutProvider.getPeito();
      this.costas = this.workoutProvider.getCostas();
      this.ombro = this.workoutProvider.getOmbro();
  }

  addExercice(exercicio: any){
    this.navCtrl.push('SelectionPage', {nomeExercicio: exercicio.nome});
    //this.adicionado = this.workoutProvider.getNew();
    //this.toastController.create({message: 'Exercício adicionado à sua lista de treino.', duration: 3000}).present();
  }


}
