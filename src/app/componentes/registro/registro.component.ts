import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/Servicios/autenticacion.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { Profesora } from '../profesora';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent implements OnInit {

  /**
   * Variables utilizadas para marcar un error, visualizar la contraseña y tener el array de la Profesora
   */
  errorMessage = '';
  errorNombre = 'Nombre Invalido';
  hide = true;
  profesora: Profesora = new Profesora();

  constructor(
    private autenticacionService: AutenticacionService,
    private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit() {
  }

  /**
   * @param form ;Se tiene todas los datos ingresados del formulario de Registrar
   */
  signup(form) {
    const data = {
      email: form.value.email,
      name: form.value.name,
      password: form.value.password,
      id: null,
      sesionActiva: null
    };
    this.autenticacionService.signup(data.email, data.password).then(resultado => {
      this.errorMessage = '';
      data.id = resultado.user.uid;
      data.sesionActiva = true;
      this.usuarioService.crearProfesora(data).then(result => {
        sessionStorage.setItem('keyProfesora', result.key);
        sessionStorage.setItem('idProfesora', data.id);
      }).catch(err => this.errorMessage = err);
    }).catch(err => this.errorMessage = err.message);
  }

}
