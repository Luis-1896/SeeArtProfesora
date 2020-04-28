import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  /**
   * Variables para llenar el array de imagenes para el Slider, obtener los datos de la profesora y se guarde su nombre
   */
  public imagesUrl;
  profesoras: any;
  nombreProfesora = '';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getImagenes();
    this.getProfesoras();
  }

  /**
   * Funcion para llenar el array y sea visibles en el Slider
   */
  getImagenes() {
    this.imagesUrl = ['../../../assets/EsfingeDeGiza.png',
      '../../../assets/SeeArtLogo.png',
      '../../../assets/Arcos-de-Guadalajara.png',
      '../../../assets/TemploPabellonDeOro.png',
      '../../../assets/arcoTriunfo.png'];
  }

  /**
   * Funcion para obtener los datos de las profesoras
   */
  getProfesoras() {
    this.usuarioService.getProfesoraList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        ))).subscribe(profesoras => {
          this.profesoras = profesoras;
          const nombreProf = this.profesoras.map(function (prof) {
            if (prof.key === sessionStorage.getItem('keyProfesora')) {
              return prof.name;
            }
          });
          this.nombreProfesora = nombreProf.find(element => element !== undefined)
        });
  }

}
