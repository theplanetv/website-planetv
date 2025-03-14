<script lang="ts">
  let { children } = $props();
</script>

<div class="xl:mx-50 flex flex-col items-center gap-y-8">
  {@render children()}
</div>
