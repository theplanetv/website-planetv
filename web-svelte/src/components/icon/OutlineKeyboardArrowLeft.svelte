<script>
  let { width, height } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={width === undefined ? 25 : width}
  height={height === undefined ? 25 : height}
  viewBox="0 0 24 24"
>
  <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/>
</svg>