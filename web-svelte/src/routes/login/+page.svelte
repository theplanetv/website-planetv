<script>
  import Button from "../../components/button/Button.svelte";
  import H1 from "../../components/header/H1.svelte";
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

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
  }
</style>


<HorizontalCenterLayout>
  <VerticalCenterLayout>
    <form class="border rounded-xl p-8 shadow-xl bg-base-100 login-form" onsubmit={submitLogin}>
      <H1>Login</H1>

      <div class="flex flex-col gap-y-2">
        <label class="input input-bordered flex items-center gap-2">
          <PersonIcon />
          <input class="grow" type="text" placeholder="Username" value={username} onchange={onChangeUsername} />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <button class="hover:cursor-pointer" onclick={togglePassword}>
            {#if !showPassword}
              <KeyIcon />
            {:else}
              <KeyOffIcon />
            {/if}
          </button>
          <input class="grow" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onchange={onChangePassword}  />
        </label>
      </div>

      <Button type="submit">Login</Button>
    </form>
  </VerticalCenterLayout>
</HorizontalCenterLayout>
