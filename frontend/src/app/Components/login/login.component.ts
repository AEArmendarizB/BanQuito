import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login.usuario';
import { Cliente } from 'src/app/models/usuarios'
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'BanQuito';

  public login_usuario:LoginUsuario;

  //usuarioForm: FormGroup;

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


}
