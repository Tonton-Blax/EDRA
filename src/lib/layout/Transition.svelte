<script>
    import { fly } from 'svelte/transition';
    import { navigating, page } from '$app/stores';

  </script>
  
  {#key $navigating && !$page.params.slug}
    <main
      in:fly={{  x:-5, duration: 200, delay: 200 }}
      out:fly={{ x: 5, duration: 200             }}
    >
      <slot/>
    </main>
  {/key}