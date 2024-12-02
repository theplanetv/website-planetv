<script>
    import BaselineDelete from "../icon/BaselineDelete.svelte";
import BaselineModeEdit from "../icon/BaselineModeEdit.svelte";

  let { columns, data } = $props();
</script>

<table>
  <thead>
    <tr>
      {#each Object.keys(columns) as key}
        <th class="bg-slate-200 p-2">{columns[key]}</th>
      {/each}
      <th class="bg-slate-200 p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {#if data.length > 0}
      {#each data as row}
        <tr>
          {#each Object.keys(columns) as key}
            <td>{row[key]}</td>
          {/each}
          <td>
            <button><BaselineModeEdit /></button>
            <button><BaselineDelete /></button>
          </td>
        </tr>
      {/each}
    {:else}
      <tr>
        <td colspan={Object.keys(columns).length + 1} style="text-align: center;">No result</td>
      </tr>
    {/if}
  </tbody>
</table>
