import { Profesora } from './../profesora';
import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/Servicios/autenticacion.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  /**
   * Variables para saber si ya inicio sesion la profesora y mostrar mas opciones del navbar
   */
  private esProfesora: boolean;
  sesionActiva: boolean;
  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router,
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    /**
     * Para obtener el usuario cuando inicia sesión o se registra y aparezca las opciones correspondientes en el navbar
     */
    this.autenticacionService.user.subscribe(user => {
      if (user) {
        this.esProfesora = true;
      } else {
        this.esProfesora = false;
      }
    });
  }

  /**
   * Funcion que Sirve para mostrar la KEY de la profesora y esa key sea copiada en la aplicación de Unity
   */
  openSnackBar() {
    this._snackBar.open(sessionStorage.getItem('keyProfesora'), "Clave de la profesora en Unity", {
      duration: 10000,
    });
  }

  /**
   * Funcion para cerrar la sesión de la profesora en el página web y se inicialice todas las variables.
   */
  logout() {
    const data = { sesionActiva: false };
    this.usuarioService.updateProfesora(sessionStorage.getItem('keyProfesora'), data).catch(err => console.log(err));
    this.autenticacionService.logout()
      .then(() => {
        this.esProfesora = false;
        this.router.navigate(['/']);
      }).catch(err => console.log(err));
  }

}
