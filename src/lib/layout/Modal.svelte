<script>
  import { onMount } from 'svelte'
  import * as transitions from 'svelte/transition'

export function chooseAnimation(animation) {
  return typeof animation === 'function' ? animation : transitions[animation]
}

export function isEscKey(e) {
  return e.keyCode && e.keyCode === 27
}

  export let active = true
  export let animation = 'scale'
  export let animProps = { start: 1.2 }
  export let size = ''
  export let showClose = true
  export let onBody = true

  let modal

  $: _animation = chooseAnimation(animation)
  $: {
    if (modal && active && onBody) {
      // modal.parentNode?.removeChild(modal)
      document.body.appendChild(modal)
    }
  }

  onMount(() => {
    
  })

  function close() {
    active = false
  }

  function keydown(e) {
    if (active && isEscKey(e)) {
      close()
    }
  }
</script>

<svelte:window on:keydown={keydown}></svelte:window>

<div class="modal {size}" class:is-active={active} bind:this={modal}>
  <div class="modal-background" on:click={close}></div>
  <div class="modal-content" transition:_animation|local={animProps}> <!-- transition:_animation|local -->
    <slot />
  </div>
  {#if showClose}
    <button class="modal-close is-large" aria-label="close" on:click={close}></button>
  {/if}
</div>
