<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import { CheckLogin } from '$lib/api/auth.js';
  import { GetCount, GetData } from '$lib/api/blogtag.js';

  import { ActiveOptionEnum } from '$lib/enum.js';
  import DisplayAdmin from '../../components/display/DisplayAdmin.svelte';
  import MenuAdmin from '../../components/MenuAdmin.svelte';

  let isLoading = $state(true);
  let activeOption = $state(ActiveOptionEnum.BLOGTAG);
  let search = $state({ value: '' });
  let limit = $state(10);
  let page = $state(1);

  let count = $state(0);
  let data = $state([]);

  onMount(async () => {
    const authResult = await CheckLogin();

    if (authResult === false) {
      goto('/login', { replaceState: true });
      return;
    }

    isLoading = false;

    // Fetch count
    const countResult = await GetCount(activeOption, search.value);
    count = countResult;

    // Fetch data
    const dataResult = await GetData(activeOption, search.value, limit, page);
    data = dataResult;
  })

  $effect(async () => {
    activeOption;
    page;

    if (activeOption === ActiveOptionEnum.SETTINGS)
      return;

    // Fetch count
    const countResult = await GetCount(activeOption, search.value);
    count = countResult;

    // Fetch data
    const dataResult = await GetData(activeOption, search.value, limit, page);
    data = dataResult;
  });
</script>

{#if !isLoading}
<div class="flex">
  <MenuAdmin bind:activeOption={activeOption} />

  <DisplayAdmin
    activeOption={activeOption}
    search={search}
    bind:page={page}
    maxPage={count === 0 ? 1 : Math.ceil(count / limit)}
    count={count}
    data={data}
  />
</div>
{/if}