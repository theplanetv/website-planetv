<script>
  let { type, children } = $props();
</script>

<button
  {type}
  class="border px-5 py-2 rounded-full bg-orange-svelte text-white hover:border-orange-svelte hover:bg-white hover:text-orange-svelte"
>
  {@render children()}
</button>
