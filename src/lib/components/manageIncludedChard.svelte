<script lang="ts">
    let { wolrdLogic } = $props();
</script>

<section>
    {#each wolrdLogic.selectedWord as char}
        {#if wolrdLogic.includedChars.includes(char)}
            <span>{char}</span>
        {:else}
            <span>_</span>
        {/if}
    {/each}
</section>

<style>
    span {
        display: inline-block;
        margin: 0 5px;
    }

    section > span:not(.excluded-chars) {
        min-width: 28px;
        padding: 0 5px 8px;
        margin: 4px;
        font-size: 30px;
        font-weight: 800;
        border-bottom: 3px solid #6366f1;
        color: #f8fafc;
        text-shadow: 0 0 15px rgba(129, 140, 248, 0.55);
    }
</style>
