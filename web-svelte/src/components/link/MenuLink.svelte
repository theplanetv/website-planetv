<script>
  import { page } from '$app/stores';  

  let { href, children } = $props();
</script>


<a
  class={`
    px-4 py-2 rounded-full flex gap-x-1
    ${$page.url.pathname === href ? "bg-sky-500 text-white" : ""}
  `}
  href={href}
>
  {@render children()}
</a>