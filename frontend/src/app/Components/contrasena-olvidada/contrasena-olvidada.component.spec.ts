import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrasenaOlvidadaComponent } from './contrasena-olvidada.component';

describe('ContrasenaOlvidadaComponent', () => {
  let component: ContrasenaOlvidadaComponent;
  let fixture: ComponentFixture<ContrasenaOlvidadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrasenaOlvidadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrasenaOlvidadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
