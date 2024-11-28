<script>
  import { ActiveOptionEnum } from "$lib/enum.js";
  import H1 from "./header/H1.svelte";

  let { activeOption } = $props();
</script>

<nav class="h-screen">
  <H1 class="py-5 px-10">Admin dashboard</H1>

  <div class="flex flex-col">
    <button
      class={`py-2 
        ${activeOption.value === ActiveOptionEnum.BLOGTAG ?
        "bg-orange-svelte text-white" :
        ""
        }`
      }
      onclick={() => {
        activeOption.value = ActiveOptionEnum.BLOGTAG
      }}
    >
      Tag
    </button>

    <button
    class={`py-2 
      ${activeOption.value === ActiveOptionEnum.SETTINGS ?
      "bg-orange-svelte text-white" :
      ""
      }`
    }
      onclick={() => {
        activeOption.value = ActiveOptionEnum.SETTINGS
      }}
    >
      Settings
    </button>
  </div>
</nav>