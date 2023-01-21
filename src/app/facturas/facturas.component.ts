import  swal  from 'sweetalert2';
import { ItemFactura } from './models/item-factura';
import { FacturaService } from './services/factura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from "../clientes/cliente.service";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Producto } from './models/producto';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
  productosFiltrados: Observable<Producto[]>;

  constructor(private clienteService:ClienteService,
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private facturaService: FacturaService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente=>{
        this.factura.cliente = cliente});
    });

    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value: value.nombre),
      flatMap(value => value ?  this._filter(value): []),
    );
  }


  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto):string| undefined{
    return producto? producto.nombre : undefined;
  }
  seleccionarProducto(event: MatAutocompleteSelectedEvent):void{
    let producto = event.option.value as Producto;
    console.log(producto);

    if (this.existeItem(producto.id)) {
      this.incrementarCantidad(producto.id)
    }else{
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id:number, event:any):void{
    let cantidad:number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item:ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean{
    let existe = false;
    this.factura.items.forEach((item: ItemFactura)=>{
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementarCantidad(id: number): void{
    this.factura.items = this.factura.items.map((item:ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id:number):void{
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id != item.producto.id);
  }

  create(): void{
    console.log(this.factura);
    this.facturaService.create(this.factura).subscribe(factutra => {
      swal. fire(this.titulo, `Factura ${this.factura.descripcion} creada con éxito`, 'success');
      this.router.navigate(['/clientes'])
    });
  }

}
