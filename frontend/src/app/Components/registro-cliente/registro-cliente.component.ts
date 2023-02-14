import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/clientes';
import { Cuenta } from 'src/app/models/cuentas';
import { Usuario } from 'src/app/models/usuarios';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  formularioCliente: FormGroup;
  formularioCuenta: FormGroup;
  formularioUsuario: FormGroup;

  @ViewChild('spanNumCuenta') cuenta!: ElementRef;
  @ViewChild('botonPregunta') pregunta!: ElementRef;
  @ViewChild('user') user!: ElementRef;
  @ViewChild('password') pass!: ElementRef;
  @ViewChild('infoCuenta') infoCuenta!: ElementRef;

  private num: String = "";
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
      domicilio: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{1,50}$')]],
      ocupacion: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{1,50}$')]],
      numeroTelefono: ['', [Validators.required, Validators.pattern("^09[0-9]{8}$")]]
    });
    //Cuenta
    this.formularioCuenta = this.fb.group({
      tipo_cuenta: ['', Validators.required],
      monto_inicial: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      ingreso_promedio: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      numero_cuenta: ['', Validators.required],
    });
    //Usuario
    this.formularioUsuario = this.fb.group({
      pregunta: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{1,25}$')]],
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
    console.log("Cliente: " + CLIENTE);

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
      numero_cuenta: this.formularioCuenta.get('numero_cuenta')?.value
      
    }
    console.log("Cuenta: " + CUENTA);
    //Mostramos info de la cuenta
    const info = this.infoCuenta.nativeElement;

    this.renderer2.setProperty(info, 'innerHTML',
      "Tipo de cuenta: " + CUENTA.tipo_cuenta +
      "<br/>Monto inicial: " + CUENTA.monto_inicial +
      "<br/>Ingresos promedio: " + CUENTA.ingreso_promedio +
      "<br/>Numero de cuenta: " + CUENTA.numero_cuenta +
      "<br/>Cedula del titular: " + CUENTA.cedula
    )
    /// Llamamos a la funcion para poder crear un usuario y contraseña
    const user_login = this.user.nativeElement;
    const pass_login = this.pass.nativeElement;
    this.renderer2.setProperty(user_login, 'value', this.formularioCliente.get('nombres')?.value.split(' ')[0] + this.formularioCliente.get('cedula')?.value.substring(0, 6));
    this.renderer2.setProperty(pass_login, 'value', this.formularioCliente.get('nombres')?.value.split(' ')[1] + this.formularioCliente.get('cedula')?.value.substring(0, 6));

    //Envio de datos
    if (this.formularioCuenta.valid) {
      console.log('VALID')
      this.toastr.info('La cuenta se registro con exito!', 'Cuenta registrado');
    } else {
      console.log('INVALID')
      this.toastr.error('Revisa las entradas ingresadas en el formulario', 'Cuenta no registrado');
    }
  }
  agregarUsuario() {
    const USUARIO: Usuario = {
      cedula: this.formularioCliente.get('cedula')?.value,
      username: this.formularioCliente.get('nombres')?.value.split(' ')[0] + this.formularioCliente.get('cedula')?.value.substring(0, 6),
      password: this.formularioCliente.get('nombres')?.value.split(' ')[1] + this.formularioCliente.get('cedula')?.value.substring(0, 6),
      pregunta: this.formularioUsuario.get('pregunta')?.value,
      isNew: true
    }
    console.log(USUARIO);
    //Envio de datos
    if (this.formularioUsuario.valid) {
      console.log('VALID')
      this.toastr.info('El usuario se registro con exito!', 'Usuario registrado');
    } else {
      console.log('INVALID')
      this.toastr.error('Revisa las entradas ingresadas en el formulario', 'Usuario no registrado');
    }
  }
  pregunta1() {
    const pregunta_seg = this.pregunta.nativeElement;
    this.renderer2.setProperty(pregunta_seg, 'innerHTML', '¿Cu&aacute;l es tu sabor de helado favorito?');
  }
  /*
  pregunta2(){
    const pregunta_seg = this.pregunta.nativeElement;
    this.renderer2.setProperty(pregunta_seg, 'innerHTML', '¿Cu&aacute;l es tu marca de ropa favorita?');
  }*/
  ngOnInit(): void {
  }

}
