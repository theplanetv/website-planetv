<script>
  import { goto } from '$app/navigation';

  $effect(async () => {
    try {
      const response = await fetch('http://localhost:14003/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Authorize failed:', errorData.message);
        alert(`Authorize failed: ${errorData.message}`);
        goto('/login', { replaceState: true });
      }
    } catch (error) {
      console.error('An error occurred during verify:', error);
      alert('An error occurred. Please try again later.');
    }
  })
</script>

<div>
  <h1>Admin</h1>
</div>