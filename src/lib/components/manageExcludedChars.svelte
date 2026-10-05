<script lang="ts">
    import "$lib/components/incexclude.css"

    let { wolrdLogic } = $props();
</script>

<section>
    {#each wolrdLogic.excludedChars as char}
        <span class="excluded-chars">{char}</span>
    {/each}
</section>

