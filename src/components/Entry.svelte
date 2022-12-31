<script lang="ts">
    import { bind } from 'svelte-simple-modal';
    import { faWrench } from '@fortawesome/free-solid-svg-icons';
    import { modalStore } from '../stores';

    import type { EntryData } from '../model/EntryData.svelte';
    import { EntryType } from '../model/EntryData.svelte';

    import EntryFull from './EntryFull.svelte';
    import Pill from './Pill.svelte';
	import CopyField from './CopyField.svelte';
	import LinkField from './LinkField.svelte';

    export let entry: EntryData;

    // @ts-expect-error cba to type this
    const showFull = () => modalStore.set(bind(EntryFull, { entry }));

    const sizeToType = (size: number) => {
        switch (size){
            case 1:
                return "int8_t";
            case 2:
                return "int16_t";
            case 4:
                return "int32_t";
            case 8:
                return "int64_t";
            default:
                return undefined;
        }
    };
</script>

<div class="mb-4 mr-4 pb-2 p-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all" on:click={showFull} on:keypress={showFull}>
    <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-1">
        <b class="max-w-4xl text-lg truncate">{entry.name}</b>
        <div class="flex flex-row items-center space-x-1">
            {#if entry.isVtable} <Pill title="vtable" color="rebeccapurple"/> {/if}
            {#if entry.isClass} <Pill title="class" color="darkorange"/> {/if}
            {#if entry.isVirtual} <Pill title="virtual" color="seagreen"/> {/if}
            <Pill title="type: {EntryType[entry.type].toLowerCase()}" icon={faWrench} color="cornflowerblue"/>
        </div>
    </div>
    {#if entry.description} <p>{entry.description}</p> {/if}
    {#if entry.signature} <div class="my-1 -ml-1 max-w-2xl"><CopyField text={entry.signature}/></div> {/if}
    {#if entry.isVirtual && entry.class && entry.vOffset}
        <div class="my-1 max-w-2xl flex items-center">
            Index: <span class="w-2"/> <LinkField name={entry.class}/>+<CopyField text={entry.vOffset.toString()}/>
        </div>
    {/if}
    {#if entry.type == EntryType.REFERENCE}
        <div class="my-1 max-w-2xl flex items-center">
            refOffset: <span class="w-2"/><CopyField text={entry.refOffset.toString()}/><span class="w-2"/>
            refSize: <span class="w-2"/><CopyField text={entry.refSize.toString()}/> 
            {#if sizeToType(entry.refSize) !== undefined}
                <span class="w-2"/>
                <small> or </small><span class="w-2"/><CopyField text={`sizeof(${sizeToType(entry.refSize)})`}/> 
            {/if}
        </div>
    {/if}
</div>