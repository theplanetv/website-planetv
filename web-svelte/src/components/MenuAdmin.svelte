<script>
  import { ActiveOptionEnum } from "$lib/enum.js";

  let { activeOption } = $props();
</script>

<nav class="h-screen">
  <h1 class="p-10 text-2xl font-bold text-center">Admin dashboard</h1>

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