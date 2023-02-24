import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspencionClientesComponent } from './suspencion-clientes.component';

describe('SuspencionClientesComponent', () => {
  let component: SuspencionClientesComponent;
  let fixture: ComponentFixture<SuspencionClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspencionClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspencionClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
