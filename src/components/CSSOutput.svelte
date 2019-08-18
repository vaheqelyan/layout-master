<style>
  .group {
        align-items: baseline;
    display: flex;
    margin: 0 10px;
    padding: 0 10px;
    font: 12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  }
  .left-auto {
    margin-left: auto;
  }
  label {
    margin: 0 10px;
  }

  .code {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    overflow-x: auto;
    font: 12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    padding: 20px 0 20px 20px;
  }
  .line-no {
    padding: 0 13px 0 0;
    text-align:right;
  }
  .line {
    overflow-x: auto;
    white-space: pre;
  }
  .line-no-value,.line-value {
    margin: 5px 0;
    min-height: 14px;
  }
</style>


<div class=code>
  <div class=line>
	{#each generate($items,view,$gridTemplateRows,$gridTemplateColumns,$rowHeight,$columns,$gap,$container) as line, i}
		<div class=line-value>{@html line}</div>
	{/each}
  </div>
    <div class=line-no>
  {#each new Array(result.length) as line, i}
    <div class=line-no-value>{i}</div>
  {/each}
  </div>
</div>

<div class=group>
  <span class=prop>grid-template-columns</span>
  <label class=left-auto>
    auto
    <input type=radio bind:group={$gridTemplateColumns} value=auto />
  </label>
    <label>
    1fr
    <input type=radio bind:group={$gridTemplateColumns} value=1fr />
  </label>
</div>

<div class=group>
  <span class=prop>grid-template-rows</span>
  <label class=left-auto>
    default
    <input type=radio bind:group={$gridTemplateRows} value={undefined} />
  </label>
  <label class=left-auto>
    auto
    <input type=radio bind:group={$gridTemplateRows} value=auto />
  </label>
    <label>
    1fr
    <input type=radio bind:group={$gridTemplateRows} value=1fr />
  </label>
</div>

<script>
import { items, rowHeight, columns, gridTemplateColumns, gridTemplateRows,gap,container } from "../store";
import { makeMatrixFromItems, generateCSSOutput } from "../utils";

let result=[];


 function generate(_items,_view,_gridTemplateRows,_gridTemplateColumns,_rowHeight,_columns,_gap,_container) {
  let tempResult = generateCSSOutput(_items,view,_gridTemplateRows,_gridTemplateColumns,_rowHeight,_columns,_gap,_container)
  
  result = tempResult
  return tempResult
}

export let view;

</script>