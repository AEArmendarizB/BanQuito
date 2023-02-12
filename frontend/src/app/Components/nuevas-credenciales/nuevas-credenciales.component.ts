import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from 'src/app/models/login.usuario';

@Component({
  selector: 'app-nuevas-credenciales',
  templateUrl: './nuevas-credenciales.component.html',
  styleUrls: ['./nuevas-credenciales.component.css']
})
export class NuevasCredencialesComponent implements OnInit{
  title = 'Nuevas credenciales BanQuito';

  public nuevo_usuario:LoginUsuario;

  constructor(){
    this.nuevo_usuario = new LoginUsuario('','');
  }
  
  ngOnInit(): void {
      
  }
}