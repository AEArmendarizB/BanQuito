export class LoginUsuarioOTP{
    username:string;
    password:string;
    otp:string;

    constructor(
        username:string,
        password:string, 
        otp:string   
    ){
       
        this.username = username;
        this.password = password;
        this.otp = otp;
    }
}