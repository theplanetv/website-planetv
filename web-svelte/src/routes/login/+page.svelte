<script>
  import HorizontalCenterLayout from "../../components/layout/HorizontalCenterLayout.svelte";

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

  .input-container {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }
</style>

<HorizontalCenterLayout>
  <div class="card bg-base-100 w-96 shadow-xl">
    <form class="login-form" onsubmit={submitLogin}>
      <h1 class="h1">Login</h1>

      <div class="input-container">
        <input type="text" placeholder="Username" value={username} onchange={onChangeUsername} />
        <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onchange={onChangePassword} />
      </div>

      <div>
        <input type="checkbox" onclick={togglePassword} />
        <span>Show password</span>
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</HorizontalCenterLayout>
