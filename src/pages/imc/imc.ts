import { MedicoesProvider } from './../../providers/afericoes/medicoes';
import { CalculosDirective } from './../../providers/calculos/calculos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-imc',
  templateUrl: 'imc.html',
})
export class ImcPage {

  peso: number = 0;
  altura: number = 0;
  imc: number = 0;
  condicao: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private toast: ToastController,
    private medicoesProvider: MedicoesProvider) {

  }

  calcular(){
    this.imc = CalculosDirective.calcularImc( this.altura, this.peso );
    this.condicao = CalculosDirective.informarImc(this.imc);
  }

  saveImc(imc){
    if(imc){
      this.medicoesProvider.imcSaved(imc);
      this.toast.create({message: 'IMC salvo com sucesso!', duration: 3000}).present();
    }
  }

}
