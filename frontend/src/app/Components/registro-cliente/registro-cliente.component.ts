import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/clientes';
import { Cuenta } from 'src/app/models/cuentas';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  formularioCliente: FormGroup;
  formularioCuenta: FormGroup;

  @ViewChild('spanNumCuenta') cuenta!: ElementRef;
  private num:String ="";
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private renderer2: Renderer2
  ) {
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
      tipo_cuenta: ['', Validators.required],
      monto_inicial: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      ingreso_promedio: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      numero_cuenta: ['', Validators.required],
    });
  }
  corriente() {
    //20 para corriente
    const numCuenta = this.cuenta.nativeElement;
    this.num = 20 + this.formularioCliente.get('cedula')?.value;
    this.renderer2.setProperty(numCuenta, 'innerHTML', this.num);
    this.formularioCuenta.patchValue({ tipo_cuenta: '20' });
    this.formularioCuenta.patchValue({ numero_cuenta: this.num });
    console.log(this.formularioCuenta);
  }
  ahorros() {
    //10 para corriente
    const numCuenta = this.cuenta.nativeElement;
    this.num = 10 + this.formularioCliente.get('cedula')?.value;
    this.renderer2.setProperty(numCuenta, 'innerHTML', this.num);
    this.formularioCuenta.patchValue({ tipo_cuenta: '10' });
    this.formularioCuenta.patchValue({ numero_cuenta: this.num });
    console.log(this.num);
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

    //
    console.log(CLIENTE);

    //Envio de datos
    if (this.formularioCliente.valid) {
      console.log('VALID')
      this.toastr.info('El Cliente se registro con exito!', 'Cliente registrado');
    } else {
      console.log('INVALID')
      this.toastr.error('Revisa las entradas ingresadas en el formulario', 'Cliente no registrado');
    }
  }
  agregarCuenta() {
    const CUENTA: Cuenta = {
      cedula: this.formularioCliente.get('cedula')?.value,
      tipo_cuenta: this.formularioCuenta.get('tipo_cuenta')?.value,
      monto_inicial: this.formularioCuenta.get('monto_inicial')?.value,
      ingreso_promedio: this.formularioCuenta.get('ingreso_promedio')?.value,
      numero_cuenta:  this.formularioCuenta.get('numero_cuenta')?.value
    }
    console.log(CUENTA);
    /// Llamamos a la funcion para poder crear un usuario y contraseña
  }
  ngOnInit(): void {
  }

}
