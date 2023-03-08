import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public usuario: String;
  public contrasena: String;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _clienteService: ClienteService,
    private _usuarioService: UsuarioService
  ){
    this.usuario='';
    this.contrasena='';
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
    const cedula = this.formPass.get('cedula')?.value.toString();
    console.log(cedula);
    const nombre = {cedula: cedula};
    this._clienteService.obtenerCliente(nombre).subscribe(data=>{
      console.log(data);

      if(data.message == 404){
        this.toastr.error('La cédula no corresponde a ningún usuario', 'Error, No existe el usuario!');
      }else{
        if(data.state.toString() == 'true'){
          //----------------------------
          var correo = data.correo_electronico.toString();
          //var nombre = data.nombres.toString();

          //Activar el mensaje de éxito
          document.getElementById('exito')!.style.display = '';

          //extraer las credenciales del usuario
          this.extraerCredenciales(cedula,correo);

          //this.enviarCorreo(correo);
        }else if(data.state.toString() == 'false'){
          this.toastr.error('EL usuario se encuentra deshabilitado, comuniquese con el banco', 'Usuario bloqueado');
        }
      }
    });
    
  }

  extraerCredenciales(id: String, mail:String){
    const cedula = {cedula: id};
    this._usuarioService.getUsuario(cedula).subscribe(data=>{
      console.log(data);
      this.usuario=data.username.toString();
      this.contrasena=data.password.toString();
      console.log(this.usuario);
      console.log(this.contrasena);

    });
  }

  actualiarCredenciales(){
    var usr = this.generarCredenciales();
    var pass= this.generarCredenciales();
    console.log(usr);
    console.log(pass);
  }

  enviarCredenciales(){

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
