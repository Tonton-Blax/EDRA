<script>
    import { fly } from 'svelte/transition';
    import { quadInOut } from 'svelte/easing';
    export let refresh = '';
  </script>
  
  {#key refresh}
    <main
      in:fly="{{ y: -1000, duration: 350, delay: 250,  easing: quadInOut }}"
      out:fly="{{ y: 1000, duration: 350, easing: quadInOut }}" 
      >
      <slot/>
</main>
  {/key}