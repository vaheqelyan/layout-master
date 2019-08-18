import { writable } from 'svelte/store';

let settings = {
  columns:3,
  rowHeight:100,
  gap:10,
  gridTemplateColumns:'1fr',
  gridTemplateRows:undefined,
  container:true
}

let getSettingsFromStorage;

if(typeof window !== 'undefined') {
  if(!localStorage.getItem('settings')) {
    localStorage.setItem('settings',JSON.stringify(settings))
  } else {
    settings = JSON.parse(localStorage.getItem('settings'))
  }
}

export const columns = writable(settings.columns);
export const rowHeight = writable(settings.rowHeight);
export const gap = writable(settings.gap);
export const items = writable([])
export const gridTemplateColumns = writable(settings.gridTemplateColumns)
export const gridTemplateRows = writable(settings.gridTemplateRows)
export const container = writable(settings.container)