import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AuthGuard } from './Servicios/guard/auth.guard';
import { AuthWhenLoginGuard } from './Servicios/guard/auth-when-login.guard';
import { JugadoresComponent } from './componentes/jugadores/jugadores.component';
import { VideojuegosComponent } from './componentes/videojuegos/videojuegos.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { UpdateComponent } from './componentes/update/update.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';


const routes: Routes = [
  //Todas las rutas de la pagina web
  { path: '', component: LoginComponent, canActivate: [AuthWhenLoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [AuthWhenLoginGuard] },
  { path: 'bienvenido', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'jugadores', component: JugadoresComponent, canActivate: [AuthGuard] },
  { path: 'videojuegos', component: VideojuegosComponent, canActivate: [AuthGuard] },
  { path: 'galeria', component: GaleriaComponent, canActivate: [AuthGuard] },
  { path: 'editar-alumno/:id', component: UpdateComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
