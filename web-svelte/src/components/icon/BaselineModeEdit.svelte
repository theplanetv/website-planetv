<script>
  let { width, height } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg" 
  width={width === undefined ? 25 : width}
  height={height === undefined ? 25 : height}
  viewBox="0 0 24 24"
>
  <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/>
</svg>