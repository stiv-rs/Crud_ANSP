import { ClienteService } from './cliente.service'
import { Cliente } from './cliente'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import  swal  from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente:Cliente = new Cliente()
  titulo:String = "Crear cliente"

  constructor(private clienteService:ClienteService,
              private router:Router) { }

  ngOnInit(): void {
  }

  public create():void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente Guardado',`Cliente ${cliente.nombre} creado con éxito!`, 'success' )
      }
    )
  }
}
