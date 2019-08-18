<style>
.content {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid #d3d3d3;
  display: flex;
  flex-direction: column;
}

:global(*) {
  user-select: none;
}
:global(body) {
  overflow: scroll;
  margin: 0;
}
:global(.svlt-grid-shadow) {
  background: #eaeaea;
}

:global(.svlt-grid-transition > .svlt-grid-item) {
  transition: transform 0.2s;
}

:global(.svlt-grid-shadow) {
  transform: transform 0.2s;
}

input,
small {
  margin: 4px;
}
input {
  font-size: 13pt;
  padding: 5px 5px;
  outline: none;
  border: 1px solid transparent;
}
input:focus {
  border-color: #1a73e8;
}

</style>

<script>
import Grid from "svelte-grid";
import gridHelp from "svelte-grid/build/helper";
import ContextMenu from "../components/ContextMenu/index.svelte";
import { CONTEXT_MENU_KIND } from "../components/ContextMenu/kind.js";
import Modal from "../components/Modal.svelte";
import { columns, rowHeight, gap, items } from "../store";
import About from "../components/About.svelte";
import ModalCSSOutput from "../components/ModalCSSOutput.svelte";
import { onMount } from "svelte";
import { id } from '../utils'
import ModalCSSDynamicImport from '../components/ModalCSSDynamicImport.svelte'
import HighlightGrid from '../components/HighlightGrid/index.svelte'

let Settings;


const random = (min, max) => Math.random() * (max - min) + min;
const addItem = () => {
  let newItem = {
    ...gridHelp.item({
      w: 2,//Math.min(random(2, $columns)),
      h: 2,
      x: 0,
      y: 0,
      id: id()
    }),
    ...{ templateName: "Unknown", className: "Unknown" }
  };

  let findOutPosition = gridHelp.findSpaceForItem(newItem, $items, $columns); // find out where to place
  return { ...newItem, ...findOutPosition };
};

let visible = false;
let toogleSettings;
let contextValue = [];
let x = 0;
let y = 0;
let contextMenuItem;

let modals = {
  about: false,
  css: false
};

let rowsCount=0;

onMount(() => {
  if (!localStorage.getItem("welcome")) {
    localStorage.setItem("welcome", true);
    setModal("about", true);
  } else {
    setModal("about", false);
  }

  rowsCount = Math.round(window.innerHeight/$rowHeight);

});

const mousedownGrid = () => closeContext();

const show = ({ top, left }, context) => {
  x = left;
  y = top;
  visible = true;
  contextValue = context;
};

const closeContext = () => {
  if (visible) {
    visible = false;
  }
};

let infoAbout = [
  {
    kind: CONTEXT_MENU_KIND.DIVIDE
  },
  {
    kind: CONTEXT_MENU_KIND.ABOUT,
    text: "About"
  }
];

const contextmenuGrid = e => {
  e.preventDefault();
  const origin = {
    left: e.clientX,
    top: e.clientY
  };

  let context = [
    {
      kind: CONTEXT_MENU_KIND.ADD,
      text: "Add item"
    },
    {
      kind: CONTEXT_MENU_KIND.SETTINGS,
      text: "Settings"
    },
    {
      kind: CONTEXT_MENU_KIND.HIGHLIGHT,
      text: "Highlight grid",
      icon: highlightGrid ? "◆" : "◇",
      highlight: highlightGrid
    }
  ];

  if (toogleSettings) {
    context = [
      ...context,
      ...[{ kind: CONTEXT_MENU_KIND.CLOSE_SETTINGS, text: "Close settings" }]
    ];
  }
  if ($items.length > 0) {
    context = [
      ...context,
      ...[
        { kind: CONTEXT_MENU_KIND.DIVIDE },
        {
          kind: CONTEXT_MENU_KIND.MAKE,
          text: "Generate css code"
        }
      ]
    ];
  }
  context = [...context, ...infoAbout];

  show(origin, context);

  contextMenuItem = null;
  return false;
};

const hideContextMenu = () => {
  x = -100;
  y = -100;
  visible = false;
};

let highlightGrid = false;

const select = async ({ detail }) => {
  switch (detail.kind) {
    case CONTEXT_MENU_KIND.ADD:
      items.update(_items => [..._items, ...[addItem()]]);
      hideContextMenu();
      break;
    case CONTEXT_MENU_KIND.HIGHLIGHT:
      highlightGrid = !highlightGrid;
      hideContextMenu();
      break;
    case CONTEXT_MENU_KIND.REMOVE:
      items.update(_items =>
        _items.filter(value => value.id !== contextMenuItem.id)
      );
      hideContextMenu();
      break;
    case CONTEXT_MENU_KIND.SETTINGS:
      if (!Settings) {
        const module = await import("../components/Settings.svelte");
        Settings = module.default;
      }
      toogleSettings = true;
      hideContextMenu();
      break;
    case CONTEXT_MENU_KIND.CLOSE_SETTINGS:
      closeSettings();
      break;
    case CONTEXT_MENU_KIND.ABOUT:
      setModal("about", true);
      hideContextMenu();
      break;
    case CONTEXT_MENU_KIND.MAKE:
      setModal("css", true);
      hideContextMenu();
      break;
  }

  // hideContextMenu()
};

const contextmenuItem = (item, e) => {
  e.preventDefault();
  e.stopPropagation();
  const origin = {
    left: e.pageX,
    top: e.pageY
  };

  let context = [
    { text: "Remove", kind: CONTEXT_MENU_KIND.REMOVE },
    { kind: CONTEXT_MENU_KIND.DIVIDE },
    {
      kind: CONTEXT_MENU_KIND.HIGHLIGHT,
      text: "Highlight grid",
      icon: highlightGrid ? "◆" : "◇",
      highlight: highlightGrid
    },
    { text: "Settings", kind: CONTEXT_MENU_KIND.SETTINGS },
    { text: "Generate css code", kind: CONTEXT_MENU_KIND.MAKE }
  ];
  context = [...context, ...infoAbout];

  show(origin, context);
  contextMenuItem = item;
  return false;
};
const closeSettings = () => {
  toogleSettings = false;
};
const mousedownItem = e => {
  closeContext();
};
const input = (item, prop, e) => {
  items.update(_items =>
    _items.map(value => {
      if (value.id === item.id) {
        return {
          ...value,
          ...{
            [prop]: e.target.value
          }
        };
      } else {
        return value;
      }
    })
  );
};

const setModal = (label, toogle) => {
  modals = {
    ...modals,
    ...{ [label]: toogle }
  };
};

const keydown = e => {
  if (e.ctrlKey && e.keyCode===17) {
    highlightGrid = !highlightGrid;
  }
};

let xPerPx;

const resize=({detail})=>{
	xPerPx=detail.xPerPx
	rowsCount = Math.round(window.innerHeight/$rowHeight)
}
const mount = ({detail}) => {
	xPerPx = detail.xPerPx
}

</script>

<ContextMenu on:select={select} left={x} top={y} context={contextValue} {visible}/>

{#if modals.about} 
  <Modal on:close={setModal.bind(null,'about',false)}>
    <About/>
  </Modal>
{/if}

{#if modals.css}
<Modal on:close={setModal.bind(null,'css',false)}>
  <ModalCSSDynamicImport/>
</Modal>
{/if}

<svelte:window on:contextmenu={contextmenuGrid} on:mousedown={mousedownGrid} on:keydown={keydown}/>

{#if toogleSettings}
  <svelte:component this={Settings} on:close={closeSettings}/>
{/if}

{#if highlightGrid}
	<HighlightGrid {xPerPx} {rowsCount} rowHeight={$rowHeight} gap={$gap} columns={$columns}/>
{/if}

<Grid on:mount={mount} on:resize={resize} useTransform fillEmpty={false} items={$items} bind:items={$items} cols={$columns} let:item={item} rowHeight={$rowHeight} gap={$gap}>
  <div class=content on:mousedown={mousedownItem} on:contextmenu={contextmenuItem.bind(null, item)} >
    <small>Template name</small>
    <input type=text value={item.templateName} on:input={input.bind(null,item,'templateName')}/>
    <small>Class name</small>
    <input type=text value={item.className} on:input={input.bind(null,item,'className')}/>
  </div>
</Grid>

