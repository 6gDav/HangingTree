<script lang="ts">
    const words: string[] = [
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
    ];

    let selected_word: string = words[Math.floor(Math.random() * words.length)];

    let inputChar: string = $state<string>("");

    let errorCounter: number = 0;

    function submitCharacter() {
        inputChar = ""
        if (inputChar) {
            const isSingleBitRegex: boolean = /^[01]$/.test(inputChar);

            if (isSingleBitRegex) {
                if (selected_word.includes(inputChar)) {
                    //succesfull logic
                } else {
                    errorCounter++;
                }
            }
        }
    }
</script>

<h1 style="font-size: 55px;">HangingTree</h1>
<p>Main content here</p>
<br />
<p>debug: a kitalálandó szó: {selected_word}</p>

<input type="text" maxlength="1" bind:value={inputChar} /> <br />
<button on:click={submitCharacter}>Submit your try</button>
