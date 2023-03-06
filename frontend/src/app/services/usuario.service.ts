import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginUsuario } from "../models/login.usuario";
import { Usuario } from "../models/usuarios";

//import { Cliente } from "../models/usuarios";



@Injectable({

    providedIn: 'root'

    
})

export class UsuarioService{

    url= 'http://54.219.51.93:3600/verificar-usuario/';

    constructor(private http: HttpClient) { }

    verificarUsuario(usuario: LoginUsuario): Observable <any>{
        
        return this.http.post(this.url, usuario);
    }
    

    url2= 'http://54.219.51.93:3600/actualizarUsuario/';

    actualizarUsuario(cedulaObj: object): Observable <any>{
        return this.http.post(this.url2, cedulaObj);
    }

    url3= 'http://54.219.51.93:3600/validarUsername/';

    verificarUsername(usuario: LoginUsuario): Observable <any>{
        return this.http.post(this.url3, usuario);
    }
}