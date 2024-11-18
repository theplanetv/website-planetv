<script>
  import Footer from "../components/Footer.svelte";
  import Menu from "../components/Menu.svelte";
	import H1 from "../components/header/H1.svelte";
	import ContentLayout from "../components/layout/ContentLayout.svelte";
  import HorizontalCenterLayout from "../components/layout/HorizontalCenterLayout.svelte";
</script>


<HorizontalCenterLayout>
  <Menu />

  <ContentLayout>
    <H1 class="h1">PlanetV</H1>

    <p>This is my own website to document about my journey</p>
  </ContentLayout>

  <Footer />
</HorizontalCenterLayout>
