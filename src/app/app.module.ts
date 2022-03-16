import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import {RouterModule, Routes} from '@angular/router';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';

  const routes: Routes = [
    { path: 'directivas', component: DirectivaComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'clientes/form', component: FormComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/clientes' }
  ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
