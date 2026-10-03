<script lang="ts">
    import { base } from "$app/paths";

    const words: string[] =  $state<string[]>([
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

    let selectedWord: string = $state<string>(
        words[Math.floor(Math.random() * words.length)],
    );

    let inputChar: string = $state<string>("");
    let guessText: string = $state<string>("");

    let includedChars: string[] = $state<string[]>([]);

    let excludedChars: string[] = $state<string[]>([]);

    let errorCounter: number = $state<number>(0);

    let isWon = $derived(
        selectedWord.split("").every((char) => includedChars.includes(char)),
    );

    let isLost = $derived(errorCounter >= 12);

    function reset() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        includedChars = [];
        excludedChars = [];
        errorCounter = 0;
        inputChar = "";
        guessText = "";
    }

    $effect(() => {
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
        submitGuess();
    }

    function submitCharacter() {
        const char = inputChar.toLowerCase();

        if (char && /^[a-z]$/.test(char)) {
            if (selectedWord.includes(char)) {
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
        inputChar = "";
    }

    function submitGuess() {
        const guess = guessText.toLowerCase();

        if (guess === selectedWord) {
            reset();
            alert("Victory!");
        }
    }
</script>

<main>
    <h1>HangingTree</h1>
    <img
        src="{base}/hangman_states/a{errorCounter}.png"
        alt="Hangman state {errorCounter}"
    />

    {#each excludedChars as char}
        <span class="excluded-chars">{char + ";"}</span>
    {/each}
    <br />
    {#each selectedWord as char}
        {#if includedChars.includes(char)}
            <span>{char}</span>
        {:else}
            <span>_</span>
        {/if}
    {/each}

    <form onsubmit={(e: SubmitEvent) => handleSubmit(e)}>
        <h2>Character?</h2>
        <input type="text" maxlength="1" bind:value={inputChar} />
        <br />
        <button onclick={() => submitCharacter()}>Submit your try</button>
    </form>
    <hr />
    <form action="">
        <h2>Guess?</h2>
        <input class="guess-input" type="text" bind:value={guessText} />
        <br />
        <button onclick={() => submitGuess()}>Submit your guess</button>
    </form>
</main>

<style>
    :global(*) { box-sizing: border-box; }

    :global(body) {
        margin: 0;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #f8fafc;
        background:
            radial-gradient(circle at 15% 15%, #312e81 0, transparent 32%),
            radial-gradient(circle at 85% 85%, #581c87 0, transparent 30%),
            linear-gradient(135deg, #070711, #111827 55%, #09090f);
        overflow-x: hidden;
    }

    :global(body)::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
        background-size: 40px 40px;
        mask-image: linear-gradient(to bottom, black, transparent);
    }

    main {
        position: relative;
        width: min(760px, 92%);
        margin: 40px 0;
        padding: 42px;
        text-align: center;
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 28px;
        background: rgba(15,23,42,.78);
        backdrop-filter: blur(20px);
        box-shadow: 0 30px 80px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.08);
    }

    h1 {
        margin: 0;
        font-size: clamp(42px, 8vw, 72px);
        font-weight: 900;
        letter-spacing: -4px;
        background: linear-gradient(90deg, #a78bfa, #22d3ee, #f472b6);
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 0 0 35px rgba(129,140,248,.25);
        animation: titleGlow 5s ease infinite;
    }

    h1::after {
        content: " • THE ULTIMATE HANGMAN";
        display: block;
        margin-top: 8px;
        font-size: 11px;
        letter-spacing: 5px;
        color: #94a3b8;
        font-weight: 700;
    }

    h2 {
        margin: 0 0 16px;
        font-size: 18px;
        font-style: normal;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #cbd5e1;
    }

    img {
        display: block;
        width: 270px;
        height: 270px;
        object-fit: contain;
        margin: 22px auto 28px;
        padding: 14px;
        border-radius: 24px;
        border: 1px solid rgba(129,140,248,.25);
        background: rgba(2,6,23,.65);
        box-shadow: 0 0 35px rgba(99,102,241,.18), inset 0 0 30px rgba(0,0,0,.35);
        transition: transform .25s ease, box-shadow .25s ease;
    }

    img:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 0 50px rgba(99,102,241,.3), inset 0 0 30px rgba(0,0,0,.35);
    }

    span { display: inline-block; margin: 0 5px; }

    main > span:not(.excluded-chars) {
        min-width: 28px;
        padding: 0 5px 8px;
        margin: 4px;
        font-size: 30px;
        font-weight: 800;
        border-bottom: 3px solid #6366f1;
        color: #f8fafc;
        text-shadow: 0 0 15px rgba(129,140,248,.55);
    }

    .excluded-chars {
        margin: 3px;
        padding: 5px 10px;
        border-radius: 999px;
        color: #fda4af;
        background: rgba(244,63,94,.1);
        border: 1px solid rgba(244,63,94,.25);
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
    }

    form {
        margin-top: 34px;
        padding: 24px;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 20px;
        background: rgba(255,255,255,.035);
    }

    hr {
        margin: 24px 0;
        border: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(129,140,248,.45), transparent);
    }

    input {
        width: 58px;
        height: 58px;
        text-align: center;
        font-size: 28px;
        font-weight: 800;
        color: #f8fafc;
        background: rgba(2,6,23,.75);
        border: 2px solid #334155;
        border-radius: 14px;
        outline: none;
        transition: .2s ease;
    }

    input:hover { border-color: #6366f1; }

    input:focus {
        border-color: #818cf8;
        transform: translateY(-2px);
        box-shadow: 0 0 0 4px rgba(99,102,241,.15), 0 0 25px rgba(99,102,241,.25);
    }

    .guess-input {
        width: min(320px, 90%);
        padding: 0 18px;
        text-align: center;
        font-size: 20px;
    }

    button {
        margin-top: 15px;
        padding: 12px 28px;
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 12px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        font-size: 15px;
        font-weight: 800;
        letter-spacing: .5px;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(99,102,241,.28);
        transition: all .2s ease;
    }

    button:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 32px rgba(99,102,241,.4), 0 0 20px rgba(139,92,246,.2);
        filter: brightness(1.08);
    }

    button:active { transform: translateY(0) scale(.97); }

    @keyframes titleGlow {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }

    @media (max-width: 600px) {
        :global(body) { align-items: flex-start; }
        main { width: 94%; margin: 18px 0; padding: 26px 16px; border-radius: 22px; }
        h1 { font-size: 46px; letter-spacing: -3px; }
        h1::after { font-size: 8px; letter-spacing: 3px; }
        img { width: 220px; height: 220px; }
        main > span:not(.excluded-chars) { font-size: 25px; }
    }
</style>
