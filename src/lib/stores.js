import { writable } from 'svelte/store';

export const observing = writable(false);
export let allPosts = writable([])
export const colors = writable({
    main: '#005476',
	secondary : '#0076BF',
	tertiary : '#ED0070'
})