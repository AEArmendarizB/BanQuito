import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cuenta } from 'src/app/models/cuentas';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';

@Component({
  selector: 'app-registro-cuenta',
  templateUrl: './registro-cuenta.component.html',
  styleUrls: ['./registro-cuenta.component.css']
})
export class RegistroCuentaComponent {
  formularioCedula: FormGroup;
  formularioCuenta: FormGroup;

  @ViewChild('#infoCuenta') infoCuenta!: ElementRef;
  @ViewChild('spanNumCuenta') cuenta!: ElementRef;
  @ViewChild('infoCuentaNueva') infoCuentaNueva!: ElementRef;

  private num: String = "";

  constructor(
    private fb: FormBuilder,
    private _cuentaService: CuentaService,
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

  buscarCliente() {
    let CI = this.formularioCedula.get('cedula')?.value;
    console.log(CI);
    this._cuentaService.getCuentaByCI(CI).subscribe(
      data => {
        console.log(data.message);
        switch (data.message) {
          case (404): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario: COD404', 'Usuario no registrado');
            console.log("Error del servidor mi 🔑");
            break;
          }
          case (500): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario: COD500', 'Usuario no registrado');
            console.log("No se encontró el dato mi 🔑");
            break;
          }
          default: { 
            //data tiene el objeto cuenta/ si el usuario tiene mas de una cuenta, se muestran todas.
            this.toastr.info('El usuario existe dentro de la base de datos', 'Usuario Encontrado!');
            
            const info_cuenta = this.infoCuenta.nativeElement;
            this.renderer2.setProperty(info_cuenta, 'innerHTML',   
            "Tipo de cuenta: " + data.tipo_cuenta +
            "<br/>Monto inicial: " + data.monto_inicial +
            "<br/>Ingresos promedio: " + data.ingreso_promedio +
            "<br/>Numero de cuenta: " + data.numero_cuenta +
            "<br/>Cedula del titular: " + data.cedula);
            break; 
         } 
        }
      }
    );
  }

  corriente() {
    //20 para corriente
    const numCuenta = this.cuenta.nativeElement;
    this.num = 20 +"NUMERODECUENTA";
    this.renderer2.setProperty(numCuenta, 'innerHTML', this.num);
    this.formularioCuenta.patchValue({ tipo_cuenta: '20' });
    this.formularioCuenta.patchValue({ numero_cuenta: this.num });
    console.log(this.num);
  }
  ahorros() {
    //10 para corriente
    const numCuenta = this.cuenta.nativeElement;
    this.num = 10 + "NUMERODECUENTA";
    this.renderer2.setProperty(numCuenta, 'innerHTML', this.num);
    this.formularioCuenta.patchValue({ tipo_cuenta: '10' });
    this.formularioCuenta.patchValue({ numero_cuenta: this.num });
    console.log(this.num);
  }
  agregarCuenta() {
    const CUENTA: Cuenta = {
      cedula: this.formularioCedula.get('cedula')?.value,
      tipo_cuenta: this.formularioCuenta.get('tipo_cuenta')?.value,
      monto_inicial: this.formularioCuenta.get('monto_inicial')?.value,
      ingreso_promedio: this.formularioCuenta.get('ingreso_promedio')?.value,
      numero_cuenta: this.formularioCuenta.get('numero_cuenta')?.value,
      //State define si el usuario esta activo=>true o pasivo=>false
      state: true

    }
    console.log("Cuenta: " + CUENTA);
    //Mostramos info de la cuenta
    const info = this.infoCuentaNueva.nativeElement;

    this.renderer2.setProperty(info, 'innerHTML',
      "Tipo de cuenta: " + CUENTA.tipo_cuenta +
      "<br/>Monto inicial: " + CUENTA.monto_inicial +
      "<br/>Ingresos promedio: " + CUENTA.ingreso_promedio +
      "<br/>Numero de cuenta: " + CUENTA.numero_cuenta +
      "<br/>Cedula del titular: " + CUENTA.cedula
    )

  }
}
