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
                    excludedChars.push(char);
                }
            }
        }
        console.log(includedChars);
        inputChar = "";
    }
</script>

<main>
    <h1 style="font-size: 55px;">HangingTree</h1>
    <p>Main content here</p>
    <br />
    <p>debug: a kitalálandó szó: {selected_word}</p>

    <img
        src="{base}/hangman_states/a{errorCounter}.png"
        alt="Hangman state {errorCounter}"
    />

    {#each selected_word as char}
        {#if excludedChars.includes(char)}
            <span class="excludedChars">{char}</span>
        {/if}
    {/each}

    {#each selected_word as char}
        {#if includedChars.includes(char)}
            <span class="includedChars">{char}</span>
        {:else}
            <span>_</span>
        {/if}
    {/each}

    <form onsubmit={(e: SubmitEvent) => handleSubmit(e)}>
        <input type="text" maxlength="1" bind:value={inputChar} />
        <br />
        <button onclick={() => submitCharacter()}>Submit your try</button>
    </form>
    <form action="">
        <h2>Guess?</h2>
        <input type="text" maxlength="1" />
    </form>
</main>

<style>
    :global(body) {
        margin: 0;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        background: #f4f4f5;
        color: #18181b;
    }

    main {
        width: min(700px, 90%);
        padding: 40px 20px;
        text-align: center;
    }

    h1 {
        margin-bottom: 10px;
        color: #27272a;
    }

    p {
        color: #52525b;
    }

    img {
        display: block;
        width: 250px;
        height: 250px;
        object-fit: contain;
        margin: 20px auto;
    }

    :global(.word) {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin: 30px 0;
    }

    :global(.word div) {
        width: 35px;
        padding-bottom: 8px;
        font-size: 28px;
        font-weight: 600;
        border-bottom: 3px solid #27272a;
    }

    form {
        margin-top: 30px;
    }

    input {
        width: 50px;
        height: 50px;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        border: 2px solid #d4d4d8;
        border-radius: 8px;
        outline: none;
    }

    input:focus {
        border-color: #6366f1;
        box-shadow: 0 0 0 3px #6366f133;
    }

    button {
        margin-top: 12px;
        padding: 10px 24px;
        border: none;
        border-radius: 8px;
        background: #6366f1;
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
    }

    button:hover {
        background: #4f46e5;
    }

    button:active {
        transform: translateY(1px);
    }
</style>
