<script lang="ts">
  import MultiSelect from 'svelte-multiselect';

  import Footer from '../../components/footer/Footer.svelte';
  import PageLayout from '../../components/layout/PageLayout.svelte';
  import Menu from '../../components/menu/Menu.svelte';
  import MingCuteSearch2Line from '../../components/icons/MingCute-Search2Line.svelte';
	import MingCuteTag2Line from '../../components/icons/MingCute-Tag2Line.svelte';

  type BlogPost = {
    title: string
    slug: string
    created_at: string
    updated_at: string
  }

  let post_name: string = $state("")
  let data_tags: string[] = ['NixOS', 'Arch', 'Debian', 'Ubuntu', 'Linux Mint', 'Gentoo', 'Fedora', 'Red Hat OS', 'Bed Rock Linux', 'Guix', 'Slackware', 'CRUX', 'Void', 'Clear', 'KaOS', 'Manjaro', 'Puppy']
  let selected_tags: string[] = $state([])
  let data_posts: BlogPost[] = [
    { title: "Introduction to Svelte", slug: "introduction-to-svelte", created_at: "2023-10-01", updated_at: "2023-10-05" },
    { title: "Advanced TypeScript Techniques", slug: "introduction-to-svelte", created_at: "2023-09-15", updated_at: "2023-09-20" },
    { title: "Building a Blog with SvelteKit", slug: "introduction-to-svelte", created_at: "2023-08-10", updated_at: "2023-08-15" },
    { title: "Linux Distributions Overview", slug: "introduction-to-svelte", created_at: "2023-07-25", updated_at: "2023-07-30" },
    { title: "Getting Started with NixOS", slug: "introduction-to-svelte", created_at: "2023-06-12", updated_at: "2023-06-18" },
    { title: "Mastering CSS Grid Layouts", slug: "introduction-to-svelte", created_at: "2023-05-20", updated_at: "2023-05-25" },
    { title: "Understanding JavaScript Closures", slug: "introduction-to-svelte", created_at: "2023-04-18", updated_at: "2023-04-22" },
    { title: "Deep Dive into React Hooks", slug: "introduction-to-svelte", created_at: "2023-03-14", updated_at: "2023-03-19" },
    { title: "Exploring Deno: A Modern Runtime for JavaScript", slug: "introduction-to-svelte", created_at: "2023-02-10", updated_at: "2023-02-15" },
    { title: "A Guide to GraphQL Basics", slug: "introduction-to-svelte", created_at: "2023-01-05", updated_at: "2023-01-10" },
  ];
</script>

<PageLayout>
  <Menu />

  <main class="flex flex-col gap-y-5">
    <h1 class="text-center text-3xl font-bold">My blog posts!</h1>

    <div class="input w-full">
      <MingCuteSearch2Line />
      <input type="text" placeholder="Post name" bind:value={post_name} />
    </div>

    <MultiSelect inputClass="input" bind:value={selected_tags} options={data_tags} placeholder="Tags">
      <MingCuteTag2Line slot="expand-icon" />
    </MultiSelect>

    <ul class="flex flex-col gap-y-5">
      {#each data_posts as post (post.title)}
        <a href={`/posts/${encodeURIComponent(post.slug)}`} class="card shadow-sm flex flex-col gap-y-2 hover:cursor-pointer hover:shadow-lg">
          <li class="card-body">
            <h2 class="card-title">{post.title}</h2>
            <div class="grid grid-cols-2">
              <p>Created at: {post.created_at}</p>
              <p class="text-right">Updated at: {post.updated_at}</p>
            </div>
          </li>
        </a>
      {/each}
    </ul>
  </main>

  <Footer />
</PageLayout>
