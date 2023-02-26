import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/models/login.usuario';
import { Usuario } from 'src/app/models/usuarios';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuarioService: UsuarioService,
    private toastr: ToastrService

  ) {
    this.myForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public submitFormulario() {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    console.log(this.myForm.value);

    this.crearUsuario();
  }

  public get f(): any {
    return this.myForm.controls;
  }

  crearUsuario() {
    const LOGIN_USUARIO: LoginUsuario = {
      username: this.myForm.get('usuario')?.value,
      password: this.myForm.get('password')?.value
    };
    /*console.log(LOGIN_USUARIO);
    console.log(LOGIN_USUARIO.username);*/
    this.verificarUsuario(LOGIN_USUARIO);
  }

  verificarUsuario(login: LoginUsuario) {
    console.log(login.username);
    this._usuarioService.verificarUsuario(login).subscribe(data => {
      console.log('hola ' + login.username);
      console.log('hola contraseña: ' + login.password);
      console.log(data);
      if (login.username == "admin" && login.password == "admin") {
        this.toastr.success('Bienvenido usuario Administrador', 'Login Exitoso!');
        this.router.navigate(['/menu-admin']);
      } else {
        console.log(data.message);

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
            this.router.navigate(['/pregunta']);
            this.toastr.success('Por favor, a continuacion ingresa la respuesta de tu pregunta de seguridad', 'Login Exitoso!');
            break;
          case true:

            const cedula = data.cedula;
            const cedulaObj = { cedula: cedula };
            this.router.navigate(['/usuario'], { state: { cedulaObj } });
            //this.router.navigate(['/usuario']);
            this.toastr.info('Por favor, a continuación debes cambiar tus credenciales', 'Usuario con claves temporales');
            break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
}
