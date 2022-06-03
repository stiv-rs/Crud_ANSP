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

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;
      this.router.navigate(['/clientes']);
      swal.fire('login',`Hola ${usuario.username}, has iniciado sesion con exito!!`,'success');
    },err => {
      if(err.status == 400){
        swal.fire('Error Login','Usuario o clave son incorrectos', 'error');
      }
    }
    );
  }

}
