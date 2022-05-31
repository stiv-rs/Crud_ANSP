import { Usuario } from './usuario';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Porfavor ingrese sus credenciales';
  usuario:Usuario;

  constructor() {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login():void{
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o password vacias!', 'error');
      return;
    }
  }

}
