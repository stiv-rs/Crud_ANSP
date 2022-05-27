import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Porfavor ingrese sus credenciales';

  constructor() { }

  ngOnInit(): void {
  }

}
