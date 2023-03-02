import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  TraInternaForm: FormGroup;
  
  private cuentaDestino:String="";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _clienteService: ClienteService,
    private _CuentaService: CuentaService,
    ) {    
    this.TraInternaForm = this.fb.group({
      cuentaOrigen: ['', Validators.required],
      monto: ['', Validators.required],
      cuentaDestino: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
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
      var nombres = data.nombres.toString();
      var apellidos = data.apellidos.toString();
      var text = document.getElementById('nombre-cliente');
      text!.innerHTML= nombres+' '+apellidos;
    })
    for(var i=0;i<this.cuentas.length;i++){
      if(this.cuentas[i].tipo_cuenta=='10'){
        this.cuentas[i].tipo_cuenta='Cuenta de Ahorros';
      }else{
        this.cuentas[i].tipo_cuenta='Cuenta Corriente';
      }
      this.numeroCuentas[i] = this.cuentas[i].tipo_cuenta+"\t\t"+this.cuentas[i].numero_cuenta+"\t\t$"+this.cuentas[i].monto_inicial;
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
    //var cuenta = this.TraInternaForm.get('cuentaDestino')?.value;
    var cuenta = "102585213569";
    console.log(cuenta);
    const cuentaObj = { numero_cuenta: cuenta };
    var texto = document.getElementById("text");
    this._CuentaService.obtenerCuenta(cuentaObj).subscribe(
      data=>{
        console.log(data);
        //Recuperar el numero de cedula
        const cedulaObj = "1234567890";
        const cedula = {cedula:cedulaObj} 
        //Recuperar cliente con el numero de cedula
        this._clienteService.obtenerCliente(cedula).subscribe(data=>{
          console.log(data);
          texto!.innerHTML = "Cuenta encontrada. Esta cuenta le pertenece a: "+data.nombres+" "+data.apellidos;
        })

        
      })
  }
  transferir(){
    var cuenta1 = "109261050674";
    var cuenta2 = "102585213569";
    var monto = "50";
    const transferir = {cuneta1: cuenta1, cuenta2: cuenta2, monto:monto };
    this._CuentaService.tranaccionInterna(transferir).subscribe(data =>{

    })
    
  }
}
