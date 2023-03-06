import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { respuesta } from "../models/respuesta";

@Injectable({

    providedIn: 'root'

    
})

export class RespuestaService{

    url= 'http://54.219.51.93:3600/guardar-respuesta/';

    constructor(private http: HttpClient) { }

    saveRespuesta(respuesta: respuesta): Observable <any>{
        
        return this.http.post(this.url, respuesta);

    }

}