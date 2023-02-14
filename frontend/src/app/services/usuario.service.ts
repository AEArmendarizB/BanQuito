import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginUsuario } from "../models/login.usuario";

import { Cliente } from "../models/usuarios";



@Injectable({

    providedIn: 'root'

    
})

export class UsuarioService{

    url= 'http://localhost:3600/verificar-usuario/';

    constructor(private http: HttpClient) { }

    verificarUsuario(usuario:  LoginUsuario): Observable <any>{
        
        
        
        return this.http.post(this.url, usuario);
        
        

    }

}