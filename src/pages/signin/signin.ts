import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../providers/auth/user';
import { HomePage } from './../home/home';
import { ResetpasswordPage } from './../resetpassword/resetpassword';
import { AuthService } from './../../providers/auth/auth-service';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  form: FormGroup;
  userName: string;
  //user: User = new User();
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
      password: ['', Validators.required],
    })
  }

  onSubmit(){
    if(this.form.valid) {
      this.authService.login(this.form.value)
       .then( (user: any) => {
         if (user.emailVerified){
           this.navCtrl.setRoot(HomePage);
         } else {
           this.toastCtrl.create({ message:'Seu e-mail ainda não foi verificado. Por favor acesse seu e-mail e clique no link para verificar conta', duration: 6000 }).present();
         }
      })
      .catch(message => {
        this.toastCtrl.create({message: message, duration: 3000}).present();
      })
    }
  }

  abrirConta(){
    this.navCtrl.push(SignupPage);
  }

  esqueciSenha(){
    this.navCtrl.push(ResetpasswordPage);
  }


  // createAccount(){
  //   this.navCtrl.push(SignupPage);
  // }

  // resetPassword(){
  //   this.navCtrl.push(ResetpasswordPage);
  // }

  // signIn(){
  //   if(this.form.form.valid){
  //     this.authService.signIn(this.user)
  //     .then( () => {
  //        //if(firebaseUser.emailVerified){
  //          //this.db.object(this.PATH + firebaseUser.uid).update({emailVerified: true});
  //       //}
  //       this.navCtrl.setRoot(HomePage);
  //     })
  //     .catch((error: any) => {
  //       let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
  //       if(error.code == 'auth/invalid-email'){
  //         toast.setMessage('O e-mail digitado não é inválido.');
  //       }
  //       else if(error.code == 'auth/user-disabled'){
  //         toast.setMessage('O usuário está desativado.');
  //       }
  //       else if(error.code == 'auth/user-not-found'){
  //         toast.setMessage('O usuário não foi encontrado.');
  //       }
  //       else if(error.code == 'auth/wrong-password'){
  //         toast.setMessage('A senha digitada não é válida.');
  //       }
  //       toast.present();
  //     });
  //   }
  // }

}
