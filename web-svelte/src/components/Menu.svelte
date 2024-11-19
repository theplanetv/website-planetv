<script>
	import ComputerIcon from './icon/ComputerIcon.svelte';
	import HomeIcon from './icon/HomeIcon.svelte';
	import MenuLink from './link/MenuLink.svelte';
</script>

<nav class="mx-auto rounded-full py-2 px-2 shadow-md w-fit flex gap-x-1">
	<MenuLink href="/">
		<HomeIcon /><span>Home</span>
	</MenuLink>
	<MenuLink href="/projects">
		<ComputerIcon /><span>Projects</span>
	</MenuLink>
	<MenuLink href="/login" active={true}>
		<span>Login</span>
	</MenuLink>
</nav>
