import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../providers/auth/auth-service';


@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  form: FormGroup;
  userName: string;

  //userEmail: string = '';
  //@ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth) {

      this.creatForm();
  }

  private creatForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onSubmit(){
    if(this.form.valid) {
      this.authService.forgotEmail(this.form.value.email).then( (user:any) => {
        this.toastCtrl.create({ message: 'Um e-mail foi enviado para que você resete sua senha', duration: 6000}).present();
        this.navCtrl.pop();
      })
      .catch(message => {
        this.toastCtrl.create({ message: message, duration: 3000}).present();
      })
    }
  }

  // resetPassword(){
  //   if(this.form.form.valid){
  //     let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

  //     this.authService.resetPassword(this.userEmail)
  //       .then(() => {
  //         toast.setMessage('Solicitação foi enviada para o seu e-mail.')
  //         toast.present();
  //       })
  //       .catch((error: any) => {
  //         if(error.code = 'auth/invalid-email'){
  //           toast.setMessage('O e-mail digitado não é válido');
  //         }
  //         else if(error.code = 'auth/user-not-found'){
  //           toast.setMessage('O usuário não foi encontrado');
  //         }
  //         toast.present();
  //       });
  //   }
  // }

}
