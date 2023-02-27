import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/models/login.usuario';
import { ClienteService } from 'src/app/services/cliente/cliente.service';


@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private _clienteService: ClienteService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.extraerCliente();
  }
  extraerCliente(){
    //const cedula = history.state.cedulaObj.cedula;
    const cedula = 1111111111;
    console.log(cedula);
    const nombre = {cedula: cedula};
    console.log(nombre);
    this._clienteService.extraerNombre(nombre).subscribe(data=>{
      console.log(data.nombres);
      //switch(data){
        
     // }
    })
  }

}


