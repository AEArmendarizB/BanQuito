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
    this.actualizarUsuario(NEW_USUARIO)
    /*console.log(LOGIN_USUARIO);
    console.log(LOGIN_USUARIO.username);*/
    //this.verificarUsuario(NEW_USUARIO);
  }

  actualizarUsuario(nuevo_usuario:LoginUsuario){
    const cedula = history.state.cedulaObj;
    const new_user = { username: nuevo_usuario.username, 
                  password: nuevo_usuario.password,
                  cedula: history.state.cedulaObj.cedula,
  
    };
    //console.log("Soy el segundo index");
    //console.log(cedula.cedula);
    this._usuarioService.actualizarUsuario(new_user).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });

    this.toastr.success('Se han cambiado las credenciales.', 'CAMBIO EXITOSO ');
    this.router.navigate(['/login']);
    
    /*
    this._usuarioService.verificarUsuario(nuevo_usuario).subscribe(data => {
      if (nuevo_usuario.username == "admin" && nuevo_usuario.password == "admin") {
        this.toastr.success('Ese nombre de usuario ya está en uso', 'ERROR!');
      } else {
        switch (data.message) {
          case 1:
            this._usuarioService.actualizarUsuario(new_user).subscribe(data => {
              console.log(data);
            }, error => {
              console.log(error);
            });
            this.toastr.success('Se han cambiado las credenciales.', 'CAMBIO EXITOSO ');
            this.router.navigate(['/login']);
            break;
          case false:
            this.toastr.success('Ese nombre de usuario ya está en uso', 'ERROR!');
            break;
          case true:
            this.toastr.success('Ese nombre de usuario ya está en uso', 'ERROR!');
            break;
        }
      }
    }, error => {
      console.log(error);
    });*/
  }
}