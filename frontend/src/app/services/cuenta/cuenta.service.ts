import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cuenta } from "src/app/models/cuentas";

@Injectable({

    providedIn: 'root'


})
export class CuentaService {
    url = "http://localhost:3600/guardar-cuenta/";
    urlVerificar = "http://localhost:3600/validarNumeroCuenta/";
    constructor(
        private http: HttpClient
    ) { }
    guardarCuenta(cuenta: Cuenta): Observable<any> {
        return this.http.post(this.url, cuenta);
    }
    validarCuenta(cuenta: Cuenta): Observable<any> {
        return this.http.post(this.url, cuenta);
    }
}
