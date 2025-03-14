<script>
  import Footer from '../components/footer/Footer.svelte';
  import PageLayout from '../components/layout/PageLayout.svelte';
  import Menu from '../components/menu/Menu.svelte';
</script>

<PageLayout>
  <Menu />

  <main class="flex flex-col gap-y-5">
    <h1 class="text-center text-3xl font-bold">Welcome to Planet V!</h1>
    <p class="text-center">My own website built by me and for me :P</p>
    <a href="#faq"><h2 class="text-xl font-bold">Frequently Ask Questions</h2></a>
    <p>Todo</p>
  </main>

  <Footer />
</PageLayout>
