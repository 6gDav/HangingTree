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

    let includedChars: string[] = $state<string[]>([]);

    let errorCounter: number = $state<number>(0);

    function submitCharacter() {
        console.log("exc");

        const char = inputChar.toLowerCase();

        if (char && /^[a-z]$/.test(char)) {
            if (selected_word.includes(char)) {
                includedChars.push(char);
            } else {
                errorCounter++;
                console.log(errorCounter);
            }
        }
        console.log(includedChars);
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

{#each selected_word as char}
    {#if includedChars.includes(char)}
        <div>{char}</div>
    {:else}
        <div>_</div>
    {/if}
{/each}

<input type="text" maxlength="1" bind:value={inputChar} /> <br />
<button onclick={() => submitCharacter()}>Submit your try</button>
