<script lang="ts">
    import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
	import type EntryData  from 'src/model/EntryData.svelte';
    import Fa from 'svelte-fa';
    import { bind } from 'svelte-simple-modal'
    import { modalStore } from '../stores';
	import Entry from './Entry.svelte';
    
    import EntryFull from './EntryFull.svelte'; 

    export let entry: EntryData;

    async function link(event: Event) {
        event.stopPropagation();
        if(!entry) return;
        // @ts-expect-error
        modalStore.set(bind(EntryFull, { entry: entry }))
    }
</script>

<div class="px-2 py-1 rounded-lg bg-black bg-opacity-10 flex justify-between {parent ? "cursor-pointer" : ""}" on:click={link} on:keypress={link}>
    <code>{entry.cleanName}code>
    {#if parent}<button class="ml-2 justify-self-end" aria-label="open link"><Fa icon={faUpRightFromSquare}/></button>{/if}
</div>