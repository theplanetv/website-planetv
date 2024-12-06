<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import { CheckLogin } from '$lib/api/auth.js';
  import { GetCount, GetData } from '$lib/api/blogtag.js';

  import { ActiveOptionEnum, FormStatusEnum } from '$lib/enum.js';
  import DisplayAdmin from '../../components/display/DisplayAdmin.svelte';
  import MenuAdmin from '../../components/MenuAdmin.svelte';
  import FormAdmin from '../../components/form/FormAdmin.svelte';

  // UI state (change based on user interaction)
  let isLoading = $state(true);
  let activeOption = $state(ActiveOptionEnum.BLOGTAG);
  let formStatus = $state(FormStatusEnum.NONE);
  let inputValue = $state({});
  let search = $state({ value: '' });
  let limit = $state(10);
  let page = $state(1);

  // Data state (change automatically)
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
    bind:formStatus={formStatus}
    bind:inputValue={inputValue}
    search={search}
    bind:page={page}
    maxPage={count === 0 ? 1 : Math.ceil(count / limit)}
    count={count}
    data={data}
  />

  <FormAdmin
    activeOption={activeOption}
    bind:formStatus={formStatus}
    inputValue={inputValue}
  />
</div>
{/if}