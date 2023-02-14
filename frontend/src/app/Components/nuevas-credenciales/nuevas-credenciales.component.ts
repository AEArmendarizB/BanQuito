import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login.usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nuevas-credenciales',
  templateUrl: './nuevas-credenciales.component.html',
  styleUrls: ['./nuevas-credenciales.component.css']
})
export class NuevasCredencialesComponent implements OnInit{
  title = 'Nuevas credenciales BanQuito';

  public FormNuevasCredenciales!:FormGroup;

  constructor(private fb: FormBuilder,private router: Router, private _usuarioService: UsuarioService ){
    this.FormNuevasCredenciales = this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    });
  }
  
  ngOnInit(): void {
      
  }

  public submitFormulario(){
    if(this.FormNuevasCredenciales.invalid){
      Object.values(this.FormNuevasCredenciales.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
    console.log(this.FormNuevasCredenciales.value);
    
    this.crearUsuario();
  }

  public get f():any{
    return this.FormNuevasCredenciales.controls;
  }

  crearUsuario(){
    const NEW_USUARIO: LoginUsuario={
      username: this.FormNuevasCredenciales.get('usuario')?.value,
      password: this.FormNuevasCredenciales.get('password')?.value
    };
    /*console.log(LOGIN_USUARIO);
    console.log(LOGIN_USUARIO.username);*/
    //this.verificarUsuario(NEW_USUARIO);
  }
}