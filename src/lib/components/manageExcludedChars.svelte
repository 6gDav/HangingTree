<script lang="ts">
    import "$lib/components/incexclude.css"

    let { wordLogic } = $props();
</script>

<section>
    {#each wordLogic.excludedChars as char}
        <span class="excluded-chars">{char}</span>
    {/each}
</section>

