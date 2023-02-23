export class Usuario {
    _id?: number;
    cedula:number;
    username:string;
    password:string;
    pregunta:String;
    isNew:boolean;

    constructor(cedula:number,username:string,password:string,pregunta:string,isNew:boolean){
        this.cedula=cedula;
        this.username=username;
        this.password=password;
        this.pregunta=pregunta;
        this.isNew= isNew;
    }

}