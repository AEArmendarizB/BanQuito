import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../models/clientes';
import { ClienteService } from '../../services/cliente/cliente.service';
import { UsuarioService } from '../../services/usuario/usuarios.service';
import { Cuenta } from '../../models/cuentas';
import { CuentaService } from '../../services/cuenta/cuenta.service';
import { Usuario } from 'src/app/models/usuarios';


@Component({
  selector: 'app-suspencion-clientes',
  templateUrl: './suspencion-clientes.component.html',
  styleUrls: ['./suspencion-clientes.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class SuspencionClientesComponent implements OnInit {
  formularioCedula: FormGroup;
  formularioCliente: FormGroup;
  private CI: string = "";
  public nombreUsuario: String = "";
  private idCliente: number | undefined = 0;
  public showForm1 = false;
  public showToggle = false;
  // formularioCuenta: FormGroup;
  // formularioUsuario: FormGroup;

  @ViewChild('infoCuentaNueva') infoCuentaNueva!: ElementRef;
  @ViewChild('infoCuentas') infoCuentas!: ElementRef;
  @ViewChild('titulo') titulo!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private _cuentaService: CuentaService,
    private _clienteService: ClienteService,
    private _usuarioService: UsuarioService,
    private renderer2: Renderer2,
    private toastr: ToastrService,

  ) {
    //Cedula
    this.formularioCedula = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
    });
    //Cliente
    this.formularioCliente = this.fb.group({
      estado: ['1'],
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
  }
  ngOnInit(): void {
  }
  buscarCliente() {
    this.CI = this.formularioCedula.get('cedula')?.value;
    const cedula = { cedula: this.CI };
    this._clienteService.obtenerCliente(cedula).subscribe(
      data => {
        const cliente = <Cliente>data;
        switch (data.message) {
          case (404): {
            this.toastr.error('No se encontró un cliente registrado con ese numero de cedula', 'Cliente no registrado');
            console.log("Error del servidor mi 🔑");
            break;
          }
          case (500): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario', 'Cliente no registrado');
            console.log("No se guardo el dato mi 🔑");
            break;
          }
          default: {
            this.showToggle = true;
            this.toastr.success('Se encontró al cliente en la base de datos', 'Cliente encotrado');
            const titulo = this.titulo.nativeElement;
            this.getInfo(cliente);
            this.renderer2.setProperty(titulo, 'innerHTML', "Configura la cuenta de " + cliente.nombres);
            break;
          }
        }
      }
    );

  }
  getInfo(cliente: Cliente) {
    let cuentas = [];
    let num_cuentas:number;
    let salida: string;
    const infoCuentas = this.infoCuentas.nativeElement;
    const cedula = { cedula: cliente.cedula};
    this._cuentaService.getCuentaByCI(cedula).subscribe(
      data => {
        cuentas = data.cuentas;
        num_cuentas = cuentas.length;
        this._usuarioService.getUsuario(cedula).subscribe(
          data => {
            const usuario = <Usuario>data;
            console.log('Los datos recolectados del usuario: ' + cedula.cedula + " son:")
            console.log('La cuentas encontradas: ' + num_cuentas);
            salida = this.printinfo(cliente, num_cuentas,usuario);
            this.renderer2.setProperty(infoCuentas, 'innerHTML', salida);
          }
        );

      }
    );
  }
  printinfo(cliente: Cliente, numCuentas: number,usuario: Usuario) {
    const cedula = { cedula: cliente.cedula };
    let salida = "-".repeat(20)+ "<br>";
    salida = salida +
      "id: " + cliente._id + "<br>" +
      "Nombres: " + cliente.nombres + "<br>" +
      "Apellidos: " + cliente.apellidos + "<br>" +
      "Cedula: " + cliente.cedula + "<br>" +
      "Codigo Dactilar: " + cliente.codigo_dactilar + "<br>" +
      "Fecha de nacimiento: " + cliente.fecha_nacimiento + "<br>" +
      "Correo electronico: " + cliente.correo_electronico + "<br>" +
      "Direccion: " + cliente.direccion + "<br>" +
      "Ocupacion: " + cliente.ocupacion + "<br>" +
      "Telefono: " + cliente.numero_telefono + "<br>" +
      "Estado del usuario: " + cliente.state + "<br>" +
      "Numero de cuentas registradas: " + numCuentas + "<br>"+
      "Credenciales: " + usuario.username + " : " + usuario.password + "<br>" +
      "credenciales temporales: " + usuario.isNew + "<br>" +
      "Pregunta de seguridad: " + usuario.pregunta+ "<br>" ;
    salida = salida+ "-".repeat(20);
    return salida;
  }
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
      numero_telefono: this.formularioCliente.get('numeroTelefono')?.value,
      //State define si el usuario esta activo=>true o pasivo=>false
      state: this.formularioCliente.get('estado')?.value
    }
    if (CLIENTE.state) {
      CLIENTE.state = true;
    } else {
      CLIENTE.state = false;
    }
    const clienteobj = {
      idCliente: this.idCliente,
      cliente: CLIENTE
    }
    const infoCuentas = this.infoCuentas.nativeElement;
    console.log(clienteobj)
    this._clienteService.actualizarCliente(clienteobj).subscribe(
      data => {
        switch (data.message) {
          case (200): {
            this.toastr.info('El Cliente se registro con exito!', 'Cliente registrado');
            console.log("Todo bien mi 🔑, el dato si se ingreso, re piola rey!");
            this.showForm1 = false;
            this.renderer2.setProperty(infoCuentas, 'innerHTML', "");
            break;
          }
          case (404): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario', 'Cliente no registrado');
            console.log("Error del servidor mi 🔑");
            break;
          }
          case (500): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario', 'Cliente no registrado');
            console.log("No se guardo el dato mi 🔑");
            break;
          }
        }
      }
    )
  }
  configCliente() {
    const cedula = { cedula: this.CI };
    this._clienteService.obtenerCliente(cedula).subscribe(
      data => {
        const cliente = <Cliente>data;
        if (cliente.state) {
          cliente.state = <boolean><unknown>"1";
        } else {
          cliente.state = <boolean><unknown>"";
        }
        this.idCliente = cliente._id;
        this.nombreUsuario = cliente.nombres;

        this.formularioCliente.patchValue({ nombres: cliente.nombres });
        this.formularioCliente.patchValue({ apellidos: cliente.apellidos });
        this.formularioCliente.patchValue({ cedula: cliente.cedula });
        this.formularioCliente.patchValue({ codDactilar: cliente.codigo_dactilar });
        this.formularioCliente.patchValue({ fechaNacimiento: cliente.fecha_nacimiento });
        this.formularioCliente.patchValue({ email: cliente.correo_electronico });
        this.formularioCliente.patchValue({ domicilio: cliente.direccion });
        this.formularioCliente.patchValue({ ocupacion: cliente.ocupacion });
        this.formularioCliente.patchValue({ numeroTelefono: cliente.numero_telefono });
        this.formularioCliente.patchValue({ estado: cliente.state });
      });
    this.showForm1 = true;
  }
}
