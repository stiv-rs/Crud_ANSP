import { FormComponent } from './clientes/form.component';
import { RouterModule, Routes } from '@angular/router';
import { ClienteService } from './clientes/cliente.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs,'es');

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const routes :Routes = [
  { path: '',redirectTo:'/clientes', pathMatch:'full'},
  { path: 'clientes', component: ClientesComponent},
  { path: 'directivas', component: DirectivaComponent},
  { path: 'clientes/form',component:FormComponent},
  { path: 'clientes/form/:id',component:FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    DirectivaComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
