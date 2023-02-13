import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevasCredencialesComponent } from './nuevas-credenciales.component';

describe('NuevasCredencialesComponent', () => {
  let component: NuevasCredencialesComponent;
  let fixture: ComponentFixture<NuevasCredencialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevasCredencialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevasCredencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
