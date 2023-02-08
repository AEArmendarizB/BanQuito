import { Component } from '@angular/core';
import { LoginUsuario } from '../models/login.usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BanQuito';

  public login_usuario:LoginUsuario;

  constructor(){
    this.login_usuario = new LoginUsuario('','');
  }

  ngOnInit(): void {
      
  }
}
