import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { respuesta } from 'src/app/models/respuesta';
//import { RespuestaService } from 'src/app/services/respuesta.service';
import { UsuarioService } from 'src/app/services/usuario/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cliente } from 'src/app/models/clientes';


@Component({
  selector: 'app-pregunta-seguridad',
  templateUrl: './pregunta-seguridad.component.html',
  styleUrls: ['./pregunta-seguridad.component.css']
})
export class PreguntaSeguridadComponent {
  private bande = 0;
  respuestaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private toastr: ToastrService, 
    private _usuarioService: UsuarioService,
    private _clienteservice: ClienteService,
    ){

    
    this.respuestaForm =  this.fb.group({
      //nombres: ['', [Validators.required, Validators.pattern("^([A-Za-zñáéíóúÁÉÍÓÚ']+( [A-Za-zñáéíóúÁÉÍÓÚ'])*)*$")]],
      respuesta: ['', [Validators.required, Validators.pattern("^([A-Za-zñáéíóúÁÉÍÓÚ']+( [A-Za-zñáéíóúÁÉÍÓÚ'])*)*$")]],
    })
  }

  ngOnInit(): void {
    //error,info,success
    //rojo,azul,verde
    //this.toastr.error('Revisa las entradas ingresadas en el formulario: COD500', 'Cuenta no registrada');

  }

  validar(){
    const cedula = history.state.cedulaObj;

    const pregunta = {
      cedula:  cedula.cedula,
      pregunta: this.respuestaForm.get('respuesta')?.value,
    }
    this._usuarioService.verificarPregunta(pregunta).subscribe(data => {
      
      if(data.message == "true"){

        //this.router.navigate(['/usuario'], { state: { cedula } });
        this.toastr.success('Ingreso exitoso');
        //Enviar correo de login exitoso
        this.bande=1;
        this.enviarCorreo();
        this.router.navigate(['/menu'], { state: { cedula } });

      }else{
        //enviar correo de login fallido
        this.toastr.error(data.message);
        this.bande =0;
        this.enviarCorreo();
        this.router.navigate(['/']);
        
      }     
    }, error => {
      console.log(error);
    });
  }
  enviarCorreo(){
    const cedula = history.state.cedulaObj;
    this._clienteservice.obtenerCliente(cedula).subscribe(data=>{
      let cliente = <Cliente>data;
      const correoObj = {correo:cliente.correo_electronico};
      if(this.bande==1){
        this._clienteservice.loginExitoso(correoObj).subscribe(data=>{})
      }else{
        this._clienteservice.loginFallido(correoObj).subscribe(data=>{})
      }
      
    })
  }



  
}