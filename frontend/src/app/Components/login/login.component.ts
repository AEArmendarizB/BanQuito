import { Component } from '@angular/core';
import { LoginUsuario } from 'src/app/models/login.usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'BanQuito';

  public login_usuario:LoginUsuario;

  constructor(){
    this.login_usuario = new LoginUsuario('','');
  }

  ngOnInit(): void {
      
  }
}
