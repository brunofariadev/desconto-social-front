export class LugarDeOcupacao {
    public posicao: number;
    // public pessoa: string;
    public frequencia: string;
    // public outraPessoa: string;
    public grauDeRelacao: string;
    public iniciaisDoNome: string;

    // public get pessoaEscolhida(): string {
    //     return this.pessoa == "Outra pessoa" ? this.outraPessoa : this.pessoa;
    // }

    // public get pessoaFormatada(): string {
    //     return this.pessoa == "Outra pessoa" ? `${this.outraPessoa} - ${this.pessoa}` : this.pessoa;
    // }

    public get pessoaEscolhida(): string {
        return this.grauDeRelacao + " - " + this.iniciaisDoNome;
    }
}