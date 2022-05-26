import { Component } from '@angular/core';
import { CondicaoInteracao } from './models/condicao-interacao';
import { DescontoSocial, InteracaoDeAtraso, InteracaoPorLugarDeOcupacao } from './models/desconto-social';
import { LugarDeOcupacao } from './models/lugar-de-ocupacao.model';
import { Options } from './models/options';
import { random } from './utils/numberUtils';
import { UtilOptions } from './utils/util.options';
import toastr from 'toastr';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  etapaCorrente = "inicio";
  // posicoes: number[] = [1, 2, 5, 10, 20, 50, 100];
  posicoes: number[] = [1, 2];
  countPosicoes: number = 0;
  posicaoCorrente: number;
  lugaresOcupados: LugarDeOcupacao[] = [];
  lugarOcupado: LugarDeOcupacao;

  pessoas: { value, text }[] = [];
  pessoasAleatorias: { value, text }[] = [];
  pessoasNaoEscolhidas: { value, text }[] = [];

  frequencias: { value, text }[] = [];

  atrasos: { value, text }[] = [];

  condicaoDeInteracao: CondicaoInteracao;
  condicoesDeInteracoes: CondicaoInteracao[] = [];
  atraso: { value, text };

  descontoSocial: DescontoSocial;
  interacaoPorLugarDeOcupacao: InteracaoPorLugarDeOcupacao;

  constructor(
    private dashboardService: DashboardService
  ) {
    this.pessoas = UtilOptions.getOptions(Options.pessoas);
    this.frequencias = UtilOptions.getOptions(Options.frequencias);
    this.atrasos = UtilOptions.getOptions(Options.atrasos);
    this.lugarOcupado = new LugarDeOcupacao();
    this.descontoSocial = new DescontoSocial();
  }

  proximaEtapa(proximaEtapa: string, countPosicoes: number = 0, fimEtapaLugarOcupacao = false) {
    if (proximaEtapa == "escolhaDoLugarDeOcupacao" && fimEtapaLugarOcupacao) {
      this.lugarOcupado.posicao = this.posicaoCorrente;
      this.lugaresOcupados.push(this.lugarOcupado);
      console.log("this.lugaresOcupados", this.lugaresOcupados);
      this.lugarOcupado = new LugarDeOcupacao();
      this.condicaoDeInteracao = new CondicaoInteracao(50);

    }

    if (proximaEtapa == "escolhaDoLugarDeOcupacao" && countPosicoes <= this.posicoes.length) {
      this.etapaCorrente = proximaEtapa;
      this.countPosicoes = countPosicoes;
      this.posicaoCorrente = this.posicoes[countPosicoes - 1];
      this.ajustePessoas();
      return;
    }

    if (proximaEtapa == "escolhaDoLugarDeOcupacao") {
      this.etapaCorrente = "inicioDoTeste";
      return;
    }

    if (proximaEtapa == "testeAB") {
      this.countPosicoes = 0;
      this.trocarLugarDeOcupacao(++this.countPosicoes);
    }

    this.etapaCorrente = proximaEtapa;
  }

  private trocarLugarDeOcupacao(posicao: number) {
    this.lugarOcupado = this.lugaresOcupados.find(l => l.posicao == posicao);
    this.interacaoPorLugarDeOcupacao = new InteracaoPorLugarDeOcupacao(this.lugarOcupado);
    this.atraso = this.atrasos[0];
  }

  private ajustePessoas() {
    this.pessoasNaoEscolhidas = this.pessoas;
    this.pessoasAleatorias = [];
    for (let index = 0; index < this.pessoas.length; index++) {
      this.pessoasAleatorias.push(this.obtenhaPessoaAleatoriamente());
    }
  }

  obtenhaPessoaAleatoriamente() {
    var indexPessoa = random(0, this.pessoasNaoEscolhidas.length - 1);
    var pessoaEscolhida = this.pessoasNaoEscolhidas[indexPessoa];
    this.pessoasNaoEscolhidas = this.pessoasNaoEscolhidas.filter(pn => pn.value != pessoaEscolhida.value);
    return pessoaEscolhida;
  }

  voltarEtapa(etapaAnterior: string) {
    this.etapaCorrente = etapaAnterior;
  }

  onPessoaChange(pessoa: any) {
    if (pessoa) {
      this.lugarOcupado.pessoa = pessoa.text;
      return;
    }
  }

  onFrequenciaChange(frequencia: { value, text }) {
    this.lugarOcupado.frequencia = frequencia.text;
  }

  escolherOpcao(opcaoEscolhida: string) {
    this.etapaCorrente = "";
    let continuarMostrandoOpcoes: boolean = true;

    if (opcaoEscolhida == "A") {
      continuarMostrandoOpcoes = this.condicaoDeInteracao.escolheuInteragirImediatamente();
    }

    if (opcaoEscolhida == "B") {
      continuarMostrandoOpcoes = this.condicaoDeInteracao.escolheuEsperarAInteracao();
    }

    if (continuarMostrandoOpcoes) {
      this.etapaCorrente = "testeAB";
      return;
    }

    this.interacaoPorLugarDeOcupacao.adicioneInteracaoPorAtraso(
      new InteracaoDeAtraso(this.atraso.value, this.condicaoDeInteracao.media, this.condicaoDeInteracao.escolhas)
    );

    const indiceDoProximoAtraso = Number(this.atraso.value + 1);
    if (indiceDoProximoAtraso <= this.atrasos.length) {
      this.etapaCorrente = "testeAB";
      this.atraso = this.atrasos[indiceDoProximoAtraso - 1];
      this.condicaoDeInteracao = new CondicaoInteracao(50);
      return;
    }

    this.descontoSocial.adicioneInteracao(this.interacaoPorLugarDeOcupacao);
    console.info("this.descontoSocial", this.descontoSocial);
    if (++this.countPosicoes <= this.posicoes.length) {
      this.etapaCorrente = "testeAB";
      this.trocarLugarDeOcupacao(this.posicoes[this.countPosicoes - 1]);
      this.condicaoDeInteracao = new CondicaoInteracao(50);
      return;
    }

    //chamar servico para salvar dados
    this.salvarDescontoSocial();
    this.etapaCorrente = "fimDasEtapas";
  }

  salvarDescontoSocial() {
    this.dashboardService.create(this.descontoSocial).subscribe(
      descontoSocial => this.actionFormSuccess(descontoSocial),
      error => this.actionsFormError(error)
    )
  }

  actionFormSuccess(despesa: any) {
    toastr.success("Teste finalizado com sucesso!");
  }

  actionsFormError(error: any) {
    toastr.error("Ocorreu um erro ao processar sua solicitação!");
    console.error("erro", error);
  }

}