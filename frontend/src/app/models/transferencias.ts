export class Transferencia {
    _id?: number;
    //Datos del emisor
    cuentaEmisor: Number;
    nombresEmisor: String;
    apellidosEmisor: String;
    tipo_cuentaEmisor: String;
    monto: Number;
    descripcion:String;
    //Datos del receptor
    cuentaReceptor: Number;
    nombresReceptor: String;
    apellidosReceptor: String;
    tipo_cuentaReceptor: String;

    constructor(
        //Datos del emisor
        cuentaEmisor: Number,
        nombresEmisor: String,
        apellidosEmisor: String,
        tipo_cuentaEmisor: String,
        monto: Number,
        descripcion:String,
        //Datos del receptor
        cuentaReceptor: Number,
        nombresReceptor: String,
        apellidosReceptor: String,
        tipo_cuentaReceptor: String
    ){
        this.cuentaEmisor = cuentaEmisor;
        this.nombresEmisor = nombresEmisor;
        this.apellidosEmisor = apellidosEmisor;
        this.tipo_cuentaEmisor = tipo_cuentaEmisor;
        this.monto = monto;
        this.descripcion = descripcion;
        this.cuentaReceptor = cuentaReceptor;
        this.nombresReceptor = nombresReceptor;
        this.apellidosReceptor = apellidosReceptor;
        this.tipo_cuentaReceptor = tipo_cuentaReceptor;
    }
}