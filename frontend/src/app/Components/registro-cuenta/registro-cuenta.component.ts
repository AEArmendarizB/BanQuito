import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cuenta } from '../../models/cuentas';
import { CuentaService } from '../../services/cuenta/cuenta.service';

@Component({
  selector: 'app-registro-cuenta',
  templateUrl: './registro-cuenta.component.html',
  styleUrls: ['./registro-cuenta.component.css']
})
export class RegistroCuentaComponent implements OnInit {
  formularioCedula: FormGroup;
  formularioCuenta: FormGroup;

  @ViewChild('spanNumCuenta') cuenta!: ElementRef;
  @ViewChild('infoCuentaNueva') infoCuentaNueva!: ElementRef;
  @ViewChild('infoCuentas') infoCuentas!: ElementRef;
  private num: String = "";
  public showForm = false;
  public nombres = "";
  constructor(
    private fb: FormBuilder,
    private _cuentaService: CuentaService,
    private _clienteService: ClienteService,
    private toastr: ToastrService,
    private renderer2: Renderer2,
  ) {
    //Cedula
    this.formularioCedula = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
    });
    //Cuenta
    this.formularioCuenta = this.fb.group({
      tipo_cuenta: ['', Validators.required],
      monto_inicial: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      ingreso_promedio: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      numero_cuenta: ['', Validators.required],
    });

  }
  ngOnInit(): void {
  }

  buscarCliente() {
    let cuentas = [];
    let num_cuentas;
    let salida: string;
    let CI = this.formularioCedula.get('cedula')?.value;
    const cedula = { cedula: CI };
    const infoCuentas = this.infoCuentas.nativeElement;
    this._clienteService.obtenerCliente(cedula).subscribe(
      data => {
        const cliente = <Cliente>data;
        this.nombres = <string> cliente.nombres;
        switch (data.message) {
          case (404): {
            this.toastr.error('No se encontró un cliente registrado con ese número de cedula', 'Cliente no registrado');
            console.log("Error del servidor mi 🔑");
            this.renderer2.setProperty(infoCuentas, 'innerHTML', "No se encontraron cuentas");
            this.showForm = false;
            break;
          }
          case (500): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario', 'Cliente no registrado');
            console.log("No se guardo el dato mi 🔑");
            this.renderer2.setProperty(infoCuentas, 'innerHTML', "Cuentas no encontradas");
            this.showForm = false;
            break;
          }
          default: {
            this.toastr.success("Cliente encontrado dentro de la base de datos", "Cliente encontrado");
            this.showForm = true;
            this._cuentaService.getCuentaByCI(cedula).subscribe(
              data => {
                this._clienteService
                cuentas = data;
                console.log(cuentas)
                num_cuentas = cuentas.length;
                console.log('Los datos recolectados del usuario: ' + cedula.cedula + " son:")
                console.log('La cuentas encontradas: ' + num_cuentas);
                if (num_cuentas > 0) {
                  salida = this.printCuentas(cuentas)
                  this.renderer2.setProperty(infoCuentas, 'innerHTML', salida);
                } else {
                  this.renderer2.setProperty(infoCuentas, 'innerHTML', "El usuario no tiene cuentas registradas");
                }
              }
            );
            break;
          }
        }

      });

  }
  printCuentas(cuentas: string[]) {
    //numero de parametros dentro de la base de datos.
    let numParams = 7;
    let salida = "Cuentas Disponibles:<br>"+ "-".repeat(20);
    for (let i = 0; i < cuentas.length; i++) {
      const cuenta = <Cuenta><unknown>cuentas[i];
      salida = salida + '<br>' +
        "CUENTA: " + (i + 1) + '<br>' +
        "ID: " + cuenta._id + '<br>' +
        "Número de cuenta: " + cuenta.numero_cuenta + '<br>' +
        "Cédula: " + cuenta.cedula + '<br>';
      if (cuenta.tipo_cuenta == '10') {
        salida = salida +
          "Tipo de cuenta: Ahorros" + '<br>';
      } else if (cuenta.tipo_cuenta == '20') {
        salida = salida +
          "Tipo de cuenta: Corriente" + '<br>';
      }
      salida = salida +
        "Monto: " + cuenta.monto_inicial + '<br>' +
        "Ingresos promedio del cliente: " + cuenta.ingreso_promedio + '<br>';
      if (cuenta.state) {
        salida = salida +
          "Estado de la cuenta: Activo" + '<br>';
      } else {
        salida = salida +
          "Estado de la cuenta: Pasivo" + '<br>';
      }
      salida = salida + "-".repeat(20);
    }
    return salida;
  }
  printCuenta(cuenta: Cuenta) {
    let numParams = 7;
    let salida = "-".repeat(20);
    salida = salida + '<br>' +
      "Número de cuenta: " + cuenta.numero_cuenta + '<br>' +
      "Cédula: " + cuenta.cedula + '<br>';
    if (cuenta.tipo_cuenta == '10') {
      salida = salida +
        "Tipo de cuenta: Ahorros" + '<br>';
    } else if (cuenta.tipo_cuenta == '20') {
      salida = salida +
        "Tipo de cuenta: Corriente" + '<br>';
    }
    salida = salida +
      "Monto: " + cuenta.monto_inicial + '<br>' +
      "Ingresos promedio del cliente: " + cuenta.ingreso_promedio + '<br>';
    if (cuenta.state) {
      salida = salida +
        "Estado de la cuenta: Activo" + '<br>';
    } else {
      salida = salida +
        "Estado de la cuenta: Pasivo" + '<br>';
    }
    salida = salida + "-".repeat(20);
    return salida;
  }
  corriente() {
    //20 para corriente
    const numCuenta = this.cuenta.nativeElement;
    let cuenta = {
      ahorro: false,
      digitos: 12
    }
    this._cuentaService.generarNumCuenta(cuenta).subscribe(
      data => {
        this.renderer2.setProperty(numCuenta, 'innerHTML', data.numero);
        this.formularioCuenta.patchValue({ tipo_cuenta: '20' });
        this.formularioCuenta.patchValue({ numero_cuenta: data.numero });
      });
  }
  ahorros() {
    //10 para corriente
    const numCuenta = this.cuenta.nativeElement;
    let cuenta = {
      ahorro: true,
      digitos: 12
    }
    this._cuentaService.generarNumCuenta(cuenta).subscribe(
      data => {
        this.renderer2.setProperty(numCuenta, 'innerHTML', data.numero);
        this.formularioCuenta.patchValue({ tipo_cuenta: '10' });
        this.formularioCuenta.patchValue({ numero_cuenta: data.numero });
      });

  }
  agregarCuenta() {
    let salida: string;
    const CUENTA: Cuenta = {
      cedula: this.formularioCedula.get('cedula')?.value,
      tipo_cuenta: this.formularioCuenta.get('tipo_cuenta')?.value,
      monto_inicial: this.formularioCuenta.get('monto_inicial')?.value,
      ingreso_promedio: this.formularioCuenta.get('ingreso_promedio')?.value,
      numero_cuenta: this.formularioCuenta.get('numero_cuenta')?.value,
      //State define si el usuario esta activo=>true o pasivo=>false
      state: true

    }
    //Mostramos info de la cuenta
    const info = this.infoCuentaNueva.nativeElement;
    const infoCuentas = this.infoCuentas.nativeElement;
    salida = this.printCuenta(CUENTA);
    this.renderer2.setProperty(info, 'innerHTML', salida);
    this.renderer2.setProperty(infoCuentas, 'innerHTML', " ");


    //Envio de datos
    if (this.formularioCuenta.valid) {
      console.log('VALID');
      this.guardarCuenta(CUENTA);
    } else {
      console.log('INVALID');
      this.guardarCuenta(CUENTA);
    }
  }
  guardarCuenta(cuenta: Cuenta) {
    this._cuentaService.guardarCuenta(cuenta).subscribe(
      data => {
        switch (data.message) {
          case (200): {
            this.toastr.info('La cuenta se registro con exito!', 'Cuenta registrada');
            console.log("Todo bien mi 🔑, el dato si se ingreso, re piola rey!");
            this.showForm = false
            break;
          }
          case (404): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario: COD404', 'Cuenta no registrado');
            console.log("Error del servidor mi 🔑");
            break;
          }
          case (500): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario: COD500', 'Cuenta no registrada');
            console.log("No se guardo el dato mi 🔑");
            break;
          }
        }
      }
    )
  }
}
