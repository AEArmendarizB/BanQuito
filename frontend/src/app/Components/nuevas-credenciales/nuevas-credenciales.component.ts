import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  public NEW_USUARIO: any;

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private _usuarioService: UsuarioService,
    private toastr: ToastrService
  ){
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
      this.toastr.error('Usuario o contraseña inválidos', 'ERROR!');
      return;
    }
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
    this.actualizarUsuario(NEW_USUARIO);
  }

  actualizarUsuario(nuevo_usuario:LoginUsuario){
    const cedula = history.state.cedulaObj;
    const new_user = { username: nuevo_usuario.username, 
                  password: nuevo_usuario.password,
                  cedula: history.state.cedulaObj.cedula,
    };

    this._usuarioService.verificarUsername(new_user).subscribe(data =>{
      switch (data.message){
        case true:
          this.toastr.error('Ese nombre de usuario ya está en uso', 'ERROR!');
          break;
        
        case false:
          this._usuarioService.actualizarUsuario(new_user).subscribe(data => {
            //console.log(data);
          }, error => {
            console.log(error);
          });
      
          this.toastr.success('Se han cambiado las credenciales.', 'CAMBIO EXITOSO ');
          this.router.navigate(['/login']);
          break;
      }
    },error => {
      console.log(error);
    });
  }
}