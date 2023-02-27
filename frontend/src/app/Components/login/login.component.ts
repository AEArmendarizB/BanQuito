import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/models/login.usuario';
import { LoginUsuarioOTP } from 'src/app/models/loginOTP';
import { Usuario } from 'src/app/models/usuarios';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'BanQuito';
  public myForm!: FormGroup;
  public LOGIN_USUARIO: any;
  public control: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuarioService: UsuarioService,
    private toastr: ToastrService,
    private _clienteService: ClienteService

  ) {
    this.myForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      otp: ['', Validators.required]
    });
    this.control=0 ;
  }

  ngOnInit(): void {
    this.control=0 ;
    this.activarCuadros();
  }

  public activarCuadros(){
    switch(this.control){
      case 0:
        document.getElementById('otp')!.style.display = 'none';
        break;

      case 1:
        document.getElementById('otp')!.style.display = 'block';
        document.getElementById('user')!.style.display = 'none';
        document.getElementById('pass')!.style.display = 'none';
        break;
    }
  }

  public submitFormulario() {
    /*if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAllAsTouched();
        //document.getElementById('btn')?.setAttribute('disabled', ''); //Desactivar el boton
      });
      return;
    }*/
    
    console.log(this.myForm.value);
    this.crearUsuario();
  }

  public get f(): any {
    return this.myForm.controls;
  }

  crearUsuario() {
    switch(this.control){
      case 0:
        const LOGIN_USUARIO: LoginUsuario = {
          username: this.myForm.get('usuario')?.value,
          password: this.myForm.get('password')?.value
        };

        this.verificarUsuario(LOGIN_USUARIO);
        break;

      case 1:
        const LOGIN_USUARIO_OTP: LoginUsuario = {
          username: this.myForm.get('usuario')?.value,
          password: this.myForm.get('password')?.value,
          //otp: this.myForm.get('otp')?.value
        };
        this.verificarOTP();
        break;
        
    }
    /*const LOGIN_USUARIO: LoginUsuario = {
      username: this.myForm.get('usuario')?.value,
      password: this.myForm.get('password')?.value
    };
    console.log(LOGIN_USUARIO);
    console.log(LOGIN_USUARIO.username);
    this.verificarUsuario(LOGIN_USUARIO);*/
  }

  verificarUsuario(login: LoginUsuario) {
    this._usuarioService.verificarUsuario(login).subscribe(data => {
        console.log(data);
        if (login.username == "admin" && login.password == "admin") {
          this.toastr.success('Bienvenido usuario Administrador', 'Login Exitoso!');
          this.router.navigate(['/menu-admin']);
        }
        else{
          switch (data.message) {
            case 0:
              console.log({ message: 'Hubo un error' });
              this.toastr.error('No se pudo conectar con el servidor y la base de datos', 'Error, conexión fallida con el servidor!');
              break;
            case 1:
              console.log({ message: 'No se pudo encontrar el usuario' })
              this.toastr.error('Usuario o contraseña incorrectos', 'Error, No existe el usuario!');
              break;
            case false:
              //this.router.navigate(['/pregunta']);
              //this.toastr.success('Por favor, a continuacion ingresa la respuesta de tu pregunta de seguridad', 'Login Exitoso!');
              //control de formulario
              this.control++;
              this.activarCuadros();
              break;
            case true:
              const cedula = data.cedula;
              const cedulaObj = { cedula: cedula };
              this.router.navigate(['/usuario'], { state: { cedulaObj } });
              this.toastr.info('Por favor, a continuación debes cambiar tus credenciales', 'Usuario con claves temporales');
              break;
          }
        }
    }, error => {
      console.log(error);
    });
  }

  verificarOTP(){

  }

  OTP(){

  }
}
