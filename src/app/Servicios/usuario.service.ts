import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Profesora } from '../componentes/profesora';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private dbPath = '/profesora';
  profesoraRef: AngularFireList<Profesora> = null;
  proRef: AngularFireObject<any>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.profesoraRef = angularFireDatabase.list(this.dbPath);
  }

  /* Metodos CRUD */

  crearProfesora(profesora: Profesora) {
    return this.profesoraRef.push(profesora);
  }

  getProfesoraList(): AngularFireList<Profesora> {
    return this.profesoraRef;
  }

  updateProfesora(id: string, data: any): Promise<void> {
    this.proRef = this.angularFireDatabase.object(`/profesora/${id}`);
    return this.proRef.update(data);
  }
}
