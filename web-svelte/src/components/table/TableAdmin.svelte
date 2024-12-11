<script>
  import { FormStatusEnum } from "$lib/enum.js";
  import BaselineDelete from "../icon/BaselineDelete.svelte";
  import BaselineModeEdit from "../icon/BaselineModeEdit.svelte";

  let { columns, data, formStatus = $bindable(), inputValue = $bindable(), } = $props();
</script>

<div class="rounded-lg overflow-hidden border border-slate-200">
  <table class="w-full border-collapse">
    <thead>
      <tr class="divide-x divide-white">
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
              <td class="p-2 border border-slate-200">{row[key]}</td>
            {/each}
            <td class="p-2 border border-slate-200">
              <button type="button"
                onclick={() => {
                  formStatus = FormStatusEnum.EDIT;
                  inputValue = { ...row };
                }}
              >
                <BaselineModeEdit />
              </button>

              <button type="button"
                onclick={() => {
                  formStatus = FormStatusEnum.DELETE;
                  inputValue = { ...row };
                }}
              >
                <BaselineDelete />
              </button>
            </td>
          </tr>
        {/each}
      {:else}
        <tr>
          <td class="text-center p-2 border border-slate-200" colspan={Object.keys(columns).length + 1}>No result</td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>