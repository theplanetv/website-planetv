<script>
  import { ActiveOptionEnum } from "$lib/enum.js";

  let { activeOption } = $props();
</script>

<nav>
  <h1>Admin dashboard</h1>
  <div>
    <button onclick={() => {
      activeOption = ActiveOptionEnum.BLOGTAG
    }}>Tag</button>
    <button onclick={() => {
      activeOption = ActiveOptionEnum.SETTINGS
    }}>Settings</button>
  </div>
</nav>