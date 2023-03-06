import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/models/login.usuario';
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

  //Control de formulario
  public control: number;

  //Verificacion
  public id:string;
  public correo:string;
  public codigo:string;

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
    //Control de formularios
    this.control=0 ;

    //Datos para el codigo OTP
    this.id='';
    this.correo='';
    this.codigo='';
  }

  ngOnInit(): void {
    this.activarCuadros();
  }

  //FUNCION PARA ENCRIPTAR LA CONTRASEÑA
  hashPassword(password: string): string {
    let hash = 0;

    if (password.length === 0) {
      return hash.toString();
    }

    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    return hash.toString();
  }

  public activarCuadros(){
    switch(this.control){
      case 0:
        document.getElementById('otp')!.style.display = 'none';
        document.getElementById('user')!.style.display = 'block';
        document.getElementById('pass')!.style.display = 'block';
        break;

      case 1:
        document.getElementById('otp')!.style.display = 'block';
        document.getElementById('user')!.style.display = 'none';
        document.getElementById('pass')!.style.display = 'none';
        break;
      
    }
  }

  public submitFormulario() {
    this.crearUsuario();
  }

  public get f(): any {
    return this.myForm.controls;
  }

  crearUsuario() {
    switch(this.control){
      case 0:
        var LOGIN_USR: LoginUsuario = {
          username: this.myForm.get('usuario')?.value,
          password: this.myForm.get('password')?.value
        };

        //validación para ver si es un nuevo usuario, admin o usuario viejo
        this._usuarioService.verificarUsuario(LOGIN_USR).subscribe(data => {
          if (LOGIN_USR.username == "4dm1n87" && LOGIN_USR.password == "adMinB4nW@k1t0") {
            this.toastr.success('Bienvenido usuario Administrador', 'Login Exitoso!');
            this.router.navigate(['/menu-admin']);
          }
          else{
            switch (data.message) {
              case 1: //En caso de no ser nuevo usuario, la contrasena se encripta
                const password = this.myForm.get('password')?.value;
                const hashedPassword = this.hashPassword(password);

                const LOGIN_USUARIO: LoginUsuario = {
                  username: this.myForm.get('usuario')?.value,
                  password: hashedPassword
                };
                this.verificarUsuario(LOGIN_USUARIO);
                break;

              case true: //En caso de ser usuario nuevo, se envian las credenciales tal como se ingresan
                this.verificarUsuario(LOGIN_USR);
                break;
            }
          }
        }, error => {
          console.log(error);
        });
        break;

      case 1:
        this.verificarOTP();
        break;
        
    }
  }

  verificarUsuario(login: LoginUsuario) {
    this._usuarioService.verificarUsuario(login).subscribe(data => {
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
            this.id = data.cedula;
            this.extraerCorreo();
            break;
          case true:
            const cedula = data.cedula;
            const cedulaObj = { cedula: cedula };
            this.router.navigate(['/usuario'], { state: { cedulaObj } });
            this.toastr.info('Por favor, a continuación debes cambiar tus credenciales', 'Usuario con claves temporales');
            break;
        }
      }, error => {
          console.log(error);
    });
  }

  verificarOTP(){
    const cedula = this.id;
    const cedulaObj = { cedula: cedula };
    var codigo = this.codigo;
    let patron="^"+codigo+"$";  
    var otp = this.myForm.get('otp')!.value.toString();
    if(otp.match(patron)==null){
      this.toastr.error('El código no coincide', 'Error, código inválido');
    }else{
      this.router.navigate(['/pregunta'] , { state: { cedulaObj } });
      this.toastr.success('Por favor, a continuacion ingresa la respuesta de tu pregunta de seguridad', 'Login Exitoso!');
    };
  }

  extraerCorreo(){
    const cedula = this.id;
    const nombre = {cedula: cedula};
    this._clienteService.obtenerCliente(nombre).subscribe(data=>{
      if(data.state.toString() == 'true'){
        //control de formularios
        this.control++;
        this.activarCuadros();
        //----------------------------
        this.correo = data.correo_electronico.toString();
        this.enviarCorreo(this.correo);
      }else if(data.state.toString() == 'false'){
        this.toastr.error('EL usuario se encuentra deshabilitado, comuniquese con el banco', 'Usuario bloqueado');
      }
    });

  }

  enviarCorreo(email:string){
    const correo = { correo: email }
    this._clienteService.validarCorreoLogin(correo).subscribe(data => {
        this.codigo = data.toString();
      });
  }
}
