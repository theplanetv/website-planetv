<script>
  import { FormStatusEnum } from "$lib/enum.js";
  import BaselineDelete from "../icon/BaselineDelete.svelte";
  import BaselineModeEdit from "../icon/BaselineModeEdit.svelte";

  let { columns, data, formStatus = $bindable(), inputValue = $bindable(), } = $props();
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
            <button type="button"
              onclick={() => {
                formStatus = FormStatusEnum.EDIT;
                inputValue = row;
              }}
            >
              <BaselineModeEdit />
            </button>

            <button type="button"
              onclick={() => {
                formStatus = FormStatusEnum.DELETE;
                inputValue = row;
              }}
            >
              <BaselineDelete />
            </button>
          </td>
        </tr>
      {/each}
    {:else}
      <tr>
        <td class="text-center" colspan={Object.keys(columns).length + 1}>No result</td>
      </tr>
    {/if}
  </tbody>
</table>
