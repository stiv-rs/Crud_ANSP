import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from "../clientes/cliente.service";

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: [
  ]
})
export class FacturasComponent implements OnInit {

  titulo:string ='Nueva Factura';
  factura: Factura = new Factura();

  constructor(private clienteService:ClienteService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente=>{
        this.factura.cliente = cliente
      });
    });
  }

}
