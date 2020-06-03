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

  imageObject = [{
    image: '../../../assets/SeeArtLogo.png',
    thumbImage: '../../../assets/SeeArtLogo.png',
    title: 'SeeArt.'
  }, {
    image: '../../../assets/EsfingeDeGiza.png',
    thumbImage: '../../../assets/EsfingeDeGiza.png',
    title: 'Modelo de La Gran Esfinge de Guiza.​'
  }, {
    image: '../../../assets/Arcos-de-Guadalajara.png',
    thumbImage: '../../../assets/Arcos-de-Guadalajara.png',
    title: 'Modelo de Los Arcos de Guadalajara.'
  }, {
    image: '../../../assets/TemploPabellonDeOro.png',
    thumbImage: '../../../assets/TemploPabellonDeOro.png',
    title: 'Modelo de Kinkaku-ji (Templo del Pabellón de Oro).'
  }, {
    image: '../../../assets/arcoTriunfo.png',
    thumbImage: '../../../assets/arcoTriunfo.png',
    title: 'Modelo del Arco de Triunfo de París.'
  }];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getProfesoras();
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
          this.nombreProfesora = nombreProf.find(element => element !== undefined);
        });
  }

}
