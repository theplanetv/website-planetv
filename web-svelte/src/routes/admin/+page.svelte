<script>
  import { goto } from '$app/navigation';

  let search = $state('');
  let limit = $state(10);
  let page = $state(1);

  let count = $state(0);
  let data = $state([]);

  $effect(async () => {
    try {
      const authResponse = await fetch('http://localhost:14003/api/auth/verify', {
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

    try {
      const countResponse = await fetch(`http://localhost:14003/api/blogtag/count?search=${search}`, {
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

    try {
      const dataResponse = await fetch(`http://localhost:14003/api/blogtag?search=${search}&limit=${limit}&page=${page}`, {
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
  });
</script>

<div>
  <h1>Admin</h1>
</div>