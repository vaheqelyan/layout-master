<style>
	/* divide color #e8eaed */
	/*.menu {
		z-index: 10000000;
		position: absolute;
		background: white;
		border: 1px solid #bababa;
		display: inline-block;
	}
	.item {
		cursor: pointer;
		padding: 2% 40px;
    font-size: small;
	}
	.item:hover {
		background: #e8eaed;
	}*/
	.menu {
  position:fixed;
  background-color:white;
  padding:4pt;
  font-size:10pt;
  z-index:1000;
  padding:0.5em 0 0.5em 0;
  display:block;
  border :1px solid #bababa;
}

.item {
	cursor: pointer;
  display:block;
  text-decoration:none;
  padding: 0.5em 2em 0.5em 0.75em;
  max-width:18em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item:hover {
  background-color:#e8eaed;
}

.item::before {
  content:'';
  float:left;
  margin-right:0.75em;
  width:0.5em;
  height:1em;
  display:inline-block;
}
.icon::before {
  content: attr(data-icon);
}
.divide {
  display: block;
  height: 1px;
  border: 0; 
  border-top: 1px solid #e8eaed;
  margin: 5px 0;
  padding: 0;
}
.highlight,.highlight::before {
  color: #1a73e8;
}
</style>


{#if visible}
<div class=menu style="left: {left}px; top: {top}px" on:mousedown={mousedown}>
	{#each context as contextValue}
    {#if contextValue.kind === CONTEXT_MENU_KIND.DIVIDE}
      <div class=divide></div>
    {:else}
		  <div class=item class:highlight={contextValue.highlight} class:icon={contextValue.icon} data-icon={contextValue.icon} on:click={click.bind(null, contextValue)}>{contextValue.text}</div>
    {/if}
	{/each}
</div>
{/if}

<script>
	export let visible = false;
	export let left=-100;
	export let top=-100;
	export let context=[]
	import { createEventDispatcher } from 'svelte';
  import {CONTEXT_MENU_KIND} from './kind.js'

	const dispatch = createEventDispatcher();

  function click(contextValue){
		dispatch('select',contextValue)
	}

	const mousedown = e => {
		e.stopPropagation()
	}


  const contextmenuGrid = e => {
    e.preventDefault();
    const origin = {
      left: e.pageX,
      top: e.pageY
    };
    setPosition(origin);
    return false;
  }
</script>