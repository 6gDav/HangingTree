<script lang="ts">
    import "$lib/components/incexclude.css"

    let { wordLogic } = $props();
</script>

<section>
    {#each wordLogic.selectedWord as char}
        {#if wordLogic.includedChars.includes(char)}
            <span>{char}</span>
        {:else}
            <span>_</span>
        {/if}
    {/each}
</section>

