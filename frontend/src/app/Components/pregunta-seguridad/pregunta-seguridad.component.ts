import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { respuesta } from 'src/app/models/respuesta';
//import { RespuestaService } from 'src/app/services/respuesta.service';
import { UsuarioService } from 'src/app/services/usuario/usuarios.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-pregunta-seguridad',
  templateUrl: './pregunta-seguridad.component.html',
  styleUrls: ['./pregunta-seguridad.component.css']
})
export class PreguntaSeguridadComponent {

  respuestaForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router, private toastr: ToastrService, private _usuarioService: UsuarioService,){

    
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
    
    
    console.log(pregunta.cedula);
    
    

    this._usuarioService.verificarPregunta(pregunta).subscribe(data => {
      
      if(data.message == "true"){

        
        //this.router.navigate(['/usuario'], { state: { cedula } });
        this.toastr.success('Ingreso exitoso');
        this.router.navigate(['/menu'], { state: { cedula } });


      }else{


        this.toastr.error(data.message);
        
      }
      
    }, error => {
      console.log(error);
    });

    
    
    

    


   

  }



  
}