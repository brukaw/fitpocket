import { AngularFireAuth } from 'angularfire2/auth';
import { SigninPage } from './../pages/signin/signin';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { OneSignal } from '@ionic-native/onesignal'

import { HomePage } from '../pages/home/home';
import { auth } from 'firebase/app';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  //rootPage: any = HomePage;

  pages: Array<{icon: string, title: string, component: any}>;
  //private oneSignal: OneSignal
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    afAuth: AngularFireAuth,
    ) {
    const authObserver = afAuth.authState.subscribe(user => {
      if(user){
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      }
      else{
        this.rootPage = SigninPage;
        authObserver.unsubscribe();
      }
    })

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: "home", title: 'Home', component: HomePage },
      { icon: "flash", title: 'Treino', component: 'TreinoPage' },
      { icon: "calculator", title: 'IMC', component: 'ImcPage' },
      { icon: "stats", title: 'Medidas', component: 'MedidasPage' },
      { icon: "contact", title: 'Minha Conta', component: 'ContaPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // configurePushNotification(){
  //   window["plugins"].OneSignal.startInit('defa9346-452e-4183-b5ff-65a3311fc8e9', '694971389523');

  //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

  //   this.oneSignal.handleNotificationReceived().subscribe(() =>{
  //     // do something when notification is received
  //   });

  //   this.oneSignal.handleNotificationOpened().subscribe(() =>{
  //     // do something when a notification is opened
  //   });

  //   this.oneSignal.endInit();
  // }
}
