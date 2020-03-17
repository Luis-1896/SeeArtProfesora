import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioAlumnoService } from 'src/app/Servicios/usuario-alumno.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Alumno } from '../alumnos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

  /**
   * Variables para llenar el array de imagenes, los nombres de cada columna de la tabla y la paginación
   */
  public imagesUrl;
  dataSource: MatTableDataSource<Alumno>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  alumnoData: any = [];
  displayedColumns: any[] = [
    '$key',
    'nombre',
    'id',
    'nickname',
    'action'
  ];

  constructor(private usuarioAlumnoService: UsuarioAlumnoService, private router: Router) { }

  ngOnInit() {
    this.getImagenes();
    this.getAlumno();
  }

  /**
   * Función para llenar las imagenes para el slider
   */
  getImagenes() {
    this.imagesUrl = ['../../../assets/TemploPabellonDeOro.png',
      '../../../assets/SeeArtLogo.png',
      '../../../assets/Arcos-de-Guadalajara.png'];
  }

  /**
   * @param form ; Guarda todos los valores de cada input agregado en el formulario de nuevo alumno
   */
  newAlumno(form) {
    const dataAlumno: Alumno = form.value;
    dataAlumno.MemoramaSeeArtFacil = 0;
    dataAlumno.MemoramaSeeArtMedio = 0;
    dataAlumno.MemoramaSeeArtDificil = 0;
    dataAlumno.EligeElLugar = 0;
    this.usuarioAlumnoService.crearAlumno(dataAlumno).then(() => {
      form.reset();
      this.actualizar();
    }).catch(err => console.log('error', err));
  }

  /**
   * Funcion para obtener todos los alumnos agregados de acuerdo a los que correspondan al profesor.
   */
  getAlumno() {
    this.usuarioAlumnoService.getAlumnosList()
      .snapshotChanges().subscribe(alumnos => {
        alumnos.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.alumnoData.push(a as Alumno);
        });
        this.dataSource = new MatTableDataSource(this.alumnoData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
  }

  /**
   * Funcion para restaurar los datos de las variables utilizadas para mostrarse en la tabla
   */
  actualizar() {
    this.dataSource = null;
    this.alumnoData = [];
    this.getAlumno();
  }

  /**
   * 
   * @param index ; Indica la posición del alumno a eliminar
   * @param e ; Obtiene los datos del alumno
   */
  deleteAlumno(index: number, e) {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.usuarioAlumnoService.deleteAlumno(e.$key).then(() => {
      this.actualizar();
    }).catch(error => console.log(error));
  }

}
