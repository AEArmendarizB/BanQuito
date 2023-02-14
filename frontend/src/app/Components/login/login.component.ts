import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUsuario } from 'src/app/models/login.usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  title = 'BanQuito';
  public myForm!:FormGroup;

  public login_usuario:LoginUsuario;

  constructor(private fb:FormBuilder){
    this.login_usuario = new LoginUsuario('','');
  }

  ngOnInit(): void {
      this.myForm = this.createMyForm();
  }
   
  private createMyForm():FormGroup{
    return this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    });
  }

  public submitFormulario(){
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
    alert("Se va a enviar el formulario"); 
      console.log(this.myForm.value);
  }

  public get f():any{
    return this.myForm.controls;
  }
} 