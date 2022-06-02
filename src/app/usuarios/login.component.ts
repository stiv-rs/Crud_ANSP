import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Porfavor ingrese sus credenciales';
  usuario:Usuario;

  constructor(private authService:AuthService,
              private router:Router) {
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

    this.authService.login(this.usuario).subscribe(response=>{
      console.log(response);
      let payload = JSON.parse(atob(response.access_token.split(".")[1]));
      console.log(payload);
      this.router.navigate(['/clientes']);
      swal.fire('login',`Hola ${payload.user_name}, has iniciado sesion con exito!!`,'success');
    });
  }

}
