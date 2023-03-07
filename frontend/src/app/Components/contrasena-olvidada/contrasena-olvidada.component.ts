import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contrasena-olvidada',
  templateUrl: './contrasena-olvidada.component.html',
  styleUrls: ['./contrasena-olvidada.component.css']
})
export class ContrasenaOlvidadaComponent implements OnInit {

  public formPass!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ){

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
      this.toastr.error('Ingrese una cédula', 'ERROR !!!');
      return;
    }
    this.cambiarCredenciales();
  }

  cambiarCredenciales(){
    console.log('hola');
  }
}
