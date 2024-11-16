<script>
  import Footer from "../../components/Footer.svelte";
  import Menu from "../../components/Menu.svelte";
	import PageLayout from "../../components/PageLayout.svelte";
  import "../../styles/header.css"
</script>

<Menu />

<PageLayout>
  <h1 class="h1">Projects</h1>

  <h2>Open source Projects</h2>
  <ul>
    <li><a href="https://github.com/BambooEngine/ibus-bamboo">ibus-bamboo</a> : <span>Ibus input method for Vietnamese</span></li>
    <li><a href="https://github.com/goatastronaut0212/PrismLauncher">PrismLauncher</a> : <span>Minecraft PrismLaucnher fork is free to play Minecraft version maintained by me</span></li>
  </ul>

  <Footer />
</PageLayout>
