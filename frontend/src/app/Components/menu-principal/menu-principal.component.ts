import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cuenta } from 'src/app/models/cuentas';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';


@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})


export class MenuPrincipalComponent {
  listCuentas:Cuenta[]=[];

  constructor(
    private router: Router, 
    private _clienteService: ClienteService,
    private _cuentaService: CuentaService,
  ){}

  ngOnInit(): void {
    //Mostrar el nombre del cliente que se logea
    this.extraerCliente();
    //Mostrar las cuentas asociadas al cliente
    this.extraerCuentas();
  }
  extraerCliente(){
    const cedula = history.state.cedula.cedula;
    const nombre = {cedula: cedula};
    this._clienteService.obtenerCliente(nombre).subscribe(data=>{
      var nombres = data.nombres.toString();
      var apellidos = data.apellidos.toString();
      var text = document.getElementById('nombre-cliente');
      text!.innerHTML= nombres+' '+apellidos;
    })
  }

  extraerCuentas(){
    const cedula = history.state.cedula.cedula;
    const cuenta = {cedula: cedula};
    this._cuentaService.getCuentaByCI(cuenta).subscribe(data=>{
      //Convertir el valor de tipo de cuenta numerico a string
      var aux=data;
      for(var i=0;i<aux.length;i++){
        if(aux[i].tipo_cuenta=='10'){
          aux[i].tipo_cuenta='Cuenta de Ahorros';
          console
        }else{
          aux[i].tipo_cuenta='Cuenta Corriente';
        }
      }
      this.listCuentas=aux;
    }, error => {
      console.log(error);
    })
  }

  transferencias(){
    const cedulaObj = history.state.cedula.cedula;
    const cuentasObj = this.listCuentas;
    const transferenciaObj = {cedula:cedulaObj, cuentas:cuentasObj}
    this.router.navigate(['/transferencia'],{state:{transferenciaObj}});
  }

}


