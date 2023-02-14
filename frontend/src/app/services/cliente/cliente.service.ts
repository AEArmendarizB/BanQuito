import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cliente } from "src/app/models/clientes";
import { Usuario } from "src/app/models/usuarios";

@Injectable({

    providedIn: 'root'

    
})
export class ClienteService{
    url= "http://localhost:3600/guardar-cliente/";
    constructor(
        private http: HttpClient
    ){}
    verificarCliente(cliente: Cliente): Observable <any>{
        return this.http.post(this.url, cliente);
    }
}