import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { CondicaoInteracao } from '../models/condicao-interacao';
import { DescontoSocial, InteracaoDeAtraso, InteracaoPorLugarDeOcupacao } from '../models/desconto-social';
import { LugarDeOcupacao } from '../models/lugar-de-ocupacao.model';
import { Options } from '../models/options';
import { random } from '../utils/numberUtils';
import { UtilOptions } from '../utils/util.options';
declare var $: any;
import toastr from 'toastr';
import { sleepTime } from '../utils/SleepTime';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})

export class TesteComponent {
  teste1 = "";
  teste2 = 0;
  etapaCorrente = "form";
  posicoes: number[] = [1, 2, 5, 10, 20, 50, 100];
  // posicoes: number[] = [1, 2];
  countPosicoes: number = 0;
  // posicaoCorrente: number;
  lugaresOcupados: LugarDeOcupacao[] = [];
  // lugarOcupado: LugarDeOcupacao;
  lugarOcupadoCorrente: LugarDeOcupacao;

  pessoas: { value, text }[] = [];
  pessoasAleatorias: { value, text }[] = [];
  pessoasNaoEscolhidas: { value, text }[] = [];
  pessoasJaEscolhidas: string[] = [];

  frequencias: { value, text }[] = [];

  atrasos: { value, text }[] = [];

  sexos: { value, text }[] = [];

  condicaoDeInteracao: CondicaoInteracao;
  condicoesDeInteracoes: CondicaoInteracao[] = [];
  atraso: { value, text };

  descontoSocial: DescontoSocial;
  interacaoPorLugarDeOcupacao: InteracaoPorLugarDeOcupacao;
  mensagemTela: string = "";
  mostrarTelaPreta: boolean = false;

  constructor(
    private dashboardService: DashboardService
  ) {
    this.pessoas = UtilOptions.getOptions(Options.pessoas);
    this.frequencias = UtilOptions.getOptions(Options.frequencias);
    this.atrasos = UtilOptions.getOptions(Options.atrasos);
    this.sexos = UtilOptions.getOptions(Options.sexoEnum);
    // this.lugarOcupado = new LugarDeOcupacao();
    this.lugarOcupadoCorrente = new LugarDeOcupacao()
    this.descontoSocial = new DescontoSocial();
    this.lugaresOcupados = [];
  }

  async proximaEtapa(proximaEtapa: string, countPosicoes: number = 0, fimEtapaLugarOcupacao = false) {
    // if (proximaEtapa == "escolhaDoLugarDeOcupacao" && countPosicoes != 1) {
    //   $("#buttonVoltarDoLugarOcupacao").hide();
    // }

    // if (this.etapaCorrente == "escolhaDoLugarDeOcupacao") {
    //   if (!this.lugarOcupado.pessoa || (this.lugarOcupado.pessoa == "Outra pessoa" && !this.lugarOcupado.outraPessoa)) {
    //     alert("Por favor selecione ou digite uma pessoa para o lugar de ocupação");
    //     return;
    //   }
    //   this.lugarOcupado.pessoa == "Outra pessoa" ?
    //     this.pessoasJaEscolhidas.push(this.lugarOcupado.outraPessoa) :
    //     this.pessoasJaEscolhidas.push(this.lugarOcupado.pessoa);
    //   $(".radioLugarOcupacao").prop("checked", false);
    // }

    if (this.etapaCorrente == "escolhaDaFrequencia") {
      if (!this.lugarOcupadoCorrente.frequencia) {
        alert("Por favor selecione uma frequência");
        return;
      }
    }

    // if (proximaEtapa == "escolhaDoLugarDeOcupacao" && fimEtapaLugarOcupacao) {
    //   this.lugarOcupado.posicao = this.posicaoCorrente;
    //   this.lugaresOcupados.push(this.lugarOcupado);
    //   console.log("this.lugaresOcupados", this.lugaresOcupados);
    //   this.lugarOcupado = new LugarDeOcupacao();
    //   this.condicaoDeInteracao = new CondicaoInteracao(50);

    // }

    // if (proximaEtapa == "escolhaDoLugarDeOcupacao" && countPosicoes <= this.posicoes.length) {
    //   this.etapaCorrente = proximaEtapa;
    //   this.countPosicoes = countPosicoes;
    //   this.posicaoCorrente = this.posicoes[countPosicoes - 1];
    //   this.ajustePessoas();
    //   return;
    // }

    if (this.etapaCorrente == "escolhaDoLugarDeOcupacao") {
      let lugaresDeOcupacaoNaoPreenchidos = this.lugaresOcupados.filter(l => !l.grauDeRelacao || !l.iniciaisDoNome);
      if (lugaresDeOcupacaoNaoPreenchidos.length > 0) {
        alert("Para continuar você deve preencher todos os espaços.");
        return;
      }
    }

    await this.mostreTelaPreta("", 1000, true);

    if (this.etapaCorrente == "escolhaDaFrequencia") {
      $(".radioFrequencia").prop("checked", false);
    }

    if (proximaEtapa == "escolhaDoLugarDeOcupacao") {
      this.etapaCorrente = proximaEtapa;
      // this.countPosicoes = countPosicoes;
      // this.posicaoCorrente = this.posicoes[countPosicoes - 1];
      this.crieLugaresDeOcupacao();
      // this.ajustePessoas();
      return;
    }

    if (proximaEtapa == "escolhaDaFrequencia" && countPosicoes <= this.posicoes.length) {
      this.countPosicoes = countPosicoes;
      this.lugarOcupadoCorrente = this.lugaresOcupados[countPosicoes - 1];
      this.etapaCorrente = proximaEtapa;
      return;
    }

    if (proximaEtapa == "escolhaDaFrequencia" && countPosicoes > this.posicoes.length) {
      this.etapaCorrente = "inicioDoTeste";
      return;
    }

    if (proximaEtapa == "testeAB") {
      this.countPosicoes = 0;
      this.condicaoDeInteracao = new CondicaoInteracao(50);
      this.trocarLugarDeOcupacao(++this.countPosicoes);
    }

    this.etapaCorrente = proximaEtapa;
  }

  crieLugaresDeOcupacao() {
    this.lugaresOcupados = [];
    for (const posicao of this.posicoes) {
      const lugarDeOcupacao = new LugarDeOcupacao();
      lugarDeOcupacao.posicao = posicao;
      this.lugaresOcupados.push(lugarDeOcupacao);
    }
  }

  private trocarLugarDeOcupacao(posicao: number) {
    this.lugarOcupadoCorrente = this.lugaresOcupados.find(l => l.posicao == posicao);
    this.mostreTelaPreta(this.lugarOcupadoCorrente.grauDeRelacao + " - " + this.lugarOcupadoCorrente.iniciaisDoNome);
    this.interacaoPorLugarDeOcupacao = new InteracaoPorLugarDeOcupacao(this.lugarOcupadoCorrente);
    this.atraso = this.atrasos[0];
  }

  // private ajustePessoas() {
  //   this.pessoasNaoEscolhidas = this.pessoas;
  //   this.pessoasAleatorias = [];
  //   for (let index = 0; index < this.pessoas.length; index++) {
  //     this.pessoasAleatorias.push(this.obtenhaPessoaAleatoriamente());
  //   }
  // }

  obtenhaPessoaAleatoriamente() {
    var indexPessoa = random(0, this.pessoasNaoEscolhidas.length - 1);
    var pessoaEscolhida = this.pessoasNaoEscolhidas[indexPessoa];
    this.pessoasNaoEscolhidas = this.pessoasNaoEscolhidas.filter(pn => pn.value != pessoaEscolhida.value);
    return pessoaEscolhida;
  }

  voltarEtapa(etapaAnterior: string) {
    this.etapaCorrente = etapaAnterior;
  }

  // onPessoaChange(pessoa: any, event) {
  //   const pessoaSelecionada = pessoa.text || pessoa;
  //   if (pessoaSelecionada != "Outra pessoa" && this.pessoasJaEscolhidas.some(pessoaJaEscolhida => pessoaJaEscolhida == pessoaSelecionada)) {
  //     $(event.target).prop("checked", false);
  //     alert("Essa pessoa já foi escolhida, por favor selecione outra");
  //     return;
  //   }
  //   this.lugarOcupado.pessoa = pessoaSelecionada;
  // }

  onFrequenciaChange(frequencia: { value, text }) {
    // this.lugarOcupado.frequencia = frequencia.text;
    this.lugarOcupadoCorrente.frequencia = frequencia.text;
  }

  async escolherOpcao(opcaoEscolhida: string) {
    await this.mostreTelaPreta("", 500, true);
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
      new InteracaoDeAtraso(this.atraso.text, this.condicaoDeInteracao.media, this.condicaoDeInteracao.escolhas)
    );

    const indiceDoProximoAtraso = Number(this.atraso.value + 1);
    if (indiceDoProximoAtraso <= this.atrasos.length) {
      this.atraso = this.atrasos[indiceDoProximoAtraso - 1];
      this.mostreTelaPreta(this.atraso.text);
      this.etapaCorrente = "testeAB";
      this.condicaoDeInteracao = new CondicaoInteracao(50);
      return;
    }

    this.descontoSocial.adicioneInteracao(this.interacaoPorLugarDeOcupacao);
    // console.info("this.descontoSocial", this.descontoSocial);
    if (++this.countPosicoes <= this.posicoes.length) {
      this.etapaCorrente = "testeAB";
      this.trocarLugarDeOcupacao(this.posicoes[this.countPosicoes - 1]);
      this.condicaoDeInteracao = new CondicaoInteracao(50);
      return;
    }
    this.salvarDescontoSocial();
    this.etapaCorrente = "fimDasEtapas";
  }

  private async mostreTelaPreta(mensagemTela: string, timeInMs = 2500, ativarSleepTime = false) {
    this.mostrarTelaPreta = true;
    this.mensagemTela = mensagemTela;
    if (!ativarSleepTime) {
      setTimeout(() => {
        this.mostrarTelaPreta = false;
      }, timeInMs);
    } else {
      await sleepTime(timeInMs);
      this.mostrarTelaPreta = false;
    }
  }

  salvarDescontoSocial() {
    this.dashboardService.create(this.descontoSocial).subscribe(
      descontoSocial => this.actionFormSuccess(descontoSocial),
      error => this.actionsFormError(error)
    )
  }

  actionFormSuccess(despesa: any) {
    toastr.success("Teste finalizado com sucesso!");
    window.location.reload();
  }

  actionsFormError(error: any) {
    toastr.error("Ocorreu um erro ao processar sua solicitação!");
    console.error("erro", error);
  }

  onSexoChange(sexo) {
    this.descontoSocial.genero = sexo == "0" ? "" : this.sexos[Number(sexo) - 1].text;
  }

}