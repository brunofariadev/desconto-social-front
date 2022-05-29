import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultadoParticipanteComponent } from './resultado-participante/resultado-participante.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { TesteComponent } from './teste/teste.component';

const routes: Routes = [
  { path: 'teste', component: TesteComponent },
  { path: '', redirectTo: 'teste', pathMatch: 'full' },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'resultados/:id', component: ResultadoParticipanteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
