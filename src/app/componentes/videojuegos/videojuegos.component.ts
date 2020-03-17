import { Alumno } from './../alumnos';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UsuarioAlumnoService } from 'src/app/Servicios/usuario-alumno.service';

@Component({
  selector: 'app-videojuegos',
  templateUrl: './videojuegos.component.html',
  styleUrls: ['./videojuegos.component.css']
})
export class VideojuegosComponent implements OnInit {
/**
   * Variables
   */
  dataSource: MatTableDataSource<Alumno>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  alumnoData: any = [];
  displayedColumns: any[] = [
    '$key',
    'nombre',
    'EligeElLugar',
    'MemoramaSeeArtFacil',
    'MemoramaSeeArtMedio',
    'MemoramaSeeArtDificil',
  ];

  constructor(private usuarioAlumnoService: UsuarioAlumnoService) { }

  ngOnInit() {
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

}
