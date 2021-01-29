import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaCurso: string[] = ['Java','Angular','HTML','CSS','PHP','Javascript'];
  mostrar:boolean = true;
  constructor() { }
  setHabilitar():void{
    this.mostrar = (this.mostrar==true)?false:true;
  }
}
