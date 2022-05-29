import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';
import { DescontoSocial } from '../models/desconto-social';

@Component({
  selector: 'app-resultado-participante',
  templateUrl: './resultado-participante.component.html',
  styleUrls: ['./resultado-participante.component.scss']
})
export class ResultadoParticipanteComponent implements OnInit {
  descontoSocial: DescontoSocial;

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {
    this.descontoSocial = new DescontoSocial();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => this.dashboardService.getDescontoSocialById(Number(params.get("id"))))
    ).subscribe(descontoSocial => {
      this.descontoSocial = descontoSocial;
      console.log(this.descontoSocial);
    }, error => alert("Ocorreu um erro no servidor, por favor tente mais tarde."))
  }

}
