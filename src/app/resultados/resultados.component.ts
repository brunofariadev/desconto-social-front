import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { DescontoSocial } from '../models/desconto-social';
import toastr from 'toastr';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  descontosSocial: DescontoSocial[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.buscarDescontos()
      .subscribe(descontos => {
        this.descontosSocial = descontos;
      },
        () => {
          toastr.error("Ocorreu um erro ao buscar os resultados, por favor tente novamente ou contate o suporte!");
        }
      );
  }

}
