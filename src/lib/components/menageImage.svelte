<script lang="ts">
    import { base } from "$app/paths";

    let { wolrdLogic } = $props();
</script>

<img
    src="{base}/hangman_states/a{wolrdLogic.errorCounter}.png"
    alt="Hangman state {wolrdLogic.errorCounter}"
/>

<style>
    img {
        display: block;
        width: 270px;
        height: 270px;
        object-fit: contain;
        margin: 22px auto 28px;
        padding: 14px;
        border-radius: 24px;
        border: 1px solid rgba(129, 140, 248, 0.25);
        background: rgba(22, 26, 43, 0.65);
        box-shadow:
            0 0 35px rgba(99, 102, 241, 0.18),
            inset 0 0 30px rgba(0, 0, 0, 0.35);
        transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
    }

    img:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow:
            0 0 50px rgba(99, 102, 241, 0.3),
            inset 0 0 30px rgba(0, 0, 0, 0.35);
    }

    @media (max-width: 600px) {
        img {
            width: 220px;
            height: 220px;
        }
    }
</style>
