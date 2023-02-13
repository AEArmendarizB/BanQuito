import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { RegistroClienteComponent } from './Components/registro-cliente/registro-cliente.component';
import { MenuPrincipalComponent } from './Components/menu-principal/menu-principal.component';
import { TransferenciasComponent } from './Components/transferencias/transferencias.component';
import { TransferenciasInternasComponent } from './Components/transferencias-internas/transferencias-internas.component';
import { TransferenciasInternasResumenComponent } from './Components/transferencias-internas-resumen/transferencias-internas-resumen.component';
import { NuevasCredencialesComponent } from './Components/nuevas-credenciales/nuevas-credenciales.component';
import { PreguntaSeguridadComponent } from './Components/pregunta-seguridad/pregunta-seguridad.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroClienteComponent,
    MenuPrincipalComponent,
    TransferenciasComponent,
    TransferenciasInternasComponent,
    TransferenciasInternasResumenComponent,
    NuevasCredencialesComponent,
    PreguntaSeguridadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
