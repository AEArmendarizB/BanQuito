import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaSeguridadComponent } from './pregunta-seguridad.component';

describe('PreguntaSeguridadComponent', () => {
  let component: PreguntaSeguridadComponent;
  let fixture: ComponentFixture<PreguntaSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntaSeguridadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntaSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
