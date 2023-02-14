import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from 'src/app/models/login.usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  title = 'BanQuito';

  public login_usuario:LoginUsuario;

  constructor(private fb: FormBuilder,private router: Router, private _usuarioService: UsuarioService ){
    this.login_usuario = new LoginUsuario('','');
  }

  ngOnInit(): void {
      
  }

  verificarUsuario(){



    this._usuarioService.verificarUsuario(this.login_usuario).subscribe(data =>{

      if(data== true){

        this.router.navigate(['/pregunta']);

      }else{

        console.log({message:'No se pudo encontrar el usuario'})

      }



    }, error =>{

      console.log(error);

    });


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
