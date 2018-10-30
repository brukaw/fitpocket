import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoesProvider } from './../../providers/afericoes/medicoes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-medidas',
  templateUrl: 'medidas.html',
})
export class MedidasPage {

  form: FormGroup;
  medida: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private toast: ToastController,
    private medicoesProvider: MedicoesProvider) {

      this.medida = this.navParams.data.medida || {};
      this.createForm();
  }

  private createForm(){
    this.form = this.formBuilder.group({
      key:[this.medida.key],
      cintura:[this.medida.cintura],
      braco:[this.medida.braco],
      peitoral:[this.medida.peitoral],
      coxa:[this.medida.coxa],
      panturrilha:[this.medida.panturrilha]
    })
  }

  salvarMedidas(){
    if(this.form.valid){
      this.medicoesProvider.save(this.form.value);
      this.toast.create({message: 'Medida salva com sucesso!', duration: 3000}).present();
    }
  }

}
