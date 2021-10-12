<script>
    import { fly } from 'svelte/transition';
    import { quadInOut } from 'svelte/easing';
    export let refresh = '';
  </script>
  
  {#key refresh}
    <main transition:fly|local="{{ y: 1000, duration: 350, easing: quadInOut }}" >
      <slot/>
    </main>
  {/key}