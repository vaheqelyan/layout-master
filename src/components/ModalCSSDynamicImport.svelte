<svelte:component this={ModalCSSOutput} />

<script>
	import {onMount} from 'svelte'
	let ModalCSSOutput;
	onMount( async ()=>{
		const module = await import("./ModalCSSOutput.svelte")
		ModalCSSOutput = module.default;
	})
</script>