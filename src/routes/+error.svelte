<script lang="ts">
  import {page} from '$app/state';
</script>

<p style="color:red;">{page.status}: {page.error.message}</p>
