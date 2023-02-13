import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from 'src/app/models/login.usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  title = 'BanQuito';

  public login_usuario:LoginUsuario;

  constructor(){
    this.login_usuario = new LoginUsuario('','');
  }

  ngOnInit(): void {
      
  }
  /*validate(){
    var usr=$("#user").val();
    var password=$("#pass").val();

    if(usr=="admin" && password=="admin"){
        window.alert('Ingreso exitosamente');
    }
    return false;
    
}*/
}
