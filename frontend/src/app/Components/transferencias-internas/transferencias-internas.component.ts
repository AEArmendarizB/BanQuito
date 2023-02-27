import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cuenta } from 'src/app/models/cuentas';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-transferencias-internas',
  templateUrl: './transferencias-internas.component.html',
  styleUrls: ['./transferencias-internas.component.css']
})
export class TransferenciasInternasComponent {
  listCuentas:Cuenta[]=[];
  TraInternaForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _clienteService: ClienteService,
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
    console.log(objeto)
    var cedula=objeto.cedula;
    var cuentas=objeto.cuentas;
    const nombre = {cedula: cedula};
    this._clienteService.obtenerCliente(nombre).subscribe(data=>{
      var nombres = data.nombres.toString();
      var apellidos = data.apellidos.toString();
      var text = document.getElementById('nombre-cliente');
      text!.innerHTML= nombres+' '+apellidos;
    })
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

  
}
