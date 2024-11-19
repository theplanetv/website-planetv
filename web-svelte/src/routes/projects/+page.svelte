<script>
  import Footer from '../../components/Footer.svelte';
  import Menu from '../../components/Menu.svelte';
  import H1 from '../../components/header/H1.svelte';
  import ContentLayout from '../../components/layout/ContentLayout.svelte';
  import HorizontalCenterLayout from '../../components/layout/HorizontalCenterLayout.svelte';
</script>

<HorizontalCenterLayout>
  <Menu />

  <ContentLayout>
    <H1>Projects</H1>

    <h2>Open source Projects</h2>
    <ul>
      <li>
        <a href="https://github.com/BambooEngine/ibus-bamboo">ibus-bamboo</a> :
        <span>Ibus input method for Vietnamese</span>
      </li>
      <li>
        <a href="https://github.com/goatastronaut0212/PrismLauncher">PrismLauncher</a> :
        <span>Minecraft PrismLaucnher fork is free to play Minecraft version maintained by me</span>
      </li>
    </ul>
  </ContentLayout>

  <Footer />
</HorizontalCenterLayout>
