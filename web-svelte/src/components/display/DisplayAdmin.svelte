<script>
  import KeyIcon from '../../components/icon/KeyIcon.svelte';
  import HorizontalCenterLayout from '../layout/HorizontalCenterLayout.svelte';
  import Pagination from '../Pagination.svelte';
  import TableAdmin from '../table/TableAdmin.svelte';

  import { ActiveOptionEnum } from '$lib/enum.js';
  import { BlogTag } from '$lib/types.js';

  let { activeOption, search, page = $bindable(), maxPage, count, data } = $props();
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
    if (activeOption === ActiveOptionEnum.BLOGTAG) return BlogTag;
  }
</script>

<HorizontalCenterLayout>
  <label>
    <KeyIcon />
    <input
      class="outline-none grow"
      type='text'
      placeholder="Search"
      value={search.value}
      onkeydown={onKeyDown}
      onblur={onBlur}
    />
  </label>

  <TableAdmin columns={getColumns()} data={data} />

  <Pagination bind:page={page} maxPage={maxPage} />
</HorizontalCenterLayout>