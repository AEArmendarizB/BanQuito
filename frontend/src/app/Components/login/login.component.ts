import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      usuario:[],
      password:[]
    });
  }

  public submitFormulario(){
    alert("Se va a enviar el formulario"); 
    console.log(this.myForm.value);
  }
  /*validate(){
    var usr=$("#user").val();
    var password=$("#pass").val();

    if(usr=="admin" && password=="admin"){
        window.alert('Ingreso exitosamente');
    }
    return false;
    
}*/
}
