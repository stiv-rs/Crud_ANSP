import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from "../clientes/cliente.service";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: [
  ]
})
export class FacturasComponent implements OnInit {

  titulo:string ='Nueva Factura';
  factura: Factura = new Factura();

  autocompleteControl = new FormControl('');
  productos: string[] = ['Mesa', 'Tablet', 'Sony', 'Tv LG', 'Bicicleta'];
  productosFiltrados: Observable<string[]>;

  constructor(private clienteService:ClienteService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente=>{
        this.factura.cliente = cliente});
    });

    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productos.filter(option => option.toLowerCase().includes(filterValue));
  }

}
