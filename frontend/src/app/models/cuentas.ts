export class Cuenta {
    _id?: number;
    cedula:number;
    tipo_cuenta:string;
    monto_inicial:number;
    ingreso_promedio:number;
    numero_cuenta:String;

    constructor(cedula:number, tipo_cuenta:string, monto_inicial:number, ingreso_promedio:number, 
        numero_cuenta:string){
            this.cedula = cedula;
            this.tipo_cuenta=tipo_cuenta;
            this.monto_inicial=monto_inicial;
            this.ingreso_promedio=ingreso_promedio;
            this.numero_cuenta= numero_cuenta;
    }
}