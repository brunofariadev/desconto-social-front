import { LugarDeOcupacao } from "./lugar-de-ocupacao.model";

export class DescontoSocial {
    public interacoesPorLugarDeOcupacao: InteracaoPorLugarDeOcupacao[] = [];

    public adicioneInteracao(interacaoPorLugarDeOcupacao: InteracaoPorLugarDeOcupacao): void {
        this.interacoesPorLugarDeOcupacao.push(interacaoPorLugarDeOcupacao);
    }
}

export class InteracaoPorLugarDeOcupacao {
    public interacoesPorAtraso: InteracaoDeAtraso[] = [];

    constructor(public lugarDeOcupacao: LugarDeOcupacao) { }

    public adicioneInteracaoPorAtraso(interacaoDeAtraso: InteracaoDeAtraso) {
        this.interacoesPorAtraso.push(interacaoDeAtraso);
    }
}

export class InteracaoDeAtraso {
    // escolhas: Escolha[] = [];

    constructor(
        readonly atraso: number,
        readonly media: number,
        readonly escolhas: Escolha[]
    ) {

    }

    // public adicioneEscolha(tipoDaEscolha: TipoDaEscolha, tempoVariavel: number) {
    //     this.escolhas.push(new Escolha(tipoDaEscolha, tempoVariavel));
    // }
}

export class Escolha {
    constructor(
        readonly tentativa: number,
        readonly tipoDaEscolha: TipoDaEscolha,
        readonly tempoVariavel: number
    ) { }
}

export enum TipoDaEscolha {
    Fixo = "Fixo",
    Variavel = "Variável"
}

