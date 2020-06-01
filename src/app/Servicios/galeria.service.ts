import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  private dbPath = '/galeria';
  galeriaList: AngularFireList<any> = null;

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.galeriaList = angularFireDatabase.list(this.dbPath);
  }

  insertarImagenDetalle(pais: string, categoria: string, id: number, data) {
    const imagenes = this.angularFireDatabase.database;
    return imagenes.ref(this.dbPath).child(pais).child(categoria).child(id.toString()).set(data);
  }

  getImagenList(pais: string, categoria: string): AngularFireList<any> {
    this.galeriaList = this.angularFireDatabase.list(`/galeria/${pais}/${categoria}`);
    return this.galeriaList;
  }
}
