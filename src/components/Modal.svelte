<style>
.modal-background {
  position: fixed; /* Stay in place */
  z-index: 1000001; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background: rgba(0,0,0,0.3);
  cursor: pointer;
}
.modal {
  cursor: default;
  background-color: white;
  border-radius: 0.2em;
  margin: auto;
  border :1px solid #bababa;
	width: calc(100vw - 4em);
	max-width: 32em;
	margin: 5em auto;
	/*max-height: calc(100vh - 4em);*/
  z-index: 1000002;
}

</style>

<div class='modal-background' on:click={close}>
	<div class=modal on:click={stopPropagation}>
	<slot></slot>
</div>

</div>



<svelte:body on:contextmenu={stopPropagation} on:mousedown={stopPropagation} />


<script>
		import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const close = () => dispatch('close')


	const stopPropagation = e => e.stopPropagation()
</script>