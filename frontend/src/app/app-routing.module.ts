import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';//agregado para formularios
import { HttpClientModule } from '@angular/common/http';//para conexion

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MenuPrincipalComponent } from './Components/menu-principal/menu-principal.component';
import { NuevasCredencialesComponent } from './Components/nuevas-credenciales/nuevas-credenciales.component';
import { PreguntaSeguridadComponent } from './Components/pregunta-seguridad/pregunta-seguridad.component';
import { RegistroClienteComponent } from './Components/registro-cliente/registro-cliente.component';
import { TransferenciasInternasResumenComponent } from './Components/transferencias-internas-resumen/transferencias-internas-resumen.component';
import { TransferenciasInternasComponent } from './Components/transferencias-internas/transferencias-internas.component';
import { TransferenciasComponent } from './Components/transferencias/transferencias.component';
import { MenuAdminComponent } from './Components/menu-admin/menu-admin.component';
import { RegistroCuentaComponent } from './Components/registro-cuenta/registro-cuenta.component';
import { SuspencionClientesComponent } from './Components/suspencion-clientes/suspencion-clientes.component';



const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { path: 'menu', component: MenuPrincipalComponent},
    { path: 'usuario', component: NuevasCredencialesComponent},
    { path: 'pregunta', component: PreguntaSeguridadComponent},
    { path: 'menu-admin', component: MenuAdminComponent},
    { path: 'registro-cliente', component: RegistroClienteComponent},
    { path: 'registro-cuenta', component: RegistroCuentaComponent},
    { path: 'suspender-cliente', component: SuspencionClientesComponent},
    { path: 'transferencia', component: TransferenciasComponent},
    { path: 'transferencia-interna', component: TransferenciasInternasComponent},
    { path: 'transferencia-interna-resumen', component: TransferenciasInternasResumenComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],//para conexion
  exports: [RouterModule,ReactiveFormsModule]//agregado para formularios
})
export class AppRoutingModule { }
