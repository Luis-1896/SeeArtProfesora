import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { finalize, map } from "rxjs/operators";
import { AngularFireStorage } from '@angular/fire/storage';
import { GaleriaService } from 'src/app/Servicios/galeria.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  /**
   * Variables
   */
  imagenFuente: string;
  imagenSeleccionada: any = null;
  mostrar: boolean;
  imagenes: any;
  mensajeImagen: string;

  /**
   * Se almacenan el numero de registros que ya se tienen en la bd de Firebase México
   */
  lengthPinturas = 0;
  lengthLugares = 0;
  lengthEsculturas = 0;

  /**
   * Se almacenan el numero de registros que ya se tienen en la bd de Firebase Francia
   */
  lengthPinturasF = 0;
  lengthLugaresF = 0;
  lengthEsculturasF = 0;

  /**
   * Se almacenan el numero de registros que ya se tienen en la bd de Firebase Japon
   */
  lengthPinturasJ = 0;
  lengthLugaresJ = 0;
  lengthEsculturasJ = 0;

  /**
   * Se almacenan el numero de registros que ya se tienen en la bd de Firebase Egipto
   */
  lengthPinturasE = 0;
  lengthLugaresE = 0;
  lengthEsculturasE = 0;

  /**
   * @param formTemplate el es FormGroup que obtendran los datos del formulario México
   */
  formTemplate = new FormGroup({
    descripcion: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    categoria: new FormControl(''),
    imagenUrl: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  constructor(private angularFireStorage: AngularFireStorage,
    private galeriaService: GaleriaService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getNumeroImagenesMexico();
    this.getNumeroImagenesFrancia();
    this.getNumeroImagenesJapon();
    this.getNumeroImagenesEgipto();
    this.resetForm();
  }

  /**
   * Funcion que Sirve para mostrar la KEY de la profesora y esa key sea copiada en la aplicación de Unity
   */
  openSnackBar(mensajeImagen: string) {
    this._snackBar.open(mensajeImagen, 'Cerrar', {
      duration: 2000,
    });
  }
  /**
   * @param event Se muestra la imagen seleccionada
   */
  mostrarVistaPrevia(event: any) {
    if (event.target.files && event.target.files[0]) {
      const lector = new FileReader();
      lector.onload = (e: any) => this.imagenFuente = e.target.result;
      lector.readAsDataURL(event.target.files[0]);
      this.imagenSeleccionada = event.target.files[0];
    } else {
      this.imagenFuente = '../../../assets/sin_imagen.png';
      this.imagenSeleccionada = null;
    }
  }

  /**
   * @param formValue Obtiene datos capurados del Formulario de México
   */
  agregarMexico(formValue) {
    this.mostrar = true;
    if (this.formTemplate.valid) {
      const catego = formValue.categoria;
      const filePath =
        `mexico/${formValue.categoria}/${this.imagenSeleccionada.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const referenciaArchivo = this.angularFireStorage.ref(filePath);
      this.angularFireStorage.upload(filePath, this.imagenSeleccionada).snapshotChanges().pipe(
        finalize(() => {
          referenciaArchivo.getDownloadURL().subscribe((url) => {
            formValue['imagenUrl'] = url;
            if (catego === 'Pinturas') {
              formValue['id'] = this.lengthPinturas + 1;
            }
            if (catego === 'Lugares') {
              formValue['id'] = 3001 + this.lengthLugares;
            }
            if (catego === 'Esculturas') {
              formValue['id'] = 6001 + this.lengthEsculturas;
            }
            this.galeriaService.insertarImagenDetalle('mexico', catego, formValue['id'], formValue)
              .then(() => {
                this.mensajeImagen = 'Imagen subida exitosamente';
                this.openSnackBar(this.mensajeImagen);
                this.resetForm();
              }).catch(error => {
                this.mensajeImagen = 'La imagen no se subio correctamente';
                this.openSnackBar(this.mensajeImagen);
                console.log(error);
              });
          });
        })).subscribe();
    }
  }

  /**
   * @param formValue Obtiene datos capurados del Formulario de Francia
   */
  agregarFrancia(formValue) {
    this.mostrar = true;
    if (this.formTemplate.valid) {
      const catego = formValue.categoria;
      const filePath =
        `francia/${formValue.categoria}/${this.imagenSeleccionada.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const referenciaArchivo = this.angularFireStorage.ref(filePath);
      this.angularFireStorage.upload(filePath, this.imagenSeleccionada).snapshotChanges().pipe(
        finalize(() => {
          referenciaArchivo.getDownloadURL().subscribe((url) => {
            formValue['imagenUrl'] = url;
            if (catego === 'Pinturas') {
              formValue['id'] = this.lengthPinturasF + 9001;
            }
            if (catego === 'Lugares') {
              formValue['id'] = 12001 + this.lengthLugaresF;
            }
            if (catego === 'Esculturas') {
              formValue['id'] = 15001 + this.lengthEsculturasF;
            }
            this.galeriaService.insertarImagenDetalle('francia', catego, formValue['id'], formValue) .then(() => {
              this.mensajeImagen = 'Imagen subida exitosamente';
              this.openSnackBar(this.mensajeImagen);
              this.resetForm();
            }).catch(error => {
              this.mensajeImagen = 'La imagen no se subio correctamente';
              this.openSnackBar(this.mensajeImagen);
              console.log(error);
            });
          });
        })).subscribe();
    }
  }

  /**
   * @param formValue Obtiene datos capurados del Formulario de Japon
   */
  agregarJapon(formValue) {
    this.mostrar = true;
    if (this.formTemplate.valid) {
      const catego = formValue.categoria;
      const filePath =
        `japon/${formValue.categoria}/${this.imagenSeleccionada.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const referenciaArchivo = this.angularFireStorage.ref(filePath);
      this.angularFireStorage.upload(filePath, this.imagenSeleccionada).snapshotChanges().pipe(
        finalize(() => {
          referenciaArchivo.getDownloadURL().subscribe((url) => {
            formValue['imagenUrl'] = url;
            if (catego === 'Pinturas') {
              formValue['id'] = this.lengthPinturasJ + 18001;
            }
            if (catego === 'Lugares') {
              formValue['id'] = 21001 + this.lengthLugaresJ;
            }
            if (catego === 'Esculturas') {
              formValue['id'] = 24001 + this.lengthEsculturasJ;
            }
            this.galeriaService.insertarImagenDetalle('japon', catego, formValue['id'], formValue) .then(() => {
              this.mensajeImagen = 'Imagen subida exitosamente';
              this.openSnackBar(this.mensajeImagen);
              this.resetForm();
            }).catch(error => {
              this.mensajeImagen = 'La imagen no se subio correctamente';
              this.openSnackBar(this.mensajeImagen);
              console.log(error);
            });
          });
        })).subscribe();
    }
  }

  /**
 * @param formValue Obtiene datos capurados del Formulario de Egipto
 */
  agregarEgipto(formValue) {
    this.mostrar = true;
    if (this.formTemplate.valid) {
      const catego = formValue.categoria;
      const filePath =
        `egipto/${formValue.categoria}/${this.imagenSeleccionada.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const referenciaArchivo = this.angularFireStorage.ref(filePath);
      this.angularFireStorage.upload(filePath, this.imagenSeleccionada).snapshotChanges().pipe(
        finalize(() => {
          referenciaArchivo.getDownloadURL().subscribe((url) => {
            formValue['imagenUrl'] = url;
            if (catego === 'Pinturas') {
              formValue['id'] = this.lengthPinturasE + 27001;
            }
            if (catego === 'Lugares') {
              formValue['id'] = 30001 + this.lengthLugaresE;
            }
            if (catego === 'Esculturas') {
              formValue['id'] = 33001 + this.lengthEsculturasE;
            }
            this.galeriaService.insertarImagenDetalle('egipto', catego, formValue['id'], formValue) .then(() => {
              this.mensajeImagen = 'Imagen subida exitosamente';
              this.openSnackBar(this.mensajeImagen);
              this.resetForm();
            }).catch(error => {
              this.mensajeImagen = 'La imagen no se subio correctamente';
              this.openSnackBar(this.mensajeImagen);
              console.log(error);
            });
          });
        })).subscribe();
    }
  }

  /**
   * Sirve para saber si se cumplen todos los datos solicitdos en el html si no lo marca como error
   */
  get formControls() {
    return this.formTemplate['controls'];
  }

  /**
   * Restablece el valor de cada variable
   */
  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      descripcion: '',
      titulo: '',
      imagenUrl: '',
      categoria: 'Pinturas',
      id: 1
    });
    this.imagenFuente = '../../../assets/sin_imagen.png';
    this.imagenSeleccionada = null;
    this.mostrar = false;
  }

  /**
   * Obtiene el numero de registros por cada categoria en México
   */
  getNumeroImagenesMexico() {
    // Pinturas 
    this.galeriaService.getImagenList('mexico', 'Pinturas').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        ))).subscribe(ima => {
          this.lengthPinturas = ima.length;
        });
    // Lugares
    this.galeriaService.getImagenList('mexico', 'Lugares').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })))).subscribe(ima => {
            this.lengthLugares = ima.length;
          });
    // Esculturas
    this.galeriaService.getImagenList('mexico', 'Esculturas').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })))).subscribe(ima => {
            this.lengthEsculturas = ima.length;
          });
  }

  /**
   * Obtiene el numero de registros por cada categoria en Francia
   */
  getNumeroImagenesFrancia() {
    // Pinturas 
    this.galeriaService.getImagenList('francia', 'Pinturas').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        ))).subscribe(ima => {
          this.lengthPinturasF = ima.length;
        });
    // Lugares
    this.galeriaService.getImagenList('francia', 'Lugares').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })))).subscribe(ima => {
            this.lengthLugaresF = ima.length;
          });
    // Esculturas
    this.galeriaService.getImagenList('francia', 'Esculturas').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })))).subscribe(ima => {
            this.lengthEsculturasF = ima.length;
          });
  }

  /**
   * Obtiene el numero de registros por cada categoria en Japon
   */
  getNumeroImagenesJapon() {
    // Pinturas 
    this.galeriaService.getImagenList('japon', 'Pinturas').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        ))).subscribe(ima => {
          this.lengthPinturasJ = ima.length;
        });
    // Lugares
    this.galeriaService.getImagenList('japon', 'Lugares').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })))).subscribe(ima => {
            this.lengthLugaresJ = ima.length;
          });
    // Esculturas
    this.galeriaService.getImagenList('japon', 'Esculturas').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })))).subscribe(ima => {
            this.lengthEsculturasJ = ima.length;
          });
  }

  /**
   * Obtiene el numero de registros por cada categoria en Egipto
   */
  getNumeroImagenesEgipto() {
    // Pinturas 
    this.galeriaService.getImagenList('egipto', 'Pinturas').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        ))).subscribe(ima => {
          this.lengthPinturasE = ima.length;
        });
    // Lugares
    this.galeriaService.getImagenList('egipto', 'Lugares').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })))).subscribe(ima => {
            this.lengthLugaresE = ima.length;
          });
    // Esculturas
    this.galeriaService.getImagenList('egipto', 'Esculturas').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })))).subscribe(ima => {
            this.lengthEsculturasE = ima.length;
          });
  }


}
