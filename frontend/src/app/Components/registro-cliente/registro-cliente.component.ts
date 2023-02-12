import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/clientes';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {
  formularioCliente: FormGroup;

  constructor(private fb: FormBuilder, 
    private toastr: ToastrService){
      //Cliente
    this.formularioCliente = this.fb.group({
      nombres:  ['',Validators.required],
      apellidos: ['',Validators.required],
      cedula: ['',Validators.required],
      codDactilar: ['',Validators.required],
      fechaNacimiento: ['',Validators.required],
      email: ['',Validators.required],
      domicilio: ['',Validators.required],
      ocupacion: ['',Validators.required],
      numeroTelefono: ['',Validators.required]
    });
  }
  agregarCliente(){
    const CLIENTE: Cliente = {
      nombres: this.formularioCliente.get('nombres')?.value,
      apellidos: this.formularioCliente.get('apellidos')?.value,
      cedula: this.formularioCliente.get('cedula')?.value,
      codigo_dactilar: this.formularioCliente.get('codDactilar')?.value,
      fecha_nacimiento: this.formularioCliente.get('fechaNacimiento')?.value,
      correo_electronico:this.formularioCliente.get('email')?.value,
      direccion: this.formularioCliente.get('domicilio')?.value,
      ocupacion: this.formularioCliente.get('ocupacion')?.value,
      numero_telefono: this.formularioCliente.get('numeroTelefono')?.value
    }
    console.log(CLIENTE);
    this.toastr.info('El Cliente se registro con exito!','Cliente registrado');
  }
  ngOnInit(): void {
  }

}
