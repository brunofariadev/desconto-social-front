import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';
import { DescontoSocial } from '../models/desconto-social';
import toastr from 'toastr';

@Component({
  selector: 'app-resultado-participante',
  templateUrl: './resultado-participante.component.html',
  styleUrls: ['./resultado-participante.component.scss']
})
export class ResultadoParticipanteComponent implements OnInit {
  descontoSocial: DescontoSocial;
  colunas = [];
  linhas = [];
  mostrarLoading = false;
  pessoas: string[] = [];
  posicoes: string[] = [];

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {
    this.descontoSocial = new DescontoSocial();
  }



  ngOnInit(): void {
    this.mostrarLoading = true;
    this.route.paramMap.pipe(
      switchMap(params => this.dashboardService.getDescontoSocialById(Number(params.get("id"))))
    ).subscribe(descontoSocial => {
      this.mostrarLoading = false;
      this.descontoSocial = descontoSocial;
      this.monteColunas();
      this.monteResumo();
    }, error => {
      this.mostrarLoading = false;
      toastr.error("Ocorreu um erro ao buscar os resultados, por favor tente novamente ou contate o suporte!");
    })
  }

  monteColunas() {
    for (const interacaoPorLugarDeOcupacao of this.descontoSocial.interacoesPorLugarDeOcupacao) {
      this.colunas.push({
        pessoa: interacaoPorLugarDeOcupacao.lugarDeOcupacao.grauDeRelacao,
        posicao: interacaoPorLugarDeOcupacao.lugarDeOcupacao.posicao
      });
    }
  }

  monteResumo() {
    const atrasos = this.descontoSocial.interacoesPorLugarDeOcupacao[0].interacoesPorAtraso.map(a => a.atraso);
    const todasInteracoesPorAtraso = this.descontoSocial.interacoesPorLugarDeOcupacao.map(i => i.interacoesPorAtraso).reduce((a, b) => a.concat(b));
    for (const atraso of atrasos) {
      let linha = {
        atraso: atraso,
        medias: []
      };

      const interacoes = todasInteracoesPorAtraso.filter(i => i.atraso == atraso);
      for (const interacaoPorAtraso of interacoes) {
        linha.medias.push(interacaoPorAtraso.media.toString().replace('.', ","));
      }
      this.linhas.push(linha);
    }
  }

}
