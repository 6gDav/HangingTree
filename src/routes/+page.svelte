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

    let errorCounter: number = $state<number>(0);

    function submitCharacter() {
        console.log("exc");

        const char = inputChar.toLowerCase();

        if (char && /^[a-z]$/.test(char)) {
            if (selected_word.includes(char)) {
                // succes logika
            } else {
                errorCounter++;
                console.log(errorCounter);
            }
        }
        inputChar = "";
    }
</script>

<h1 style="font-size: 55px;">HangingTree</h1>
<p>Main content here</p>
<br />
<p>debug: a kitalálandó szó: {selected_word}</p>

<img
    src="/hangman_states/a{errorCounter}.png"
    alt="Hangman state {errorCounter}"
/>

<input type="text" maxlength="1" bind:value={inputChar} /> <br />
<button onclick={() => submitCharacter()}>Submit your try</button>
