import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent {

  constructor(
    private router: Router, 
    private _clienteService: ClienteService,
  ){}

  ngOnInit(): void {
    //Mostrar el nombre del cliente que se logea
    this.extraerDatos();
  }
  extraerDatos(){
    const objeto = history.state.transferenciaObj;
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
  
}
