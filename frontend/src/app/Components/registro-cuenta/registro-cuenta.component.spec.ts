import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCuentaComponent } from './registro-cuenta.component';

describe('RegistroCuentaComponent', () => {
  let component: RegistroCuentaComponent;
  let fixture: ComponentFixture<RegistroCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
