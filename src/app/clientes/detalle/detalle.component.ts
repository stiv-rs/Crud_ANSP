import { ActivatedRoute } from '@angular/router';
import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { HttpParams } from '@angular/common/http';
import  swal  from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit {

  cliente:Cliente;
  titulo:string = 'Detalle del cliente';
  fotoSeleccionada: File;

  constructor(private clienteService:ClienteService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let id:number = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente=>{
          this.cliente = cliente;
        })
      }
    }
    );
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error seleccionar imagen:', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload:', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe(cliente =>{
        this.cliente = cliente;
        swal.fire('La foto se ha subido completamente!', `La foto se ha subido con éxito: ${this.cliente.foto}`, 'success');
      });
    }
  }
}
