import { Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;
  private _notificacionUpload = new EventEmitter<any>();

  constructor() { }

  get notificacionUpload(): EventEmitter<any>{
    return this._notificacionUpload;
  }

  abrirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }

}
