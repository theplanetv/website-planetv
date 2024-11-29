<script>
  import KeyIcon from '../../components/icon/KeyIcon.svelte';

  let { search, count, data } = $props();
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
</script>

<div>
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
</div>