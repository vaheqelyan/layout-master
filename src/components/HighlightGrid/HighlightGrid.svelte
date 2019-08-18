<style>
	.highlight {
	border: 1px solid deeppink;
  position: absolute;
}
</style>

{#each new Array(columns*rowsCount) as block,i}
	<div class=highlight style="
		top: { (Math.floor(i/columns) * rowHeight) + gap}px; 
		left: {((i%columns) * xPerPx) + gap}px;
		width: {((1 * xPerPx) - gap * 2) - (0*xPerPx)}px;
		height: {(1 * rowHeight) - gap * 2}px"></div>
{/each}

<script>
	export let rowsCount=0;
	export let xPerPx=0;
	export let rowHeight;
	export let gap;
	export let columns;
</script>