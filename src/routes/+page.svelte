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
        "variable"
    ];

    let selected_word: string = words[Math.floor(Math.random() * words.length)];

    let inputChar: string = $state<string>("");

    function submitCharacter() {
        console.log("Submit clicked")
    }

</script>

<h1 style="font-size: 55px;">HangingTree</h1>
<p>Main content here</p>
<br>
<p>debug: a kitalálandó szó: {selected_word}</p>

<input type="text" maxlength="1" bind:value={inputChar}> <br>
<button onclick={() => submitCharacter}>Submint your try</button>
