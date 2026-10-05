<script lang="ts">
    import "$lib/components/incexclude.css"

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

