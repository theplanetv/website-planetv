<script>
  import HorizontalCenterLayout from '../layout/HorizontalCenterLayout.svelte';
  import Pagination from '../Pagination.svelte';
  import TableAdmin from '../table/TableAdmin.svelte';
  import RoundSearch from '../icon/RoundSearch.svelte';

  import { ActiveOptionEnum, FormStatusEnum } from '$lib/enum.js';
  import { BlogTagColumn } from '$lib/types.js';
  import OutlineAddCircle from '../icon/OutlineAddCircle.svelte';


  let { activeOption, formStatus = $bindable(), inputValue = $bindable(), search, page = $bindable(), maxPage, count, data } = $props();
  let searchInput = $state('');

  /**
   * Update the search prop when the Enter key is pressed.
   * @param {Event} event
   */
   function onKeyDown(event) {
    if (event.key === 'Enter') {
      search.value = event.target.value;
      searchInput = search.value; // Keep the state in sync
    }
  }

  /**
   * Reset the input value to the current search prop on blur.
   * @param {Event} event
   */
  function onBlur(event) {
    event.target.value = search.value;
  }

  /**
   * @returns {any}
   */
  function getColumns() {
    if (activeOption === ActiveOptionEnum.BLOGTAG) return BlogTagColumn;
  }
</script>

<HorizontalCenterLayout>
  <div class="py-10 flex flex-col gap-y-5 items-center">
    <div class="w-full flex items-center justify-between">
      <label
        class="border border-none ring-1 ring-slate-200 rounded-xl py-2 px-1 flex items-center gap-2 focus-within:ring-1 focus-within:ring-orange-svelte"
      >
        <RoundSearch />
        <input
          class="outline-none grow"
          type='text'
          placeholder="Search"
          value={search.value}
          onkeydown={onKeyDown}
          onblur={onBlur}
        />
      </label>

      <button onclick={() => formStatus = FormStatusEnum.ADD}><OutlineAddCircle /></button>
    </div>

    <TableAdmin
      columns={getColumns()} data={data}
      bind:formStatus={formStatus} bind:inputValue={inputValue}
    />

    <Pagination bind:page={page} maxPage={maxPage} />
  </div>
</HorizontalCenterLayout>