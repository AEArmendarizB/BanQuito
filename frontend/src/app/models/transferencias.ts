export class Cuenta {
    _id?: number;
    cedula: number;
    numero_Transaccion:String;
    cuenta_Remitente: String;
    cuenta_Destino: String;
    monto:Number;
    costo:Number;

    constructor(
        cedula: number,
        numero_Transaccion:String,
        cuenta_Remitente: String,
        cuenta_Destino: String,
        monto:Number,
        costo:Number
    ){
        this.cedula = cedula;
        this.numero_Transaccion = numero_Transaccion;
        this.cuenta_Destino = cuenta_Destino;
        this.cuenta_Remitente = cuenta_Remitente;
        this.monto = monto;
        this.costo = costo;
    }
}