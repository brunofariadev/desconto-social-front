import { LugarDeOcupacao } from "./lugar-de-ocupacao.model";

export class DescontoSocial {
    public interacoesPorLugarDeOcupacao: InteracaoPorLugarDeOcupacao[] = [];
    public participante: number;
    public identificadorDoParticipante: string;
    public idade: number;
    public genero: string;

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
    readonly ordemAtraso: number;

    constructor(
        readonly atraso: string,
        readonly media: number,
        readonly escolhas: Escolha[]
    ) {
        this.ordemAtraso = this.obterOrdemDoAtraso();
    }

    obterOrdemDoAtraso(): number {
        switch (this.atraso) {
            case "1 dia":
                return 1;
            case "2 dias":
                return 2;
            case "1 semana":
                return 3;
            case "1 mês":
                return 4;
            case "2 meses":
                return 5;
            case "6 meses":
                return 6;
            case "1 ano":
                return 7;
            default:
                throw new Error(`O atraso ${this.atraso} não existe`);
        }
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

