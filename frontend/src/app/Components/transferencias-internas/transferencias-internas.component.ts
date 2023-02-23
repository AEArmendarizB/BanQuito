import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transferencias-internas',
  templateUrl: './transferencias-internas.component.html',
  styleUrls: ['./transferencias-internas.component.css']
})
export class TransferenciasInternasComponent {
  TraInternaForm: FormGroup;


  constructor(private fb: FormBuilder){
    this.TraInternaForm = this.fb.group({
      cuentaOrigen: ['',Validators.required],
      monto: ['',Validators.required],
      cuentaDestino: ['',Validators.required],
      descripcion: ['',Validators.required],
    });
  }
}
