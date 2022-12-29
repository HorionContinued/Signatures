<script lang="ts">
    import { bind } from 'svelte-simple-modal';
    import { faWrench } from '@fortawesome/free-solid-svg-icons';
    import { modalStore } from '../stores';

    import type { EntryData } from '../model/EntryData.svelte';
    import { EntryType } from '../model/EntryData.svelte';

    import EntryFull from './EntryFull.svelte';
    import Pill from './Pill.svelte';
	import CopyField from './CopyField.svelte';

    export let entry: EntryData;

    // @ts-expect-error cba to type this
    const showFull = () => modalStore.set(bind(EntryFull, { entry }));
</script>

<div class="mb-4 mr-4 p-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all" on:click={showFull} on:keypress={showFull}>
    <div class="flex flex-row items-center space-x-1">
        <b class="text-lg">{entry.name}</b>
        {#if entry.isVtable} <Pill title="vtable" color="rebeccapurple"/> {/if}
        {#if entry.isClass} <Pill title="class" color="darkorange"/> {/if}
        {#if entry.isVirtual} <Pill title="virtual" color="seagreen"/> {/if}

        <Pill title="type: {EntryType[entry.type].toLowerCase()}" icon={faWrench} color="cornflowerblue"/>
    </div>
    {#if entry.description} <p>{entry.description}</p> {/if}
    {#if entry.signature} <div class="my-1 -ml-1 max-w-3xl"><CopyField text={entry.signature}/></div> {/if}
    {#if entry.vOffset} <div class="my-1 max-w-3xl flex items-center">Offset: <span class="w-2"/><CopyField text={entry.vOffset.toString()}/></div> {/if}
</div>