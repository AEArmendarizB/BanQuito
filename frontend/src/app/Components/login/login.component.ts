import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login.usuario';
import { Usuario } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  title = 'BanQuito';
  public myForm!:FormGroup;

  public login_usuario:Usuario;

  //usuarioForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router, private _usuarioService: UsuarioService ){
    this.login_usuario = new Usuario(0,'','','');
  }

  ngOnInit(): void {
      //this.myForm = this.createMyForm();
      this.myForm = this.createMyForm();
  }

  private createMyForm():FormGroup{
    return this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    });
  }

  public submitFormulario(){
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
    console.log(this.myForm.value);
  }

  public get f():any{
    return this.myForm.controls;
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
