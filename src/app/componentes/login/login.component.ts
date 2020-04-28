import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/Servicios/autenticacion.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/Servicios/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Variables para mostrar un mensaje de error, poder utilizar las profesoras y guardar la key de la profesora
   */
  errorMessage = '';
  profesoras: any;
  keyprofesora = '';

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getProfesoras();
  }

  /**
   * @param form ;Obtiene los datos ingresados del formulario de Iniciar Sesion
   */
  login(form) {
    const data = form.value;
    this.autenticacionService.login(data.email, data.password).then(() => {
      const pro = this.profesoras.map(function (profe) {
        if (profe.email === data.email && profe.password === data.password) {
          sessionStorage.setItem('idProfesora', profe.id);
          data.sesionActiva = true;
          sessionStorage.setItem('keyProfesora', profe.key);
          return profe.key;
        }
      });
      this.usuarioService.updateProfesora(pro.find(element => element !== undefined), data);
    }).catch(err => this.errorMessage = err.message);
  }

  /**
   * Funcion para obtener los datos de las profesoras
   */
  getProfesoras() {
    this.usuarioService.getProfesoraList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(profesoras => this.profesoras = profesoras);
  }
}
