<script>
    import { fly } from 'svelte/transition';
    import { navigating, page } from '$app/stores';

  </script>
  
  {#key $navigating && !$page.params.slug}
    <main
      in:fly={{  x:-5, duration: 500, delay: 500 }}
      out:fly={{ x: 5, duration: 500             }}
    >
      <slot/>
    </main>
  {/key}