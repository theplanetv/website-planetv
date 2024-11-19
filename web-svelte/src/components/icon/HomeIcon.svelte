<script>
  let { width, height } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={width === undefined ? 25 : width}
  height={height === undefined ? 25 : height}
  viewBox="0 0 24 24"
>
  <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
</svg>
