<script>
  import { page } from '$app/stores';

  let { active, href, children } = $props();
</script>

<a
  class={`
    border rounded-full border-white px-4 py-2  flex gap-x-1
    ${
      $page.url.pathname === href || active === true
        ? 'bg-orange-svelte text-white hover:border-orange-svelte hover:bg-white hover:text-orange-svelte'
        : ''
    }
  `}
  {href}
>
  {@render children()}
</a>
