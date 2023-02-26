import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciasExternasComponent } from './transferencias-externas.component';

describe('TransferenciasExternasComponent', () => {
  let component: TransferenciasExternasComponent;
  let fixture: ComponentFixture<TransferenciasExternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciasExternasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciasExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
