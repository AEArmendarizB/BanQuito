import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciasInternasResumenComponent } from './transferencias-internas-resumen.component';

describe('TransferenciasInternasResumenComponent', () => {
  let component: TransferenciasInternasResumenComponent;
  let fixture: ComponentFixture<TransferenciasInternasResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciasInternasResumenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciasInternasResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
