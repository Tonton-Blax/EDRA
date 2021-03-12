<script>
    import { fly } from 'svelte/transition';
    export let refresh = '';
  </script>
  
  {#key refresh}
    <main
      in:fly="{{ y: -1000, duration: 250, delay: 250 }}"
      out:fly="{{ y: 1000, duration: 250 }}" 
      >
      <slot/>
</main>
  {/key}