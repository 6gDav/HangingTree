<script lang="ts">
  let dialog = $state<HTMLDialogElement>();
  let { isOpen = $bindable(false), title, message, selectedWord } = $props();

  $effect(() => {
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  });
</script>

<dialog bind:this={dialog} onclose={() => (isOpen = false)}>
  <div class="box">
    <h3>{title}</h3>
    <hr />
    <p>{message}</p>
    <hr>
    <p><i>{selectedWord}</i></p>
    <button onclick={() => (isOpen = false)}>Ok</button>
  </div>
</dialog>

<style>
  dialog {
    padding: 0;
    border: none;
    background: transparent;
    max-width: min(440px, 90vw);
    outline: none;
  }

  dialog::backdrop {
    background: rgba(3, 7, 18, 0.7);
    backdrop-filter: blur(12px);
  }

  .box {
    padding: 32px 28px;
    text-align: center;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(15, 23, 42, 0.88);
    backdrop-filter: blur(25px);
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.65),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    color: #f8fafc;
  }

  h3 {
    margin: 0;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.5px;
    background: linear-gradient(90deg, #a78bfa, #22d3ee);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 25px rgba(129, 140, 248, 0.35);
  }

  hr {
    margin: 18px auto;
    border: 0;
    height: 1px;
    width: 80%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(129, 140, 248, 0.45),
      transparent
    );
  }

  p {
    margin: 0 0 24px;
    font-size: 15px;
    line-height: 1.6;
    color: #cbd5e1;
  }

  button {
    padding: 12px 32px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.28);
    transition: all 0.2s ease;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow:
      0 12px 32px rgba(99, 102, 241, 0.45),
      0 0 20px rgba(139, 92, 246, 0.3);
    filter: brightness(1.08);
  }

  button:active {
    transform: translateY(0) scale(0.97);
  }
</style>