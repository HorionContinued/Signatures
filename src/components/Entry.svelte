<script lang="ts">
    import Modal, { bind } from 'svelte-simple-modal';
    import { modalStore } from '../stores';

    import type { EntryData } from '../model/EntryData.svelte';
    import { EntryType } from '../model/EntryData.svelte';

    import EntryFull from './EntryFull.svelte';
    import Pill from './Pill.svelte';

    export let entry: EntryData;

    // @ts-expect-error cba to type this
    const showFull = () => modalStore.set(bind(EntryFull, { entry }));
</script>

<div class="mb-4 mr-4 p-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all cursor-pointer" on:click={showFull} on:keypress={showFull}>
    <div class="flex flex-row items-center space-x-1">
        <b class="text-lg">{entry.name}</b>
        {#if entry.isVtable } <Pill title="vtable" color="rebeccapurple"/> {/if}
        {#if entry.isClass } <Pill title="class" color="darkorange"/> {/if}
        {#if entry.isVirtual } <Pill title="virtual" color="green"/> {/if}
    </div>
    {#if entry.description}
        <p>{entry.description}</p>
    {/if}
    <p><code>{entry.signature}</code></p>
    <p>Symbol: <code>{entry.symbol}</code></p>
    <p>Type: {EntryType[entry.type]}</p>
</div>