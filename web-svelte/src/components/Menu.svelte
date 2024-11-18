<script>
	import ComputerIcon from "./icon/ComputerIcon.svelte";
  import HomeIcon from "./icon/HomeIcon.svelte";
  import MenuLink from "./link/MenuLink.svelte";
</script>


<nav class="mx-auto rounded-lg py-3 px-5 shadow-md w-fit flex gap-x-2">
  <MenuLink href="/">
    <HomeIcon /><span>Home</span>
  </MenuLink>
  <MenuLink href="/projects">
    <ComputerIcon /><span>Projects</span>
  </MenuLink>
</nav>