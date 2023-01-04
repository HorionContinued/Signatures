<script lang="ts">
    import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
	import type EntryData  from '../model/EntryData.svelte';
    import Fa from 'svelte-fa';
    import { bind } from 'svelte-simple-modal'
    import { modalStore } from '../stores';
    
    import EntryFull from './EntryFull.svelte'; 
	import { onMount } from 'svelte';

    export let name: string;
    let parent: EntryData;

    async function link(event: Event) {
        event.stopPropagation();
        if(!parent) return;
        // @ts-expect-error
        modalStore.set(bind(EntryFull, { entry: parent }))
    }

    onMount(async () => {
        let entrydata = await import("../model/EntryData.svelte")
        let all = await entrydata.get();
        parent = all.find(e => e.cleanName === name)
    });
</script>

{#if parent}
<div class="px-2 py-1 rounded-lg bg-black bg-opacity-10 flex justify-between {parent ? "cursor-pointer" : ""}" on:click={link} on:keypress={link}>
    <code>{parent.cleanName}</code>
    {#if parent}<button class="ml-2 justify-self-end" aria-label="open link"><Fa icon={faUpRightFromSquare}/></button>{/if}
</div>
{/if}