import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cuenta } from 'src/app/models/cuentas';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';

@Component({
  selector: 'app-transferencias-internas',
  templateUrl: './transferencias-internas.component.html',
  styleUrls: ['./transferencias-internas.component.css']
})


export class TransferenciasInternasComponent {
  cuentas:Cuenta[]=[];
  numeroCuentas:string[]=[];;
  correo: String = "";
  transForm: FormGroup;
  nombreReceptora:String ="";
  apellidoReceptora:String ="";
  cuentaEmisora:String="";
  nombreEmisora:String="";
  apellidosEmisora:String="";
  tipoEmisora:String = "";
  tipoReceptora:String = "";
   // public valBoton: false;
   // public valCodigo: false;
   public otpNotOk = true;
   public vali = true;
    constructor(
    private fb: FormBuilder,
    private router: Router,
    private _clienteService: ClienteService,
    private _CuentaService: CuentaService,
    private toastr: ToastrService, 

    ) {    
    this.transForm = this.fb.group({
      monto: ['', [Validators.required, Validators.pattern("^(1|[0-9]|[0-9][0-9]|[0-9][0-9][0-9]|[0-4][0-9][0-9][0-9]|5000)$")]],
      cuentaD: ['',[Validators.required,Validators.pattern("^[0-9]{12}$")]],
      descripcion: ['',[Validators.required, Validators.pattern("^[A-Za-zñáéíóúÁÉÍÓÚ']{1,50}$")]],
      otp: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    //Mostrar el nombre del cliente que se logea
    this.extraerDatos();
    
  }
 

  extraerDatos(){
    const objeto = history.state.transferenciaObj;
    var cedula=objeto.cedula;
    this.cuentas=objeto.cuentas;
    const nombre = {cedula: cedula};
    this._clienteService.obtenerCliente(nombre).subscribe(data=>{
      this.correo = data.correo_electronico;
      this.nombreEmisora  = data.nombres.toString();
      this.apellidosEmisora = data.apellidos.toString();
      this.tipoEmisora = data.tipo_cuenta.toString();
      var text = document.getElementById('nombre-cliente');
      text!.innerHTML= this.nombreEmisora+' '+this.apellidosEmisora;
    })
    for(var i=0;i<this.cuentas.length;i++){
      this.numeroCuentas[i] = this.cuentas[i].tipo_cuenta+" "+this.cuentas[i].numero_cuenta+" $"+this.cuentas[i].monto_inicial;
      //cargar cuentas en el combo box
    }
      var select =  document.getElementById("cuentasOrigen");
      for (var i=0; i<this.numeroCuentas.length; i++){
        var option = document.createElement("option");
        option.innerHTML = this.numeroCuentas[i];
        select!.appendChild(option);
      }
      }
  

  menu(){
    const objeto = history.state.transferenciaObj;
    const cedulaObj = objeto.cedula;
    const cedula = {cedula:cedulaObj} 
    this.router.navigate(['/menu'],{state:{cedula}});
  }

  transferencias(){
    const cedulaObj = history.state.transferenciaObj.cedula;
    const cuentasObj = history.state.transferenciaObj.cuentas;
    const transferenciaObj = {cedula:cedulaObj, cuentas:cuentasObj}
    this.router.navigate(['/transferencia'],{state:{transferenciaObj}});
  }

  validarCuenta(){
    var cuenta = document.getElementById("cuentaDestino-campo") as HTMLInputElement;
    const cuentaObj = { numero_cuenta: cuenta.value };
    var texto = document.getElementById("textCuenta");
    this._CuentaService.obtenerCuenta(cuentaObj).subscribe(
      data=>{
        let cuenta = <Cuenta>data;
        //Recuperar el numero de cedula
        const cedulaObj = {cedula:cuenta.cedula};
        //Recuperar cliente con el numero de cedula
        this._clienteService.obtenerCliente(cedulaObj).subscribe(data=>{
          switch (data.message) {
            case (404): 
            this.toastr.error('No se encontro un usuario asociado a la cuenta', 'Cuenta inválida');
            texto!.innerHTML = "";
            break;
            case(500):
            this.toastr.error('Revisa las entradas ingresadas en el formulario', 'Cuenta inválida');
            texto!.innerHTML = "";
            break;
            default:
            this.toastr.info('Cuenta válida');
            this.apellidoReceptora = data.apellidos;
            this.nombreReceptora=data.nombres;
            this.tipoReceptora = data.tipo_cuenta.toString();
            this.tipoReceptora.replace("10","Ahorros").replace("20","Corriente");
            texto!.innerHTML = "Cuenta encontrada. Esta cuenta le pertenece a: "+data.nombres+" "+data.apellidos;
            break;
          }
        })
      })
  }
  transferir(){
    var cuenta1:String="";
    var monto = document.getElementById("monto-campo") as HTMLInputElement;
    var c1 =  document.getElementById("cuentasOrigen")as HTMLInputElement;
    var cuenta2 = document.getElementById("cuentaDestino-campo") as HTMLInputElement;
    var descripcion=document.getElementById("descripcion-campo") as HTMLInputElement;
    for(var i=0; i<this.cuentas.length; i++){
      if(this.numeroCuentas[i]==c1.value){
        cuenta1 = this.cuentas[i].numero_cuenta;
        break;
      }
    }
    const transferir = { cuenta1: cuenta1, cuenta2: cuenta2.value, monto: monto.value };
    this._CuentaService.transaccionInterna(transferir).subscribe(data => {
      console.log(data);
    })
    //Enviar correo confirmando la transferencia bancaria
//    const resumen = {cuenta1: cuenta1, cuenta2: cuenta2.value, monto:monto.value, descripcion:descripcion.value, correo:this.correo};
//    this._clienteService.resumen(resumen).subscribe(data=>{
//      console.log(data);
 //   })
 //   this.menu();
  }

  otp() {

      //Deshabilitar el botón de correo
      var aux = document.getElementById('otp-campo');
      aux!.innerHTML="";
      document.getElementById('boton-correo')
      document.getElementById('boton-correo')!.style.display = 'none';
      document.getElementById('otp')!.style.display = 'block';
      //enviar correo
      this.confirmarCorreo(this.correo);
  }
  confirmarCorreo(email: String) {
    var codigo = "";
    const correo = { correo: email }
    this._clienteService.confirmarTransferencia(correo).subscribe(
      data => {
        codigo = data.toString();
        let patron="^"+codigo+"$";  
        var campo = document.getElementById('otp-campo');
        campo!.addEventListener('keyup',()=>{
          var text = document.getElementById('text');
          var otp = document.getElementById("otp-campo") as HTMLInputElement;
          if(otp.value.match(patron)==null){
           text!.innerHTML="Codigo invalido";
           this.otpNotOk = false;
          }else{
           text!.innerHTML="Codigo valido"
           this.otpNotOk = true;
          }
        })
      }
    )
  }
}
