export class Cliente {
    _id?: number;
    cedula:number;
    username:string;
    password:string;
    pregunta:String;

    constructor(cedula:number,username:string,password:string,pregunta:string){
        this.cedula=cedula;
        this.username=username;
        this.password=password;
        this.pregunta=pregunta;
    }

    

}