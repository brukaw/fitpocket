import { MedicoesProvider } from './../../providers/afericoes/medicoes';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../../providers/auth/auth-service';
import { SigninPage } from './../signin/signin';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-conta',
  templateUrl: 'conta.html',
})
export class ContaPage {

  userName: string;
  userEmail: string;
  medidas: Observable<any[]>;
  indices: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private AuthService: AuthService,
    private angularFireAuth: AngularFireAuth,
    private toast: ToastController,
    private medicoesProvider: MedicoesProvider) {

      this.medidas = this.medicoesProvider.getAll();
      this.indices = this.medicoesProvider.getAll();
  }

  signOut(){
    this.AuthService.signOut()
      .then(() => {
        this.navCtrl.setRoot(SigninPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ionViewDidLoad(){
    const userState = this.angularFireAuth.authState.subscribe( user => {
      if(user){
        this.userName = user.displayName;
        this.userEmail = user.email;
        userState.unsubscribe();
      }
    })
  }

  removeMedidas(key: string){
    this.medicoesProvider.remove(key);
    this.toast.create({message: 'Medida removida com sucesso!', duration: 3000}).present();
  }

}
