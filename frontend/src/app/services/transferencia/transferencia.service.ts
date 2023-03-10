import { HttpClient } from "@angular/common/http";
import { core } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Obj } from "@popperjs/core";
import { Observable } from "rxjs";
import { Transferencia } from "src/app/models/transferencias";

@Injectable({

    providedIn: 'root'


})
export class TransferenciaService {
    urlGuardar = "http://54.219.51.93:3600/guardar-transferencia/";

    constructor(
        private http: HttpClient
    ) { }
    guardarTransferencia(transferencia: Transferencia): Observable<any>{
        return this.http.post(this.urlGuardar, transferencia);
    }
}