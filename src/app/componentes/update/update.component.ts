import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioAlumnoService } from 'src/app/Servicios/usuario-alumno.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  /**
   * Variables para llenar el array de las imagenes para el slider, poner el nombre del alumno
   */
  public imagesUrl;
  private nombre: string;
  NombreAlumno = ' '

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioAlumnoService: UsuarioAlumnoService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.getImagenes();
    this.getDatos();
  }

  /**
   * Funcion para llenar el array de las imagens que se mostraran en el slider
   */
  getImagenes() {
    this.imagesUrl = ['../../../assets/TemploPabellonDeOro.png',
      '../../../assets/SeeArtLogo.png',
      '../../../assets/Arcos-de-Guadalajara.png'];
  }

  /**
   * Obtiene el id del alumno que se envio desde el formulario de la tabla para editarlo
   */
  getDatos() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usuarioAlumnoService.getAlumno(id).valueChanges().subscribe(data => {
      this.NombreAlumno = data.nombre;
    });
  }

  /**
   * @param form ;Obtiene todos los datos de los input del formulario de Editar
   */
  editar(form) {
    const data = form.value;
    const keyAlu = this.activatedRoute.snapshot.paramMap.get('id');
    this.usuarioAlumnoService.getAlumno(keyAlu).valueChanges().subscribe(resultado => {
      if (data.nombre === '') {
        data.nombre = resultado.nombre;
      }
      if (data.nickname === '') {
        data.nickname = resultado.nickname;
      }
      this.usuarioAlumnoService.updateAlumno(keyAlu, data).then(() => {
        this.router.navigate(['jugadores']).then(() => {
          location.reload();
        }).catch(err => console.log(err));
      }).catch(err => console.log('error', err));

    });
  }

}
