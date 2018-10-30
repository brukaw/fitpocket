import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth/auth-service';
import { User } from '../../providers/auth/user';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SigninPage } from '../signin/signin';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  form: FormGroup;
  //user: User = new User();
  //@ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private auth: AuthService,
    private formBuilder: FormBuilder) {

      this.creatForm();
  }

  private creatForm(){
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      nascimento: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
    if(this.form.valid) {
      this.auth.createAccount(this.form.value)
       .then( () => {
        this.toastCtrl.create({message:'Conta criada com sucesso. Foi enviado um e-mail de confirmação para você efetuar o login.',
         duration: 3000}).present();
         this.navCtrl.setRoot(SigninPage);
      })
      .catch(message => {
        this.toastCtrl.create({message: message, duration: 3000}).present();
      })
    }
  }

  onClose(){
    this.navCtrl.pop();
  }


  // createAccount(){
  //   if(this.form.form.valid){
  //     let toast = this.toastCtrl.create({ duration: 3000, position:'bottom'});

  //     this.auth.createUser(this.user)
  //       .then((user: any) => {
  //         user.sendEmailVerification();

  //         toast.setMessage('Usuário criado com sucesso.');
  //         toast.present();

  //         this.navCtrl.setRoot(HomePage);
  //         // Quando cria um usuario ja loga no app
  //       })
  //       .catch((error: any) => {
  //         if(error.code == 'auth/email-already-in-use'){
  //           toast.setMessage('O E-mail digitado já está em uso.');
  //         }
  //         else if (error.code =='auth/invalid-email'){
  //           toast.setMessage('O E-mail digitado não é válido.');
  //         }
  //         else if (error.code =='auth/operation-not-allowed'){
  //           toast.setMessage('Não está habilitado criar usuários.');
  //         }
  //         else if (error.code =='auth/wak-password'){
  //           toast.setMessage('A senha digitada é muito fraca.');
  //         }
  //         //toast.setMessage(error.message);
  //         toast.present();
  //       });
  //   }
  // }

}
