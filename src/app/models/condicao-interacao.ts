import { random } from "../utils/numberUtils";
import { Escolha, TipoDaEscolha } from "./desconto-social";

export class CondicaoInteracao {
    public guess: number;
    private min = 0;
    private max = 100;
    private randomValues: number[];
    private guessOut: number[] = [];
    public media: number;
    public escolhas: Escolha[];
    private tentativa: number = 0;

    constructor(guess: number) {
        this.guess = guess;
        this.escolhas = [];
    }

    public escolheuEsperarAInteracao(): boolean {
        this.escolhas.push(new Escolha(++this.tentativa, TipoDaEscolha.Fixo, this.guess));
        this.min = this.guess;
        this.nextGuess();
        if (this.min >= this.max || this.guess == this.max || this.randomValues.length <= 0) {
            this.media = (this.min + this.max) / 2;
            return false;
        }
        return true;
    }

    public escolheuInteragirImediatamente(): boolean {
        this.escolhas.push(new Escolha(++this.tentativa, TipoDaEscolha.Variavel, this.guess));
        this.max = this.guess;
        this.nextGuess(false);
        if (this.max <= this.min || this.guess == this.min || this.randomValues.length <= 0) {
            this.media = (this.min + this.max) / 2;
            return false;
        }
        return true;
    }

    private nextGuess(esperarInteracao = true) {
        this.guessOut.push(this.guess);
        this.randomValues = this.getRandomValues(esperarInteracao);
        var index = random(0, this.randomValues.length - 1);
        if (this.randomValues.length > 0)
            this.guess = this.randomValues[index];
    }

    private getRandomValues(esperarInteracao: boolean): number[] {
        let randomValues: number[] = [];
        const minCompare = esperarInteracao ? this.min + 5 : this.min;
        const maxCompare = esperarInteracao ? this.max : this.max - 5;

        for (let i = minCompare; i <= maxCompare; i += 5) {
            if (!this.guessOut.includes(i))
                randomValues.push(i);
        }

        return randomValues;
    }
}