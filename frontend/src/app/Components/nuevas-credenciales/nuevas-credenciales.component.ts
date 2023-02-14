import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginUsuario } from 'src/app/models/login.usuario';

@Component({
  selector: 'app-nuevas-credenciales',
  templateUrl: './nuevas-credenciales.component.html',
  styleUrls: ['./nuevas-credenciales.component.css']
})
export class NuevasCredencialesComponent implements OnInit{
  title = 'Nuevas credenciales BanQuito';

  public myForm!:FormGroup;

  public nuevo_usuario:LoginUsuario;

  //usuarioForm: FormGroup;

  constructor(){
    this.nuevo_usuario = new LoginUsuario('','');
  }
  
  ngOnInit(): void {
      
  }

  

  /*constructor(private fb: FormBuilder,private router: Router, private _usuarioService: UsuarioService ){
    this.login_usuario = new LoginUsuario('','');
    


  }*/


  /*verificarUsuario(){
    
    
    
    this._usuarioService.verificarUsuario(this.login_usuario).subscribe(data =>{
      
      if(data== true){

        this.router.navigate(['/pregunta']);
        
      }else{

        console.log({message:'No se pudo encontrar el usuario'})

      }
      


    }, error =>{

      console.log(error);

    });

    
    
    

    
  }*/
}