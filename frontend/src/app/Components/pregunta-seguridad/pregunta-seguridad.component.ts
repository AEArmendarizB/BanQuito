import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { respuesta } from 'src/app/models/respuesta';
import { RespuestaService } from 'src/app/services/respuesta.service';


@Component({
  selector: 'app-pregunta-seguridad',
  templateUrl: './pregunta-seguridad.component.html',
  styleUrls: ['./pregunta-seguridad.component.css']
})
export class PreguntaSeguridadComponent {

  respuestaForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router, private _respuestService: RespuestaService){

    
    this.respuestaForm =  this.fb.group({
      respuesta: ['', Validators.required],
    })
  }

  validar(){
    
    const RESPUESTA: respuesta = {

      respuesta: this.respuestaForm.get('respuesta')?.value,

    }

    console.log(RESPUESTA)
    this._respuestService.saveRespuesta(RESPUESTA).subscribe(data =>{

      this.router.navigate(['/']);

    })

  }



  
}
