<script>
  import { ActiveOptionEnum, FormStatusEnum } from "$lib/enum.js";
  import Button from "../button/Button.svelte";
  import HorizontalCenterLayout from "../layout/HorizontalCenterLayout.svelte";

  let { activeOption, formStatus = $bindable(), inputValue } = $props();
  let currentInputValue = $state(inputValue || {});

  $effect(() => {
    activeOption;
    formStatus;

    console.log('activeOption:', activeOption);
    console.log('formStatus:', formStatus);
  });
</script>

{#if formStatus !== FormStatusEnum.NONE}
<div class="fixed inset-0 flex items-center justify-center z-50">
  <button
    class="absolute inset-0 bg-black bg-opacity-50 z-40 cursor-default"
    type="button"
    aria-hidden="true"
    onclick={() => formStatus = FormStatusEnum.NONE}
  ></button>


  <div 
    class="relative bg-white shadow-lg rounded-lg p-6 z-50 max-w-md w-full"
  >
    <HorizontalCenterLayout>
      <form class="flex flex-col gap-y-4">
        <!-- Blogtag -->
        {#if activeOption === ActiveOptionEnum.BLOGTAG}
          {#if formStatus === FormStatusEnum.ADD}
          <div>
            <label>Name: <input type="text" value={currentInputValue.name} /></label>
          </div>
          {/if}


          {#if formStatus === FormStatusEnum.EDIT}
          <div>
            <label>Name: <input type="text" value={currentInputValue.name} /></label>
          </div>
          {/if}


          {#if formStatus === FormStatusEnum.DELETE}
          <div class="flex flex-col">
            <label>Id: <input type="text" value={currentInputValue.id} readonly={true} /></label>
            <label>Name: <input type="text" value={currentInputValue.name} readonly={true} /></label>
          </div>
          {/if}
        {/if}


        <div class="flex flex-row items-center justify-between">
          <Button type="submit">Submit</Button>
          <Button type="button" onclick={() => {
              currentInputValue = {}
              formStatus = FormStatusEnum.NONE
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </HorizontalCenterLayout>
  </div>
</div>
{/if}