import { Component } from '@angular/core';
import { CondicaoInteracao } from './models/condicao-interacao';
import { DescontoSocial, InteracaoDeAtraso, InteracaoPorLugarDeOcupacao } from './models/desconto-social';
import { LugarDeOcupacao } from './models/lugar-de-ocupacao.model';
import { Options } from './models/options';
import { random } from './utils/numberUtils';
import { UtilOptions } from './utils/util.options';
import toastr from 'toastr';
import { DashboardService } from './dashboard.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
