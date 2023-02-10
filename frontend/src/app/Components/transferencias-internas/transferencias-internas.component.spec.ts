import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciasInternasComponent } from './transferencias-internas.component';

describe('TransferenciasInternasComponent', () => {
  let component: TransferenciasInternasComponent;
  let fixture: ComponentFixture<TransferenciasInternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciasInternasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciasInternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
