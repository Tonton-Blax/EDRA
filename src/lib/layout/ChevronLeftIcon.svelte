<script>
  export let size = "100%";
  export let show=true;
  export let strokeWidth = 2;
  let customClass = "";
  export let color = "#ffffff";
  export { customClass as class };

  if (size !== "100%") {
    size = size.slice(-1) === 'x' 
          ? size.slice(0, size.length -1) + 'em'
          : parseInt(size) + 'px';
  }
</script>
{#if show}
<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24"  stroke="{color}" stroke-width="{strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left {customClass}"><polyline points="15 18 9 12 15 6"></polyline></svg>
{/if}
