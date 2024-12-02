<script>
  import { ActiveOptionEnum } from "$lib/enum.js";
  import H1 from "./header/H1.svelte";

  let { activeOption = $bindable() } = $props();
</script>

<nav class="h-screen">
  <H1 class="py-5 px-10">Admin dashboard</H1>

  <div class="flex flex-col">
    <button
      class={`py-2 
        ${activeOption === ActiveOptionEnum.BLOGTAG ?
        "bg-orange-svelte text-white" :
        ""
        }`
      }
      onclick={() => {
        activeOption = ActiveOptionEnum.BLOGTAG
      }}
    >
      Tag
    </button>

    <button
    class={`py-2 
      ${activeOption === ActiveOptionEnum.SETTINGS ?
      "bg-orange-svelte text-white" :
      ""
      }`
    }
      onclick={() => {
        activeOption = ActiveOptionEnum.SETTINGS
      }}
    >
      Settings
    </button>
  </div>
</nav>