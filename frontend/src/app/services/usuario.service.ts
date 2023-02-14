import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../models/usuarios";

//import { Cliente } from "../models/usuarios";



@Injectable({

    providedIn: 'root'

    
})

export class UsuarioService{

    url= 'http://localhost:3600/verificar-usuario/';

    constructor(private http: HttpClient) { }

    verificarUsuario(usuario: Usuario): Observable <any>{
        return this.http.post(this.url, usuario);
    }

}