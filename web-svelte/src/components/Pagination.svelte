<script>
    import OutlineKeyboardArrowLeft from "./icon/OutlineKeyboardArrowLeft.svelte";
    import OutlineKeyboardArrowRight from "./icon/OutlineKeyboardArrowRight.svelte";

  let { page = $bindable(), maxPage } = $props();
</script>

<div class="flex gap-x-1">
  <button
    class="border border-white rounded-lg p-1 hover:border-orange-svelte hover:bg-orange-svelte hover:text-white flex items-center"
    onclick={() => {
      if (page <= 1)
        return;

      page--;
    }}
  >
    <OutlineKeyboardArrowLeft width={28} height={28} />
  </button>

  {#if page > 1}
  <button
    class="border border-white rounded-lg px-4 py-2 hover:border-orange-svelte hover:bg-orange-svelte hover:text-white flex items-center"
    onclick={() => page = 1}
  >  
    1
  </button>
  {/if}

  {#if page > 2}
  <button class="border border-white rounded-lg px-4 py-2 hover:border-orange-svelte hover:bg-orange-svelte hover:text-white flex items-center">
    ...
  </button>
  {/if}

  <button class="border border-orange-svelte rounded-lg px-4 py-2 bg-orange-svelte text-white hover:bg-white hover:text-orange-svelte">
    {page}
  </button>

  {#if page < maxPage - 1}
  <button class="border border-white rounded-lg px-4 py-2 hover:border-orange-svelte hover:bg-orange-svelte hover:text-white flex items-center">
    ...
  </button>
  {/if}

  {#if page < maxPage}
  <button
    class="border border-white rounded-lg px-4 py-2 hover:border-orange-svelte hover:bg-orange-svelte hover:text-white flex items-center"
    onclick={() => page = maxPage}
  >
    {maxPage}
  </button>
  {/if}

  <button
    class="border border-white rounded-lg p-1 hover:border-orange-svelte hover:bg-orange-svelte hover:text-white flex items-center"
    onclick={() => {
      if (page >= maxPage)
        return;

      page++;
    }}
  >
    <OutlineKeyboardArrowRight width={28} height={28} />
  </button>
</div>