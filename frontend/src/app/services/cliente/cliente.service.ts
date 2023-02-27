import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cliente } from "src/app/models/clientes";

@Injectable({

    providedIn: 'root'


})
export class ClienteService {
    url = "http://localhost:3600/guardar-cliente/";
    urlVerificar = "http://localhost:3600/validarCedula/";
    urlCorreo = "http://localhost:3600/validar-email/";
    urlNombreCliente = "http://localhost:3600/get-nombre/";
    urlCorreoLogin = "http://localhost:3600/verificar-email";

    constructor(
        private http: HttpClient
    ) { }
    guardarCliente(cliente: Cliente): Observable<any> {
        return this.http.post(this.url, cliente);
    }
    validarCliente(cliente: Cliente): Observable<any> {
        return this.http.post(this.urlVerificar, cliente);
    }
    validarCorreo(correo:Object){
        return this.http.post(this.urlCorreo, correo);
    }
    extraerNombre(cedula:Object): Observable<any>{
        return this.http.post(this.urlNombreCliente, cedula);
    }
    validarCorreoLogin(correo:Object){
        return this.http.post(this.urlCorreoLogin, correo);
    }
}