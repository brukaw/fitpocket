import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { getComponentViewDefinitionFactory } from '@angular/core/src/view';

@Injectable()
export class WorkoutProvider{

  private SON = 'treinosUser/';
  private ARMS = 'treinos/arms';
  public recebe: void;
  private BACKS = 'treinos/backs';
  private CHEST = 'treinos/chest';
  private LEG = 'treinos/legs';
  private SHOULDER = 'treinos/shoulder';
  private PATH = 'treinos/';

  constructor(
    private db:AngularFireDatabase,
    private auth: AngularFireAuth) {

      if (!this.auth.auth.currentUser) return;
      this.SON += this.auth.auth.currentUser.uid;

  }

  // =================== CÓDIGO PARA MOSTRAR A LISTA DE EXERCICIOS EM EXERCICIOSPAGE ================

  getBraco(){
    return this.db.list(this.ARMS)
    .snapshotChanges()
    .map(changes => {
      return changes.map( x => ({ key: x.key, ...x.payload.val() }));
    })
  }

  getPerna(){
    return this.db.list(this.LEG)
    .snapshotChanges()
    .map(perna => {
      return perna.map( p => ({ key: p.key, ...p.payload.val() }));
    })
  }

  getPeito(){
    return this.db.list(this.CHEST)
    .snapshotChanges()
    .map(peitoral => {
      return peitoral.map( z => ({ key: z.key, ...z.payload.val() }));
    })
  }

  getCostas(){
    return this.db.list(this.BACKS)
    .snapshotChanges()
    .map(costa => {
      return costa.map( w => ({ key: w.key, ...w.payload.val() }));
    })
  }

  getOmbro(){
    return this.db.list(this.SHOULDER)
    .snapshotChanges()
    .map(ombros => {
      return ombros.map( o => ({ key: o.key, ...o.payload.val() }));
    })
  }

  // ============ CÓDIGO DA PÁGINA DE TREINO ===============

  // remove(key: string){
  //   this.db.list(this.SON).remove(key);
  // }

  getA(){
    return this.db.list(this.SON + '/treiA/')
    .snapshotChanges()
    .map(treinoA => {
      return treinoA.map( a => ({ key: a.key, ...a.payload.val() }));
    })
  }

  removeA(key: string){
    this.db.list(this.SON + '/treiA/').remove(key);
  }

  getB(){
    return this.db.list(this.SON + '/treiB/')
    .snapshotChanges()
    .map(treinoB => {
      return treinoB.map( b => ({ key: b.key, ...b.payload.val() }));
    })
  }

  removeB(key: string){
    this.db.list(this.SON + '/treiB/').remove(key);
  }

  getC(){
    return this.db.list(this.SON + '/treiC/')
    .snapshotChanges()
    .map(treinoC => {
      return treinoC.map( c => ({ key: c.key, ...c.payload.val() }));
    })
  }

  removeC(key: string){
    this.db.list(this.SON + '/treiC/').remove(key);
  }

  getD(){
    //this.SON = '';
    // if (!this.auth.auth.currentUser) return;
    // this.SON += this.auth.auth.currentUser.uid;

    return this.db.list(this.SON + '/treiD/')
    .snapshotChanges()
    .map(treinoD => {
      return treinoD.map( d => ({ key: d.key, ...d.payload.val() }));
    })
  }

  removeD(key: string){
    this.db.list(this.SON + '/treiD/').remove(key);
  }

  upExercice(treinosData: any){
    const train = {
      traines: treinosData.traines,
      exercicio: treinosData.exercicio
    };

    if(treinosData.key){
      this.db.list(this.SON).update(treinosData.key, train);
    }
    else{
      this.db.list(this.SON + '/' + treinosData.traines + '/').push(train);
    }
  }
}
