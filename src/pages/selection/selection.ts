import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciciosPage } from './../exercicios/exercicios';
import { WorkoutProvider } from './../../providers/auth/workout';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-selection',
  templateUrl: 'selection.html',
})
export class SelectionPage {

  form: FormGroup;
  train: any;
  exercicios: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private workoutProvider: WorkoutProvider,
    private formBuilder: FormBuilder) {

      this.exercicios = this.navParams.data.nomeExercicio || {};
      console.log(this.navParams.data.nomeExercicio);
      this.train = this.navParams.data.treino || {};
      this.creatForm();
  }

  private creatForm(){
    this.form = this.formBuilder.group({
      key:[this.train.key],
      traines: [this.train.traines],
      exercicio: [this.navParams.data.nomeExercicio]
    })

  }


  adicionar(){
    if(this.form.valid){
      this.workoutProvider.upExercice(this.form.value);
      this.toast.create({ message: 'Exercicio adicionado ao treino com sucesso!', duration: 3000}).present();
      this.navCtrl.pop();
    }
  }
}
