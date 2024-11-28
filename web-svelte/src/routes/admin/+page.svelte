<script>
  import { goto } from '$app/navigation';

  import { env } from '$env/dynamic/public';

  import { ActiveOptionEnum } from '$lib/enum.js';
  import DisplayAdmin from '../../components/display/DisplayAdmin.svelte';
  import MenuAdmin from '../../components/MenuAdmin.svelte';

  let activeOption = $state({ value: ActiveOptionEnum.BLOGTAG });
  let search = $state({ value: '' });
  let limit = $state(10);
  let page = $state(1);

  let count = $state(0);
  let data = $state([]);

  $effect(async () => {
    try {
      const authResponse = await fetch(`${env.PUBLIC_SVELTE_API_BASE_URL}/api/auth/verify`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!authResponse.ok) {
        const errorData = await authResponse.json();
        console.error('Authorization failed:', errorData.message);
        alert(`Authorization failed: ${errorData.message}`);
        goto('/login', { replaceState: true });
        return; // Exit if authorization fails
      }
    } catch (error) {
      console.error('An error occurred during verification:', error);
      alert('An error occurred. Please try again later.');
      return; // Exit on error
    }
  })

  $effect(async () => {
    search.value;

    if (activeOption.value === ActiveOptionEnum.SETTINGS)
      return;

    // Fetch count
    try {
      const countResponse = await fetch(`${env.PUBLIC_SVELTE_API_BASE_URL}/api/${activeOption.value}/count?search=${search.value}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!countResponse.ok) {
        const errorData = await countResponse.json();
        console.error('Failed to get count:', errorData.message);
        return;
      }

      const countResult = await countResponse.json();
      count = countResult.data;
      console.log('Count:', count);
    } catch (error) {
      console.error('An error occurred while fetching count:', error);
    }

    // Fetch data
    try {
      const dataResponse = await fetch(`${env.PUBLIC_SVELTE_API_BASE_URL}/api/${activeOption.value}?search=${search.value}&limit=${limit}&page=${page}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!dataResponse.ok) {
        const errorData = await dataResponse.json();
        console.error('Failed to get data:', errorData.message);
        return;
      }

      const dataResult = await dataResponse.json();
      data = dataResult.data;
      console.log('Data:', data);
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  })
</script>

<div class="flex">
  <MenuAdmin bind:activeOption={activeOption} />

  <h1>Admin</h1>

  <DisplayAdmin search={search} />
</div>