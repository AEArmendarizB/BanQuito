import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "src/app/models/usuarios";


@Injectable({

    providedIn: 'root'

    
})
export class UsuarioService{
    url= "http://localhost:3600/guardar-usuario/";
    urlgetUsuario= "http://localhost:3600/getUsuario/";
    urlPregunta= "http://localhost:3600/verificarPregunta/";

    constructor(
        private http: HttpClient
    ){}
    verificarUsuario(usuario: Usuario): Observable <any>{
        return this.http.post(this.url, usuario);
    }
    getUsuario(cedula:object): Observable <any>{
        return this.http.post(this.urlgetUsuario, cedula);
    }

    

   
    verificarPregunta(pregunta: Object): Observable <any>{
        return this.http.post(this.urlPregunta, pregunta);
    }
}