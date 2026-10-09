<script lang="ts">
    import { WordLogic } from "$lib/components/manageSelectedWord.svelte";

    import ImageManagger from "$lib/components/manageImage.svelte";
    import ExcludedManagger from "$lib/components/manageExcludedChars.svelte";
    import IncludedManagger from "$lib/components/manageIncludedChars.svelte";
    import Notification from "$lib/components/notification.svelte";

    const wordLogic: WordLogic = new WordLogic();

    let inputChar: string = $state<string>("");
    let guessText: string = $state<string>("");

    let notification = $state({
        show: false,
        log: "",
        word: "",
    });

    function triggerGameOver(message: string) {
        notification.show = true;
        notification.log = message;
        notification.word = wordLogic.selectedWord;

        reset();
    }

    function reset() {
        wordLogic.reset();
        inputChar = "";
        guessText = "";
    }

    $effect(() => {
        if (wordLogic.isWon()) {
            triggerGameOver("Victory!");
        } else if (wordLogic.isLost()) {
            triggerGameOver("Game Over!");
        }
    });     

    function handleCharSubmit(event: SubmitEvent) {
        event.preventDefault();
        if (!inputChar.trim()) return;

        wordLogic.submitCharacter(inputChar);
        inputChar = "";
    }

    function handleGuessSubmit(event: SubmitEvent) {
        event.preventDefault();

        if (guessText.trim()) {
            const [case1, case2] = wordLogic.submitGuess(guessText);

            if (case1) {
                triggerGameOver("Victory!");
            } else if (case2) {
                triggerGameOver("Game Over!");
            }
            guessText = "";
        }
    }
</script>

<main>
    <h1>HangingTree</h1>

    <ImageManagger {wordLogic} />

    <ExcludedManagger {wordLogic} />
    <br />
    <IncludedManagger {wordLogic} />

    <form onsubmit={(e: SubmitEvent) => handleCharSubmit(e)}>
        <h2>Character?</h2>
        <input type="text" maxlength="1" bind:value={inputChar} />
        <br />
        <button type="submit">Submit your try</button>
    </form>
    <hr />
    <form onsubmit={(e: SubmitEvent) => handleGuessSubmit(e)}>
        <h2>Guess?</h2>
        <input class="guess-input" type="text" bind:value={guessText} />
        <br />
        <button type="submit">Submit your guess</button>
    </form>
    <Notification
        bind:isOpen={notification.show}
        title="Notification"
        message={notification.log}
        selectedWord={notification.word}
    />
</main>

<style>
    :global(*) {
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        color: #f8fafc;
        background: radial-gradient(
                circle at 15% 15%,
                #312e81 0,
                transparent 32%
            ),
            radial-gradient(circle at 85% 85%, #581c87 0, transparent 30%),
            linear-gradient(135deg, #070711, #111827 55%, #09090f);
        overflow-x: hidden;
    }

    :global(body)::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background-image: linear-gradient(
                rgba(255, 255, 255, 0.025) 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.025) 1px,
                transparent 1px
            );
        background-size: 40px 40px;
        mask-image: linear-gradient(to bottom, black, transparent);
    }

    main {
        position: relative;
        width: min(760px, 92%);
        margin: 40px 0;
        padding: 42px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 28px;
        background: rgba(15, 23, 42, 0.78);
        backdrop-filter: blur(20px);
        box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
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
        text-shadow: 0 0 35px rgba(129, 140, 248, 0.25);
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

    form {
        margin-top: 34px;
        padding: 24px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.035);
    }

    hr {
        margin: 24px 0;
        border: 0;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(129, 140, 248, 0.45),
            transparent
        );
    }

    input {
        width: 58px;
        height: 58px;
        text-align: center;
        font-size: 28px;
        font-weight: 800;
        color: #f8fafc;
        background: rgba(2, 6, 23, 0.75);
        border: 2px solid #334155;
        border-radius: 14px;
        outline: none;
        transition: 0.2s ease;
    }

    input:hover {
        border-color: #6366f1;
    }

    input:focus {
        border-color: #818cf8;
        transform: translateY(-2px);
        box-shadow:
            0 0 0 4px rgba(99, 102, 241, 0.15),
            0 0 25px rgba(99, 102, 241, 0.25);
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
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 12px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        font-size: 15px;
        font-weight: 800;
        letter-spacing: 0.5px;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(99, 102, 241, 0.28);
        transition: all 0.2s ease;
    }

    button:hover {
        transform: translateY(-3px);
        box-shadow:
            0 12px 32px rgba(99, 102, 241, 0.4),
            0 0 20px rgba(139, 92, 246, 0.2);
        filter: brightness(1.08);
    }

    button:active {
        transform: translateY(0) scale(0.97);
    }

    @keyframes titleGlow {
        0%,
        100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }

    @media (max-width: 600px) {
        :global(body) {
            align-items: flex-start;
        }
        main {
            width: 94%;
            margin: 18px 0;
            padding: 26px 16px;
            border-radius: 22px;
        }
        h1 {
            font-size: 46px;
            letter-spacing: -3px;
        }
        h1::after {
            font-size: 8px;
            letter-spacing: 3px;
        }
    }
</style>
