<script lang="ts">
    import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
    import { bind } from 'svelte-simple-modal'
    import { modalStore } from '../stores';
    
    import EntryFull from './EntryFull.svelte';
	import { all } from '../model/EntryData.svelte';

    export let name: string;
    let parent = all.find(entry => entry.cleanName === name);

    async function link(event: Event) {
        event.stopPropagation();
        // @ts-expect-error
        modalStore.set(bind(EntryFull, { entry: parent }))
    }
</script>

<div class="px-2 py-1 rounded-lg bg-black bg-opacity-10 flex justify-between {parent ? "cursor-pointer" : ""}" on:click={link} on:keypress={link}>
    <code>{name}</code>
    {#if parent}<button class="ml-2 justify-self-end" aria-label="open link"><Fa icon={faUpRightFromSquare}/></button>{/if}
</div>