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
  mostrarLoading = false;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.mostrarLoading = true;
    this.dashboardService.buscarDescontos()
      .subscribe(descontos => {
        this.mostrarLoading = false;
        this.descontosSocial = descontos;
      },
        () => {
          this.mostrarLoading = false;
          toastr.error("Ocorreu um erro ao buscar os resultados, por favor tente novamente ou contate o suporte!");
        }
      );
  }

}
