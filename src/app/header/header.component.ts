import { Router } from '@angular/router';
import  swal  from 'sweetalert2';
import { AuthService } from './../usuarios/auth.service';
import { Component } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html'
})
export class HeaderComponent{
  title:string = 'CRUD-Angular';

  constructor(public authService:AuthService,
              private router:Router){}
  logout():void{
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('logout',`Hola ${username} has cerrado sesión con éxito!`,'success');
    this.router.navigate(['/login']);
  }

}
