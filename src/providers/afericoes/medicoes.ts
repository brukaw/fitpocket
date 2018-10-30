import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MedicoesProvider {

  private PATH = 'medidas/';

  constructor(
    private db: AngularFireDatabase,
    public auth: AngularFireAuth) {

    //if (!this.auth.auth.currentUser) return;
    //this.PATH += this.auth.auth.currentUser.uid;
  }


  // ============= CÓDIGO DA PÁGINA MEDIDAS ===========

  save(medidaData: any){
    if (!this.auth.auth.currentUser) return;
    this.PATH += this.auth.auth.currentUser.uid;

    const medidas = {
      cintura: medidaData.cintura,
      braco: medidaData.braco,
      peitoral: medidaData.peitoral,
      coxa: medidaData.coxa,
      panturrilha: medidaData.panturrilha
    };

    if(medidaData.key){
      this.db.list(this.PATH).update(medidaData.key, medidas);
    }
    else{
      this.db.list(this.PATH).push(medidas);
    }
  }

  // ============ CÓDIGO DA PÁGINA CONTA ==============

  getAll(){
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map( c => ({ key: c.key, ...c.payload.val() }));
      })
  }

  remove(key: string){
    this.db.list(this.PATH).remove(key);
  }

  // =========== CÓDIGO PÁGINA IMC =================

  imcSaved(imcData: any){
    if (!this.auth.auth.currentUser) return;
    this.PATH += this.auth.auth.currentUser.uid;

    const indice = {
      imc: imcData.imc
    };

    if(imcData.key){
      this.db.list(this.PATH).update(imcData.key, indice);
    }
    else{
      this.db.list(this.PATH).push(indice);
    }

  }
}
