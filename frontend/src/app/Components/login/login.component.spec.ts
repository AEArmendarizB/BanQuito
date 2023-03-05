//ng test frontend --include=**/Components/login/login.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('Pruebas TDD para LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let clienteService: jasmine.SpyObj<ClienteService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crear un objeto MockClienteService que simula el servicio ClienteService
    const mockClienteService = jasmine.createSpyObj('ClienteService', ['validarCorreoLogin']);
    // Configurar el mockClienteService para que retorne un valor simulado para el método validarCorreoLogin
    clienteService = mockClienteService;
    clienteService.validarCorreoLogin.and.returnValue(of('1234567'));

    const mockToastr = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule, 
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: ClienteService, useValue: mockClienteService },
        { provide: ToastrService, useValue: mockToastr }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('Enviar por correo el código', () => {
    // Llamar la función enviarCorreo con un correo simulado
    const correo = 'jordy.quishpe@epn.edu.ec';
    component.enviarCorreo(correo);

    // Comprobar que la variable codigo se actualiza correctamente
    expect(component.codigo).toEqual("1234567");
  });
  
/*
  it('Verificar código OTP', () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // Agregar valores predeterminados para los controles de formulario que faltan
component.myForm.setValue({
  usuario: 'usuario',
  password: 'password',
  otp: component.codigo,
});

    // Configurar el valor de la variable id
    component.id = '1234567890';
  
    // Llamar a la función verificarOTP
    component.verificarOTP();
  
    // Comprobar que la función router.navigate fue llamada con los parámetros correctos
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pregunta'], { state: { cedulaObj: { cedula: '1234567890' } } });
  
    // Comprobar que se muestra un mensaje de éxito
    expect(toastrSpy.success).toHaveBeenCalledWith('Por favor, a continuacion ingresa la respuesta de tu pregunta de seguridad', 'Login Exitoso!');
  });
*/

 
  it('Verificar código OTP inválido', () => {
    // Configurar el valor del formulario con un código OTP inválido
    component.myForm.setValue({
      usuario: 'testuser',
      password: 'testpassword', // agrega el control de formulario 'password' con un valor arbitrario
      otp: '111111',
    });
  
    // Configurar el valor de la variable id
    component.id = '1234567890';
  
    // Llamar a la función verificarOTP
    component.verificarOTP();
  
    // Comprobar que se muestra un mensaje de error
    expect(toastrSpy.error).toHaveBeenCalledWith('El código no coincide', 'Error, código inválido');
  });
  
  

})