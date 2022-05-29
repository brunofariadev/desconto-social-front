import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResultadosComponent } from './resultados/resultados.component';
import { TesteComponent } from './teste/teste.component';
import { ResultadoParticipanteComponent } from './resultado-participante/resultado-participante.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultadosComponent,
    TesteComponent,
    ResultadoParticipanteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
