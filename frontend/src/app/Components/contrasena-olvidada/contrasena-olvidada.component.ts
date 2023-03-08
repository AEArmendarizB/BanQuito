import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UsuarioService } from 'src/app/services/usuario/usuarios.service';

@Component({
  selector: 'app-contrasena-olvidada',
  templateUrl: './contrasena-olvidada.component.html',
  styleUrls: ['./contrasena-olvidada.component.css']
})
export class ContrasenaOlvidadaComponent implements OnInit {
  public formPass!: FormGroup;

  public cedula: String;
  public usuario: String;
  public contrasena: String;
  public pregunta:String;
  public correo:String;

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private toastr: ToastrService,
    private _clienteService: ClienteService,
    private _usuarioService: UsuarioService,
  ){
    this.cedula= '';
    this.usuario='';
    this.contrasena='';
    this.pregunta='';
    this.correo='';
  }
  ngOnInit(): void {
    this.formPass = this.fb.group({
      cedula: ['', Validators.required]
    });
  }

  //CONTROL DE FORMULARIOS
  public get f(): any {
    return this.formPass.controls;
  }

  public submitFormulario() {
    if(this.formPass.invalid){
      Object.values(this.formPass.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      this.toastr.error('Ingrese una cédula válida', 'ERROR !!!');
      return;
    }
    this.cambiarCredenciales();
  }

  cambiarCredenciales(){
    this.cedula = this.formPass.get('cedula')?.value.toString();
    const nombre = {cedula: this.cedula};
    this._clienteService.obtenerCliente(nombre).subscribe(data=>{
      if(data.message == 404){
        this.toastr.error('La cédula no corresponde a ningún usuario', 'Error, No existe el usuario!');
      }else{
        if(data.state.toString() == 'true'){
          //----------------------------
          this.correo = data.correo_electronico.toString();

          //extraer las credenciales del usuario
          this.actualiarCredenciales();
        }else if(data.state.toString() == 'false'){
          this.toastr.error('EL usuario se encuentra deshabilitado, comuniquese con el banco', 'Usuario bloqueado');
        }
      }
    });
    
  }

  actualiarCredenciales(){
    var usr = this.generarCredenciales();
    var pass= this.generarCredenciales();

    this.usuario = usr;
    this.contrasena = pass;

    const new_user = { 
      username: this.usuario,
      password: this.contrasena,
      cedula: this.cedula,
      isNew: true
    };

    this._usuarioService.actualizarUsuario(new_user).subscribe(data => {
    }, error => {
      console.log(error);
    });

    this.enviarCredenciales();
  }

  enviarCredenciales(){
    const emailNew = {
      username: this.usuario,
      pass: this.contrasena,
      correo: this.correo
    }

    this._usuarioService.correoTemporales(emailNew).subscribe(data => {
    });

    this.toastr.success('Se han enviado las nuevas credenciales a su correo.', 'CREDENCIALES RESTABLECIDAS');
    this.router.navigate(['/login']);
  }

  generarCredenciales(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < 8; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
  }
}
