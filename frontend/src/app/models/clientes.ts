export class Cliente {
    _id?: number;
    nombres:String;
    apellidos:String;
    cedula:Number;
    codigo_dactilar:string;
    fecha_nacimiento:string;
    correo_electronico:string;
    direccion:string;
    ocupacion:string;
    numero_telefono:string;

    constructor(nombres:string, apellidos:string, cedula:number, codigo_dactilar:string,
        fecha_nacimiento:string,correo_electronico:string,direccion:string,ocupacion:string,numero_telefono:string){
            this.nombres = nombres;
            this.apellidos=apellidos;
            this.cedula=cedula;
            this.codigo_dactilar=codigo_dactilar;
            this.fecha_nacimiento=fecha_nacimiento;
            this.correo_electronico=correo_electronico;
            this.direccion=direccion;
            this.ocupacion=ocupacion;
            this.numero_telefono=numero_telefono;
        }
}