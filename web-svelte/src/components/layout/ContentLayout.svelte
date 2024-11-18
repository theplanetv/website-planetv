<script>
    let { children } = $props();
</script>

<div class="my-20 flex flex-col gap-y-5">
  {@render children()}
</div>