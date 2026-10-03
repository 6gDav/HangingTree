<script lang="ts">
  import { page } from "$app/state";
</script>

<main>
  <div id="error-conatiner">
    <h1>{page.status}</h1>
    <hr />
    <h2>{page?.error?.message}</h2>
  </div>
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
    background: radial-gradient(circle at 15% 15%, #312e81 0, transparent 32%),
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
      linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
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
    content: " • SOMETHING WEN'T WRONG";
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

  /* justify-content: center; */
  /* align-items: center; */
  /*
  #error-conatiner {
    color: red;
    display: grid;

    place-content: center;
    min-height: 100vh;
    text-align: center;
    gap: 0rem;
  }

  #error-conatiner hr {
    width: 100%;
  }

  #error-conatiner h1 {
    font-size: 6rem;
  }

  #error-conatiner p {
    font-size: 6rem;
  }
  */
</style>
