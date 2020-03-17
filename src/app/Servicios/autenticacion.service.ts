import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  /**
   * Almacena al usuario activo
   */
  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.user;
  }



  /*Metodos de autenticación*/

  signup(email, password) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email, password) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.angularFireAuth.auth.signOut()
    .then(() => {
      sessionStorage.clear();
    })
    .catch(err => console.log(err));
  }
}
