<script>
  let { class: className, children } = $props();
</script>

<h1 class={`text-center text-2xl font-bold ${className}`}>
  {@render children()}
</h1>
