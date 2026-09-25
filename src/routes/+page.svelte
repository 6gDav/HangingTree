<script lang="ts">
    import { base } from "$app/paths";

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

    let selected_word: string = $state<string>(
        words[Math.floor(Math.random() * words.length)],
    );

    let inputChar: string = $state<string>("");

    let includedChars: string[] = $state<string[]>([]);
    
    let excludedChars: string[] = $state<string[]>([]);

    let errorCounter: number = $state<number>(0);

    let isWon = $derived(
        selected_word.split("").every((char) => includedChars.includes(char)),
    );

    let isLost = $derived(errorCounter >= 12);

    $effect(() => {
        const reset = () => {
            selected_word = words[Math.floor(Math.random() * words.length)];
            includedChars = [];
            errorCounter = 0;
        };

        if (isWon) {
            reset();
            alert("Victory!");
        } else if (isLost) {
            reset();
            alert("Game Over!");
        }
    });

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        submitCharacter();
    }

    function submitCharacter() {
        console.log("exc");

        const char = inputChar.toLowerCase();

        if (char && /^[a-z]$/.test(char)) {
            if (selected_word.includes(char)) {
                if (!includedChars.includes(char)) {
                    includedChars.push(char);
                }
            } else {

                if (!excludedChars.includes(char)) {
                    errorCounter++;
                    excludedChars.push(char)
                }
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
    src="{base}/hangman_states/a{errorCounter}.png"
    alt="Hangman state {errorCounter}"
/>

{#each selected_word as char}
    {#if includedChars.includes(char)}
        <div>{char}</div>
    {:else}
        <div>_</div>
    {/if}
{/each}

<form onsubmit={(e: SubmitEvent) => handleSubmit(e)}>
    <input type="text" maxlength="1" bind:value={inputChar} />
    <br />
    <button onclick={() => submitCharacter()}>Submit your try</button>
</form>
