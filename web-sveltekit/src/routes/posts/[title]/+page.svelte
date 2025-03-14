<script>
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  
  import Footer from '../../../components/footer/Footer.svelte';
  import PageLayout from '../../../components/layout/PageLayout.svelte';
  import Menu from '../../../components/menu/Menu.svelte';

  const source = `
# This is a header

This is a paragraph with **bold** and <em>mixed HTML</em>.

* List item with \`inline code\`
* And a [link](https://svelte.dev)
  * With nested items
  * Supporting full markdown

| Type       | Content                                 |
| ---------- | --------------------------------------- |
| Nested     | <div>**bold** and _italic_</div>        |
| Mixed List | <ul><li>Item 1</li><li>Item 2</li></ul> |
| Code       | <code>\`inline code\`</code>              |
`
</script>

<PageLayout>
  <Menu />

  <article class="prose">
    <SvelteMarkdown {source} />
  </article>

  <Footer />
</PageLayout>