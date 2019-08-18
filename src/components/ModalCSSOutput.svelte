<style>
		.header {
		display: flex;
		padding: 10px;
		align-items: center;
	}
	.tabs {
		display: flex;
	}
		.tab {
		text-align: center;
		padding: 6px;
		flex: 1;
		cursor: pointer;
		font-size: smaller;
	}
	.tab:hover {
		background: #eaeaea;
	}

	.active {
		border-radius: 0px;
		border-bottom: 4px solid #1a73e8;
	}
	.tab-content {
		padding-bottom: 10px;
	}

		button {
		margin-left: auto;
		margin-right: 20px;
	}
	.group {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 15px;
	}

</style>

	<div class=header>
		<div class=group>
			<h1>CSS output</h1>
			<span>{$columns} column and {rows} row</span>
		</div>
		<button on:click={copy}>{copyText}</button>
	</div>
	<div class=tabs>
		<div class=tab class:active={view==='grid-template'} on:click={select.bind(null, 'grid-template')}>Grid-template</div>
		<div class=tab class:active={view==='grid-area'} on:click={select.bind(null, 'grid-area')}>Grid-area</div>
		<div class=tab class:active={view==='other'} on:click={select.bind(null, 'other')}>Other choice</div>
	</div>

	<div class=tab-content>
		<CSSOutput {view}/>
	</div>

	<script>
import { items, rowHeight, columns, gridTemplateColumns, gridTemplateRows,gap,container } from "../store";
		import CSSOutput from './CSSOutput.svelte'

import { generateCSSOutput } from "../utils";

	let copyText='copy'
	let view = 'grid-template'
	const select= (item,e)=> view = item;

let rows = Math.max(...$items.map(val => val.y + val.h), 1);

		const copy = () => {
		if(copyText === 'copy') {
			let result = generateCSSOutput($items,view,$gridTemplateRows,$gridTemplateColumns,$rowHeight,$columns,$gap,$container,true)

			console.log(result)

		let txt = document.createElement('textarea')
		txt.textContent=result
		txt.width=0
		txt.height=0
		document.body.appendChild(txt)
		txt.select()
		document.execCommand('copy')
		document.body.removeChild(txt)
		copyText='copied'

		setTimeout(()=>{
			copyText='copy'
		},1800)
		}
	}
	</script>