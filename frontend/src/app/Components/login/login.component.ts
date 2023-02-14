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
  private LOGIN_USUARIO:any; 

  constructor(private fb: FormBuilder,private router: Router, private _usuarioService: UsuarioService ){
    this.myForm = this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public submitFormulario(){
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
    console.log(this.myForm.value);
    
    this.crearUsuario();
  }

  public get f():any{
    return this.myForm.controls;
  }

  crearUsuario(){
    const LOGIN_USUARIO: Usuario={
      cedula: 0,
      username: this.myForm.get('usuario')?.value,
      password: this.myForm.get('password')?.value,
      pregunta: ''
    };
    console.log(LOGIN_USUARIO);
    this.verificarUsuario();
  }

  verificarUsuario(){
    this._usuarioService.verificarUsuario(this.LOGIN_USUARIO).subscribe(data =>{
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
