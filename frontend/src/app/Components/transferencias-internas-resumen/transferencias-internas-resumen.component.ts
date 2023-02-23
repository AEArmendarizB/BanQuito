import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-transferencias-internas-resumen',
  templateUrl: './transferencias-internas-resumen.component.html',
  styleUrls: ['./transferencias-internas-resumen.component.css']
})
export class TransferenciasInternasResumenComponent implements OnInit {
  @ViewChild('resumeTransferencia') resumenTransfer!: ElementRef;

constructor(
  private renderer2: Renderer2
){

}
  ngOnInit(): void {
    
  }
  MostrarDatos(){
        //Mostramos info de la cuenta
        const resumen = this.resumenTransfer.nativeElement;

        this.renderer2.setProperty(resumen, 'innerHTML', "Este es un resumen actualizado desde ts"
        )
  }
}
