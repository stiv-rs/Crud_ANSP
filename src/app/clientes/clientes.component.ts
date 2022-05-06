import { ModalService } from './detalle/modal.service';
import  swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import {ClienteService} from './cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;

  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              private modalService:ModalService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).subscribe(
        response => {
          this.paginador = response;
          this.clientes = response.content as Cliente[]
        }
      );
    });
    this.modalService.notificacionUpload.subscribe(cliente =>{
      this.clientes.map(clienteOriginal =>{
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal
      })
    });
  }

  delete(cliente:Cliente):void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `Estas a punto de eliminar a ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Has eliminado a ${cliente.nombre}.`,
              'success'
            )
          }
        )
      }
    });
  }
  abrirModal(cliente: Cliente): void{
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
