import { AuthService } from './../usuarios/auth.service';
import swal  from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable,throwError } from 'rxjs';
import { of } from 'rxjs';
import { Region } from './region';
import { HttpClient, HttpEvent, HttpHeaders,HttpRequest } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { formatDate, DatePipe} from '@angular/common';


@Injectable()
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  private agregarAutorizationHeader(){
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean{
     if (e.status == 401) {
       this.router.navigate(['/login']);
       return true;
     }

     if (e.status == 403) {
       swal.fire('Acceso denegado',`Hola ${this.authService.usuario.username} no tienes aceso a este recurso`,'warning');
      this.router.navigate(['/clientes']);
      return true;
    }else{
       return false;
     }
  }

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint+'/regiones', {headers: this.agregarAutorizationHeader()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getClientes(page:number):Observable<any>{
    //return of(CLIENTES);--forma estatica
    //return this.http.get<Cliente[]>(this.urlEndPonit);-- casteando
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      map((response: any)=>{
        (response.content as Cliente[]).map(cliente =>{
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.apellido = cliente.apellido.toUpperCase();
          // Cambiar el idioma a la fecha

          //con DatePipe
          let datePipe= new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');// --con formatDate = formatDate(cliente.createAt, 'dd-MM-yyyy','en-US');
          return cliente;
        });
        return response;
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.agregarAutorizationHeader()}).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e)
      })
    );
  }

  create(cliente: Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers:this.agregarAutorizationHeader()}).pipe(
      map((response:any) => response.cliente as Cliente),
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status ==400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente:Cliente):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers: this.agregarAutorizationHeader()}).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status ==400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }

  delete(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers: this.agregarAutorizationHeader()}).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
