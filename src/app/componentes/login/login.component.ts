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
    const longitud = this.profesoras.length;
    this.autenticacionService.login(data.email, data.password)
      .then(() => {
        /*Este for es para guardar el id de la profesora y garantizar quien hizo login para obtener sus datos personales */
        for (let i = 0; i < longitud; i++) {
          if (this.profesoras[i].email === data.email && this.profesoras[i].password === data.password) {
            sessionStorage.setItem('idProfesora', this.profesoras[i].id);
            data.sesionActiva = true;
            this.keyprofesora = this.profesoras[i].key;
          }
        }
        this.router.navigate(['/bienvenido']).then(() => {
          this.usuarioService.updateProfesora(this.keyprofesora, data);
          location.reload();
        }).catch(err => console.log('error', err));
      }).catch(err => {
        this.errorMessage = err.message;
      });
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
    ).subscribe(profesoras => {
      this.profesoras = profesoras;
    });
  }



}
