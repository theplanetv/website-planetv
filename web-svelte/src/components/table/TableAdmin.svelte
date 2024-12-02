<script>
  let { columns, data } = $props();
</script>

<table>
  <thead>
    <tr>
      {#each Object.keys(columns) as key}
        <th>{columns[key]}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#if data.length > 0}
      {#each data as row}
        <tr>
          {#each Object.keys(columns) as key}
            <td>{row[key]}</td>
          {/each}
        </tr>
      {/each}
    {:else}
      <tr>
        <td class="text-center" colspan={Object.keys(columns).length}>No result</td>
      </tr>
    {/if}
  </tbody>
</table>
