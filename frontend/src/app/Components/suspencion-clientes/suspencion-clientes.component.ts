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
  formularioCuenta: FormGroup;
  formularioUsuario: FormGroup;

  private CI: string = "";
  //----------------------------
  private nombresOriginal: String = "";
  private apellidosOriginal: String = "";
  private domicilioOriginal: String = "";
  private ocupacionOriginal: String = "";
  private fechaOriginal: String = "";
  private numeroOriginal: String = "";
  private estadoOriginalCliente: boolean = false;
  //----------------------------
  private correoOriginal: String = "";
  private usernameOriginal: String = "";
  private passwordOriginal: String = "";
  private preguntaOriginal: String = "";
  private estadoOriginal: boolean = false;
  public otpNotOk: boolean = true;
  public otpNotOk2: boolean = true;
  //----------------------------------
  public nombreUsuario: String = "";
  private idCliente: number | undefined = 0;
  private idCuenta: number | undefined = 0;
  private idUsuario: number | undefined = 0;
  public cuentasDisponibles: any[] = [];
  private cuentasXusuario: any;

  public showForm1 = false;
  public showForm2 = false;
  public showForm3 = false;
  public showToggle = false;
  // formularioCuenta: FormGroup;
  // formularioUsuario: FormGroup;
  @ViewChild('spanNumCuenta') cuenta!: ElementRef;
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
      domicilio: ['', [Validators.required, Validators.pattern("^[A-Za-zñáéíóúÁÉÍÓÚ' ]{1,50}$")]],
      ocupacion: ['', [Validators.required, Validators.pattern("^[A-Za-zñáéíóúÁÉÍÓÚ' ]{1,50}$")]],
      numeroTelefono: ['', [Validators.required, Validators.pattern("^09[0-9]{8}$")]],
      otp: ['',]
    });
    //Cuenta
    this.formularioCuenta = this.fb.group({
      cuenta: ['', Validators.required],
      estado: ['1'],
      tipo_cuenta: ['', Validators.required],
      monto_inicial: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      ingreso_promedio: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      numero_cuenta: ['', Validators.required],
    });
    //Cliente
    this.formularioUsuario = this.fb.group({
      pregunta: ['', [Validators.required, Validators.pattern("^[A-Za-zñáéíóúÁÉÍÓÚ' ]{1,50}$")]],
      user: ['', [Validators.required, Validators.pattern("^[0-9A-Za-zñáéíóúÁÉÍÓÚ' ]{1,50}$")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[@a-z0-9])[0-9a-zA-Z@]{8,10}$")]],
      estado: ['1'],
    });
  }

  otp() {
    if (this.formularioCliente.get('email')?.valid) {
      var correo = this.formularioCliente.get('email')?.value;
      //Deshabilitar el botón de correo
      document.getElementById('boton-correo')!.style.display = 'none';
      document.getElementById('otp')!.style.display = 'block';
      //enviar correo
      this.verificarCorreo(correo);
    }
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
    let num_cuentas: number;
    let salida: string;
    const infoCuentas = this.infoCuentas.nativeElement;
    const cedula = { cedula: cliente.cedula };
    this._cuentaService.getCuentaByCI(cedula).subscribe(
      data => {
        cuentas = data;
        num_cuentas = cuentas.length;
        this._usuarioService.getUsuario(cedula).subscribe(
          data => {
            const usuario = <Usuario>data;
            console.log('Los datos recolectados del usuario: ' + cedula.cedula + " son:")
            console.log('La cuentas encontradas: ' + num_cuentas);
            salida = this.printinfo(cliente, num_cuentas, usuario);
            this.renderer2.setProperty(infoCuentas, 'innerHTML', salida);
          }
        );

      }
    );
  }
  printinfo(cliente: Cliente, numCuentas: number, usuario: Usuario) {
    const cedula = { cedula: cliente.cedula };
    let salida ="Información disponible:<br>"+ "-".repeat(20) + "<br>";
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
      "Numero de cuentas registradas: " + numCuentas + "<br>" +
      "Credenciales: " + usuario.username + " : " + usuario.password + "<br>" +
      "credenciales temporales: " + usuario.isNew + "<br>" +
      "Pregunta de seguridad: " + usuario.pregunta + "<br>";
    salida = salida + "-".repeat(20);
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
    this._clienteService.actualizarCliente(clienteobj).subscribe(
      data => {
        switch (data.message) {
          case (200): {
            this.toastr.info('El Cliente se registro con exito!', 'Cliente registrado');
            console.log("Todo bien mi 🔑, el dato si se ingreso, re piola rey!");
            this.showForm1 = false;
            this.showToggle = false;
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
      state: this.formularioCuenta.get('estado')?.value
    }

    //Mostramos info de la cuenta
    const info = this.infoCuentaNueva.nativeElement;
    salida = this.printCuenta(CUENTA);
    this.renderer2.setProperty(info, 'innerHTML', salida);

    //Envio de datos
    if (CUENTA.state) {
      CUENTA.state = true;
    } else {
      CUENTA.state = false;
    }
    const cuentaObj = {
      idCuenta: this.idCuenta,
      cuenta: CUENTA
    }
    console.log(cuentaObj)
    const infoCuentas = this.infoCuentas.nativeElement;
    this._cuentaService.actualizarCuenta(cuentaObj).subscribe(
      data => {
        console.log(data)
        switch (data.message) {
          case (200): {
            this.toastr.info('La cuenta se registro con exito!', 'Cuenta registrada');
            console.log("Todo bien mi 🔑, el dato si se ingreso, re piola rey!");
            this.showForm2 = false;
            this.showToggle = false;
            this.renderer2.setProperty(infoCuentas, 'innerHTML', "");
            break;
          }
          case (404): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario:COD404', 'Cuenta no registrada');
            console.log("Error del servidor mi 🔑");
            break;
          }
          case (500): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario,COD500', 'Cuenta no registrada');
            console.log("No se guardo el dato mi 🔑");
            break;
          }
        }
      }
    );
  }
  agregarUsuario() {
    const USUARIO: Usuario = {
      cedula: this.formularioCedula.get('cedula')?.value,
      username: this.formularioUsuario.get('user')?.value,
      password: this.formularioUsuario.get('password')?.value,
      pregunta: this.formularioUsuario.get('pregunta')?.value,
      isNew: this.formularioUsuario.get('estado')?.value
    }
    if (USUARIO.isNew) {
      USUARIO.isNew = true;
    } else {
      USUARIO.isNew = false;
    }
    const usuarioObj = {
      idusuario: this.idUsuario,
      usuario: USUARIO
    }
    const infoCuentas = this.infoCuentas.nativeElement;
    this._usuarioService.configurarUsuario(usuarioObj).subscribe(
      data => {
        switch (data.message) {
          case (200): {
            this.toastr.success('El usuario se registro con exito!', 'Usuario registrado');
            console.log("Todo bien mi 🔑, el dato si se ingreso, re piola rey!");
            this.showToggle = false;
            this.showForm3 = false;
            this.renderer2.setProperty(infoCuentas, 'innerHTML', "");
            break;
          }
          case (404): {
            this.toastr.info('El usuario no contaba con credenciales previamente creadas, se procedio a crear unas nuevas', 'El usuario no contaba con credenciales');
            this._usuarioService.verificarUsuario(USUARIO).subscribe(
              data => {
                console.log(data.message)
                switch (data.message) {
                  case (200): {
                    this.toastr.success('El usuario se registro con exito!', 'Usuario registrado');
                    console.log("Todo bien mi 🔑, el dato si se ingreso, re piola rey!");
                    break;
                  }
                  case (404): {
                    this.toastr.error('Revisa las entradas ingresadas en el formulario: COD404', 'Usuario no registrado');
                    console.log("Error del servidor mi 🔑");
                    break;
                  }
                  case (500): {
                    this.toastr.error('Revisa las entradas ingresadas en el formulario: COD500', 'Usuario no registrado');
                    console.log("No se guardo el dato mi 🔑");
                    break;
                  }
                }
              }
            )
            break;
          }
          case (500): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario,COD500', 'Usuario no registrado');
            console.log("No se guardo el dato mi 🔑");
            break;
          }
        }
      }
    );
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
        this.correoOriginal = cliente.correo_electronico;
        this.fechaOriginal = cliente.fecha_nacimiento;
        this.ocupacionOriginal = cliente.ocupacion;
        this.numeroOriginal = cliente.numero_telefono;
        this.nombresOriginal = cliente.nombres;
        this.apellidosOriginal = cliente.apellidos;
        this.estadoOriginalCliente = cliente.state;
        this.domicilioOriginal = cliente.direccion;

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
    this.showForm2 = false;
    this.showForm3 = false;

  }

  configCuenta() {
    const cedula = { cedula: this.CI };
    this._cuentaService.getCuentaByCI(cedula).subscribe(
      data => {
        this.cuentasXusuario = data;
        for (let i = 0; i < this.cuentasXusuario.length; i++) {
          let cuenta = <Cuenta>this.cuentasXusuario[i];

          this.cuentasDisponibles[i] = { numero: cuenta.numero_cuenta };
        }
      }
    );
    this.showForm2 = true;
    this.showForm1 = false;
    this.showForm3 = false;
  }
  findCuenta(numCuenta: string) {
    let cuenta;
    for (let i = 0; i < this.cuentasXusuario.length; i++) {
      cuenta = <Cuenta>this.cuentasXusuario[i];
      if (cuenta.numero_cuenta == numCuenta) {
        return cuenta;
      } else {
        cuenta == null;
      }
    }
    return cuenta;
  }
  cuentaSeleccionada() {
    const numCuenta = this.cuenta.nativeElement;
    let _numCuenta = this.formularioCuenta.get("cuenta")?.value;
    this.renderer2.setProperty(numCuenta, 'innerHTML', _numCuenta);
    let selectedCuenta = this.findCuenta(_numCuenta);
    if (selectedCuenta != undefined) {
      if (selectedCuenta.state) {
        selectedCuenta.state = <boolean><unknown>"1";
      } else {
        selectedCuenta.state = <boolean><unknown>"";
      }
    }
    this.idCuenta = selectedCuenta?._id;
    this.formularioCuenta.patchValue({ estado: selectedCuenta?.state });
    this.formularioCuenta.patchValue({ tipo_cuenta: selectedCuenta?.tipo_cuenta });
    this.formularioCuenta.patchValue({ monto_inicial: selectedCuenta?.monto_inicial });
    this.formularioCuenta.patchValue({ ingreso_promedio: selectedCuenta?.ingreso_promedio });
    this.formularioCuenta.patchValue({ numero_cuenta: selectedCuenta?.numero_cuenta });
  }
  configUsuario() {
    const cedula = { cedula: this.CI };
    this._usuarioService.getUsuario(cedula).subscribe(
      data => {
        const usuario = <Usuario>data;
        if (usuario.isNew) {
          usuario.isNew = <boolean><unknown>"1";
        } else {
          usuario.isNew = <boolean><unknown>"";
        }
        this.idUsuario = usuario._id;
        this.formularioUsuario.patchValue({ pregunta: usuario.pregunta });
        this.formularioUsuario.patchValue({ user: usuario.username });
        this.formularioUsuario.patchValue({ password: usuario.password });
        this.formularioUsuario.patchValue({ estado: usuario.isNew });
        this.preguntaOriginal = usuario.pregunta;
        this.usernameOriginal = usuario.username;
        this.passwordOriginal = usuario.password;
        this.estadoOriginal = usuario.isNew;
      }
    );
    this.showForm3 = true;
    this.showForm1 = false;
    this.showForm2 = false;

  }
  enviarCorreo() {
    if (this.passwordOriginal == this.formularioUsuario.get('password')?.value &&
      this.usernameOriginal == this.formularioUsuario.get('user')?.value &&
      this.preguntaOriginal == this.formularioUsuario.get('pregunta')?.value &&
      this.estadoOriginal == this.formularioUsuario.get('estado')?.value) {
      //No se envia correo 
    } else {
      //Se envia correo
      //Recuperar cliente
      var cedula = { cedula: this.CI }
      this._clienteService.obtenerCliente(cedula).subscribe(
        data => {
          const cliente = <Cliente>data;
          //Recuperar correo
          const email = cliente.correo_electronico;
          if (this.formularioUsuario.get('estado')?.value == "1") {
            //Correo cuando es credencial Temporal
            var username = this.formularioUsuario.get('user')?.value;
            var contraseña = this.formularioUsuario.get('password')?.value;
            var pregunta = this.formularioUsuario.get('pregunta')?.value;
            var credenciales = { correo: email, username: username, pass: contraseña, pregunta: pregunta };
            this._clienteService.nuevasCredencialesTempo(credenciales).subscribe(data => { });
          } else {
            //Correo cuando es credencial Propia
            var correo = { correo: email };
            this._clienteService.actualizarUsuario(correo).subscribe(data => { });
          }

        }
      )
    }

  }
  validarCorreoOriginal() {
    if (this.correoOriginal == this.formularioCliente.get('email')?.value) {
      this.otpNotOk = true;
      this.otpNotOk2 = false;
    } else {
      this.otpNotOk = false;
      this.otpNotOk2 = true;
    }
  }

  reenviar() {
    var cedula = { cedula: this.CI }
    this._clienteService.obtenerCliente(cedula).subscribe(
      data => {
        const cliente = <Cliente>data;
        //Recuperar correo
        const email = cliente.correo_electronico;
        var username = this.formularioUsuario.get('user')?.value;
        var contraseña = this.formularioUsuario.get('password')?.value;
        var pregunta = this.formularioUsuario.get('pregunta')?.value;
        var credenciales = { correo: email, username: username, pass: contraseña, pregunta: pregunta };
        this._clienteService.reenviarCredenciales(credenciales).subscribe(data => { });
      })
  }
  verificarCorreo(email: String) {
    var codigo = "";
    const correo = { correo: email }
    this._clienteService.actualizarCorreoCliente(correo).subscribe(
      data => {
        codigo = data.toString();
        let patron = "^" + codigo + "$";
        console.log(patron);
        var campo = document.getElementById('otp-campo');
        campo!.addEventListener('keyup', () => {
          var text = document.getElementById('text');
          var otp = this.formularioCliente.get('otp')!.value;
          console.log(otp);
          if (otp.match(patron) == null) {
            text!.innerHTML = "Codigo invalido"
            this.otpNotOk2 = true;
          } else {
            text!.innerHTML = "Codigo valido"
            this.otpNotOk2 = false;
          }
        })
      }
    )
  }
  actualizar() {
    if (this.nombresOriginal == this.formularioCliente.get('nombres')?.value &&
      this.apellidosOriginal == this.formularioCliente.get('apellidos')?.value &&
      this.fechaOriginal == this.formularioCliente.get('fechaNacimiento')?.value &&
      this.correoOriginal == this.formularioCliente.get('email')?.value &&
      this.domicilioOriginal == this.formularioCliente.get('domicilio')?.value &&
      this.ocupacionOriginal == this.formularioCliente.get('ocupacion')?.value &&
      this.numeroOriginal == this.formularioCliente.get('numeroTelefono')?.value &&
      this.estadoOriginalCliente == this.formularioCliente.get('estado')?.value) {
      //No envia nada
    } else {
      var cedula = { cedula: this.CI }
      this._clienteService.obtenerCliente(cedula).subscribe(
        data => {
          const cliente = <Cliente>data;
          //Recuperar correo
          const email = cliente.correo_electronico;
          const correo = { correo: email }
          this._clienteService.actualizar(correo).subscribe(data=>{});
        })
    }

  }
}
