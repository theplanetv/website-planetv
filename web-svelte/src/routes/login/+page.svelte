<script>
  import Button from "../../components/button/Button.svelte";
  import H1 from "../../components/header/H1.svelte";
	import ArrowLeftAltIcon from "../../components/icon/ArrowLeftAltIcon.svelte";
	import KeyIcon from "../../components/icon/KeyIcon.svelte";
	import KeyOffIcon from "../../components/icon/KeyOffIcon.svelte";
	import PersonIcon from "../../components/icon/PersonIcon.svelte";
  import HorizontalCenterLayout from "../../components/layout/HorizontalCenterLayout.svelte";
  import VerticalCenterLayout from "../../components/layout/VerticalCenterLayout.svelte";

  let username = $state('')
  let password = $state('')
  let showPassword = $state(false)

  /**
   * 
   * @param event
   */
  function onChangeUsername(event) {
    username = event.target.value;
  }

  /**
   * 
   * @param event
   */
  function onChangePassword(event) {
    password = event.target.value;
  }

  /**
   * 
   * @returns {string}
   */
  function togglePassword() {
    showPassword = !showPassword
  }

  function submitLogin(event) {
    event.preventDefault();
  }
</script>


<HorizontalCenterLayout>
  <VerticalCenterLayout>
    <form class="border rounded-xl p-8 shadow-xl bg-base-100 flex flex-col items-center gap-y-7" onsubmit={submitLogin}>
      <H1>Login</H1>

      <div class="flex flex-col gap-y-2">
        <label class="border border-none rounded-xl py-2 px-1 flex items-center gap-2 focus-within:ring-1 focus-within:ring-orange-svelte">
          <PersonIcon />
          <input class="outline-none grow" type="text" placeholder="Username" value={username} onchange={onChangeUsername} />
        </label>

        <label class="border border-none rounded-xl py-2 px-1 flex items-center gap-2 focus-within:ring-1 focus-within:ring-orange-svelte">
          <button class="hover:cursor-pointer" onclick={togglePassword}>
            {#if !showPassword}
              <KeyIcon />
            {:else}
              <KeyOffIcon />
            {/if}
          </button>
          <input class="outline-none grow" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onchange={onChangePassword}  />
        </label>
      </div>

      <Button type="submit">Login</Button>

      <a href="/" class="flex gap-x-1 transition-colors duration-200 hover:text-orange-svelte"><ArrowLeftAltIcon />Back to Home</a>
    </form>
  </VerticalCenterLayout>
</HorizontalCenterLayout>
