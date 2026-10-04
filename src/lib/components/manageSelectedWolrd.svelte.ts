const WORDS: string[] = $state<string[]>([
    "programming",
    "typescript",
    "svelte",
    "javascript",
    "frontend",
    "backend",
    "developer",
    "algorithm",
    "function",
    "variable",
]);

export class WordLogic {
    private _selectedWord: string = $state<string>("");
    private _includedChars: string[] = $state<string[]>([]);
    private _excludedChars: string[] = $state<string[]>([]);
    private _errorCounter: number = $state<number>(0);

    constructor() {
        this._selectedWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    }

    get selectedWord(): string {
        return this._selectedWord;
    }

    get includedChars(): string[] {
        return this._includedChars;
    }

    get excludedChars(): string[] {
        return this._excludedChars;
    }

    get errorCounter(): number {
        return this._errorCounter;
    }

    set errorCounter(val: number) {
        this._errorCounter = this._errorCounter + 1;
    }

    isWon(): boolean {
        return this._selectedWord.split("").every((char) => this._includedChars.includes(char));
    }

    isLost(): boolean {
        return this._errorCounter >= 12;
    }

    reset(): void {
        this._selectedWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        this._includedChars = [];
        this._excludedChars = [];
        this._errorCounter = 0;
    }

    submitCharacter(inputChar: string): void {
        const char = inputChar.toLowerCase();

        if (char && /^[a-z]$/.test(char)) {
            if (this._selectedWord.includes(char)) {
                if (!this._includedChars.includes(char)) {
                    this._includedChars.push(char);
                }
            } else {
                if (!this._excludedChars.includes(char)) {
                    this._errorCounter++;
                    this._excludedChars.push(char);
                }
            }
        }
    }

    submitGuess(guessText: string): [boolean, boolean] {
        const guess = guessText.toLowerCase();

        return [guess === this._selectedWord, guess !== "" && guess !== this._selectedWord];
    }
}