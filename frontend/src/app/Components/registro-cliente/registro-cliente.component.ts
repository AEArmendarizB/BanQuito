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
  formularioCuenta: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService) {
    //Cliente
    this.formularioCliente = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern("^([A-Za-zñáéíóúÁÉÍÓÚ']+( [A-Za-zñáéíóúÁÉÍÓÚ'])*)*$")]], //regex valida palabas y palabras unidas por un espacio
      apellidos: ['', [Validators.required, Validators.pattern("^([A-Za-zñáéíóúÁÉÍÓÚ']+( [A-Za-zñáéíóúÁÉÍÓÚ'])*)*$")]],
      cedula: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      codDactilar: ['', [Validators.required, Validators.pattern("^([A-Za-z]{1}[0-9]{4}){2}$")]],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      domicilio: ['', [Validators.required, Validators.maxLength(100)]],
      ocupacion: ['', [Validators.required, Validators.maxLength(100)]],
      numeroTelefono: ['', [Validators.required, Validators.pattern("^09[0-9]{8}$")]]
    });
    //Cuenta
    this.formularioCuenta = this.fb.group({
      cedula: ['', Validators.required],
      tipo_cuenta: ['', Validators.required],
      monto_inicial: ['', Validators.required],
      ingreso_promedio: ['', Validators.required],
      numero_cuenta: ['', Validators.required],
    });
  }
  //get
  get fCliente() { return this.formularioCliente.controls }

  agregarCliente() {
    const CLIENTE: Cliente = {
      nombres: this.formularioCliente.get('nombres')?.value,
      apellidos: this.formularioCliente.get('apellidos')?.value,
      cedula: this.formularioCliente.get('cedula')?.value,
      codigo_dactilar: this.formularioCliente.get('codDactilar')?.value,
      fecha_nacimiento: this.formularioCliente.get('fechaNacimiento')?.value,
      correo_electronico: this.formularioCliente.get('email')?.value,
      direccion: this.formularioCliente.get('domicilio')?.value,
      ocupacion: this.formularioCliente.get('ocupacion')?.value,
      numero_telefono: this.formularioCliente.get('numeroTelefono')?.value
    }
    console.log(CLIENTE);
    if (this.formularioCliente.valid) {
      console.log('VALID')
      this.toastr.info('El Cliente se registro con exito!', 'Cliente registrado');
    } else {
      console.log('INVALID')
      this.toastr.error('Revisa las entradas ingresadas en el formulario', 'Cliente no registrado');      
    }
  }
  ngOnInit(): void {
  }

}
