<script>
	let { width, height } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={width === undefined ? 25 : width}
	height={height === undefined ? 25 : height}
	viewBox="0 0 24 24"
>
	<path fill="currentColor" d="m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z" />
</svg>
