<script>
  import { ActiveOptionEnum, FormStatusEnum, ApiMessageEnum } from '$lib/enum.js';
  import Button from '../button/Button.svelte';
  import HorizontalCenterLayout from '../layout/HorizontalCenterLayout.svelte';
  import { Create, Update, Remove } from '$lib/api/blogtag.js';

  let { refresh = $bindable(), activeOption, formStatus = $bindable(), inputValue } = $props();
  let formInputValue = $state({ ...inputValue });

  /**
   * 
   * @param event
   */
  const handleChangeName = (event) => {
    formInputValue.name = event.target.value;
  };

  /**
   *
   * @param {Event} event
   * @returns {void}
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formStatus === FormStatusEnum.ADD) {
      const result = await Create(formInputValue);
      if (result.message === ApiMessageEnum.CREATE_DATA_SUCCESS) {
        alert(ApiMessageEnum.CREATE_DATA_SUCCESS);
        formStatus = FormStatusEnum.NONE;
        refresh = true;
        return;
      }

      alert(ApiMessageEnum.CREATE_DATA_FAILED);
      return;
    }

    if (formStatus === FormStatusEnum.EDIT) {
      const result = await Update(formInputValue);
      if (result.message === ApiMessageEnum.UPDATE_DATA_SUCCESS) {
        alert(ApiMessageEnum.UPDATE_DATA_SUCCESS);
        formStatus = FormStatusEnum.NONE;
        refresh = true;
        return;
      }

      alert(ApiMessageEnum.UPDATE_DATA_FAILED);
      return;
    }

    if (formStatus === FormStatusEnum.DELETE) {
      const result = await Remove(formInputValue);
      if (result.message === ApiMessageEnum.REMOVE_DATA_SUCCESS) {
        alert(ApiMessageEnum.REMOVE_DATA_SUCCESS);
        formStatus = FormStatusEnum.NONE;
        refresh = true;
        return;
      }

      alert(ApiMessageEnum.REMOVE_DATA_FAILED);
      return;
    }
  };

  /**
   * @returns {void}
   */
  const handleCancel = () => {
    formStatus = FormStatusEnum.NONE;
    formInputValue = { ...inputValue };
  };

  $effect(() => {
    formStatus;

    if (formStatus === FormStatusEnum.ADD && activeOption === ActiveOptionEnum.BLOGTAG) {
      formInputValue = {
        id: "",
        name: "",
      };
      return;
    }

    formInputValue = inputValue;
  });
</script>

{#if formStatus !== FormStatusEnum.NONE}
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <button
      class="absolute inset-0 bg-black bg-opacity-50 z-40 cursor-default"
      type="button"
      aria-hidden="true"
      onclick={() => (formStatus = FormStatusEnum.NONE)}
    ></button>

    <div class="relative bg-white shadow-lg rounded-lg p-6 z-50 max-w-md w-full">
      <HorizontalCenterLayout>
        <form class="flex flex-col gap-y-4" onsubmit={handleSubmit}>
          <!-- Blogtag -->
          {#if activeOption === ActiveOptionEnum.BLOGTAG}
            {#if formStatus === FormStatusEnum.ADD}
              <div>
                <label
                  class="border border-none ring-1 ring-slate-200 rounded-xl py-2 px-1 flex items-center gap-2 focus-within:ring-1 focus-within:ring-orange-svelte"
                >
                  Name:
                  <input
                    class="outline-none grow"
                    type="text"
                    value={formInputValue.name}
                    onchange={handleChangeName}
                  />
                </label>
              </div>
            {/if}

            {#if formStatus === FormStatusEnum.EDIT}
              <div>
                <label
                  class="border border-none ring-1 ring-slate-200 rounded-xl py-2 px-1 flex items-center gap-2 focus-within:ring-1 focus-within:ring-orange-svelte"
                >
                  Name:
                  <input
                    class="outline-none grow"
                    type="text"
                    value={formInputValue.name}
                    onchange={handleChangeName}
                  />
                </label>
              </div>
            {/if}

            {#if formStatus === FormStatusEnum.DELETE}
              <div class="flex flex-col gap-y-2">
                <label
                  class="border border-none ring-1 ring-slate-200 rounded-xl py-2 px-1 flex items-center gap-2 focus-within:ring-1 focus-within:ring-orange-svelte"
                >
                  Id:
                  <input
                    class="outline-none grow"
                    type="text"
                    readonly={true}
                    value={formInputValue.id}
                  />
                </label>
                <label
                  class="border border-none ring-1 ring-slate-200 rounded-xl py-2 px-1 flex items-center gap-2 focus-within:ring-1 focus-within:ring-orange-svelte"
                >
                  Name:
                  <input
                    class="outline-none grow"
                    type="text"
                    readonly={true}
                    value={formInputValue.name}
                  />
                </label>
              </div>
            {/if}
          {/if}

          <div class="flex flex-row items-center justify-between">
            <Button type="submit">Submit</Button>
            <Button
              type="button"
              onclick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </HorizontalCenterLayout>
    </div>
  </div>
{/if}