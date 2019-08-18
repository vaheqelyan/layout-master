<svelte:component this={HighlightGrid} {...$$props} />

<script>
	import {onMount} from 'svelte'
	
	let HighlightGrid;

	onMount( async ()=>{
		const module = await import('./HighlightGrid.svelte')
		HighlightGrid = module.default;		
	})
</script>