<script lang="ts">
  import {page} from '$app/state';
</script>

<div id="error-conatiner">
  <h1>{page.status}</h1>
  <hr>
  <p>{page?.error?.message}</p>
</div>

<style>
  #error-conatiner {
    color: red;
    display: grid;
    /* justify-content: center; */
    /* align-items: center; */
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
</style>