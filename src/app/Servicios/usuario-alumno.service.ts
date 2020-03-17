import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Alumno } from '../componentes/alumnos';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAlumnoService {

  prueba = '';
  private dbPath = `/profesora/alumnos/${sessionStorage.getItem('keyProfesora')}`;
  alumnoRef: AngularFireList<Alumno> = null;
  alumnosref: AngularFireList<any>;
  aluRef: AngularFireObject<any>;

  constructor(private angularFireDataBase: AngularFireDatabase) {
    this.alumnoRef = angularFireDataBase.list(this.dbPath);
  }

  crearAlumno(alumno: Alumno) {
    const alu = this.angularFireDataBase.database;
    return alu.ref(this.dbPath).child(alumno.id).set(alumno);
  }

  getAlumno(id: string) {
    this.aluRef = this.angularFireDataBase.object(`/profesora/alumnos/${sessionStorage.getItem('keyProfesora')}/${id}`);
    return this.aluRef;
  }

  getAlumnosList() {
    this.alumnoRef = this.angularFireDataBase.list(this.dbPath);
    return this.alumnoRef;
  }

  deleteAlumno(id: string): Promise<void> {
    return this.alumnoRef.remove(id);
  }

  updateAlumno(id: string, data: any): Promise<void> {
    this.aluRef = this.angularFireDataBase.object(`/profesora/alumnos/${sessionStorage.getItem('keyProfesora')}/${id}`);
    return this.aluRef.update(data);
  }
}
