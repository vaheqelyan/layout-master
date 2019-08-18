<style>
	.popup {
		z-index: 1000000;
		display: inline-flex;
		flex-direction: column;
		padding:0.5em 0 0.5em 0;
		border :1px solid #bababa;
		background: white;
		position: fixed;
		cursor: move;
	}

	.column {
			cursor: default;
	  text-decoration:none;
	  padding: 0.5em 0.9em 0.5em 0.75em;
	  max-width:18em;
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	}

/*.column::before {
  content:'';
  float:left;
  margin-right:0.75em;
  width:0.5em;
  height:1em;
  display:inline-block;
}*/
	
input {
	font-size: 10pt;
	padding: 5px 5px;
	outline: none;
	border: 1px solid transparent;
}
input:focus {
	border-color: #1a73e8;
}
label {
	margin-bottom: 5px;
	color: #b8b8b8;
	font-size: small;
}
.input-wrap {
	margin-top: 5px;
}
.group {
	display: flex;
	align-items: center;
}
.icon {
	margin-left: auto;
}
svg {
	width: 15px;
	height: 100%;
}
.label-radio {
	color: unset;
}
.header {
	cursor: move;
	display: flex;
	justify-content: flex-end;
	padding-top: 0;
}
.header-item {
	margin-left: 15px;
	cursor: pointer;
}
.header-item svg {
	fill:#6e6e6e;
	width: 20px;
}
.header-item svg:hover {
	fill: #000;
}
.drag {
	cursor: move;
}
</style>

<div class=popup on:mousedown={mousedown} style="left: {left}px; top:{top}px">

	<div class="column header">
		<div class="header-item drag">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
		</div>
		<div class=header-item on:click={close}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg></div>
	</div>

	<div class=column>
		<label>
			Colums
	  </label>
	  <div class=input-wrap>
			<input type=number bind:value={$columns} min={0}>
			<!-- <Columns/> -->
			</div>
	</div>
	<div class=column>
		<label>Row height</label>
		<div class=input-wrap>
			<input type=number bind:value={$rowHeight} min={0}>
			<!-- <RowHeight/> -->
		</div>
	</div>
	<div class=column>
		<!-- <label>Gap</label> -->
		<div class="group">
			<label>Gap ({$gap}px)</label>
			<span class=icon>
				<a href=https://developer.mozilla.org/en-US/docs/Web/CSS/gap target=_blank>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
				</a>
			</span>
		</div>
		<div class=input-wrap>
			<input type=number bind:value={$gap} min={0}>
			<!-- <Gap/> -->
		</div>
	</div>

	<div class=column>
		<div class="group">
			<label>grid-template-rows</label>
		</div>		
		<div class=radio-group>
			<label class=label-radio>
				default
				<input type=radio bind:group={$gridTemplateRows} value={undefined}>
				<!-- <GridTemplateRows value={undefined}/> -->
			</label>
						<label class=label-radio>
				auto
				<input type=radio bind:group={$gridTemplateRows} value=auto>
				<!-- <GridTemplateRows value=auto/> -->
			</label>
						<label class=label-radio>
				1fr
				<input type=radio bind:group={$gridTemplateRows} value=1fr>
				<!-- <GridTemplateRows value=1fr/> -->
			</label>
		</div>
	</div>

	<div class=column>
		<div class=group>
			<label>grid-template-columns</label>
		</div>
		<div class=radio-group>
						<label class=label-radio>
				auto
				<!-- <GridTemplateColumns value=auto/> -->
				<input type=radio bind:group={$gridTemplateColumns} value=auto>
			</label>
						<label class=label-radio>
				1fr
				<!-- <GridTemplateColumns value=1fr/> -->
				<input type=radio bind:group={$gridTemplateColumns} value=1fr>
			</label>
		</div>
	</div>

	<div class=column>
			<label>
			<input type=checkbox bind:checked={$container}/>
				Include container class in output
			</label>
	</div>

	<div class=column>
		<button on:click={reset}>Reset settings</button>
	</div>

</div>

<script>
	import {columns,rowHeight,gap, gridTemplateColumns,gridTemplateRows,container} from '../store'
		import { createEventDispatcher,onDestroy,afterUpdate } from 'svelte';

		afterUpdate(()=>{
			if(!isDragging) {
				if(typeof window !== 'undefined') {
					localStorage.setItem('settings', JSON.stringify({
						columns:$columns,
						rowHeight:$rowHeight,
						gap:$gap,
						gridTemplateColumns:$gridTemplateColumns,
						gridTemplateRows:$gridTemplateRows
					}))
			}
		}
	})

	const dispatch = createEventDispatcher();

	let dragX = 0,
  dragY = 0;

  let top=10,
  left=10;

  let maxSize;

  let isDragging = false;

	const mousedown = e => {
		let { currentTarget: { offsetLeft, offsetTop }, pageX, pageY } = e;

		dragX = pageX - offsetLeft;
		dragY = pageY - offsetTop;

		window.addEventListener("mousemove", move, false);
		window.addEventListener("mouseup", up, false);
	}


	const move = e => {
		left = Math.max(e.pageX - dragX, 0)
		top = Math.max(e.pageY - dragY,0)
		if(!isDragging) {
			isDragging = true
		}
	}

	const up = e => {
		window.removeEventListener('mousemove',move,false)
		window.removeEventListener('mouseup',up,false)
		isDragging=false
	}

	const reset = () => {
		columns.set(3)
		rowHeight.set(100)
		gap.set(10)
		gridTemplateColumns.set('1fr')
		gridTemplateRows.set(undefined)
	}

	const close = () => {
		dispatch('close',{})
	}

</script>