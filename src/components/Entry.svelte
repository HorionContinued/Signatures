<script lang="ts">
    import { bind } from 'svelte-simple-modal';
    import { faWrench } from '@fortawesome/free-solid-svg-icons';
    import { modalStore } from '../stores';

    import type { EntryData } from '../model/EntryData.svelte';
    import { EntryResolveType } from '../model/EntryData.svelte';

    import EntryFull from './EntryFull.svelte';
    import Pill from './Pill.svelte';
	import CopyField from './CopyField.svelte';
	import LinkField from './LinkField.svelte';
	import BackdropField from './BackdropField.svelte';

    export let entry: EntryData;
    
    const showFull = (e: Event) => {
        // @ts-expect-error cba to type this
        modalStore.set(bind(EntryFull, { entry }));
    };

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

<div class="mb-4 mr-4 px-4 py-1 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all cursor-pointer"  on:click={showFull} on:keypress={showFull}>
    <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-1 my-2">
        <b class="max-w-4xl text-lg truncate">{entry.name}</b>
        <div class="flex flex-row items-center space-x-1">
            {#if entry.isFunction} <Pill title="function" color="crimson"/> {/if}
            {#if entry.isVtable} <Pill title="vtable" color="rebeccapurple"/> {/if}
            {#if entry.isClass} <Pill title="class" color="darkorange"/> {/if}
            {#if entry.isVirtual} <Pill title="virtual" color="seagreen"/> {/if}
            <Pill title="resolveType: {EntryResolveType[entry.resolveType].toUpperCase()}" icon={faWrench} color="cornflowerblue"/>
        </div>
    </div>
    {#if entry.description} <p>{entry.description}</p> {/if}
    {#if entry.signature} 
        <div class="my-2 max-w-2xl cursor-auto"
            on:click={(e) => e.stopPropagation()} on:keypress={(e) => e.stopPropagation()}>
            <CopyField text={entry.signature}/>
        </div>
    {/if}
    <div class="my-2 max-w-2xl flex items-center">
        {#if entry.isVirtual && entry.class && entry.vOffset}
            <BackdropField> 
                Index: <span class="w-2"/> <LinkField name={entry.class}/><span class="mx-1">+</span><CopyField text={entry.vOffset.toString()}/>
            </BackdropField>
        {/if}
        {#if entry.resolveType == EntryResolveType.BY_REFERENCE}
            <BackdropField>
                refOffset: <span class="w-2"/><CopyField text={entry.refOffset.toString()}/>
            </BackdropField>
            <BackdropField>
                refSize: <span class="w-2"/><CopyField text={entry.refSize.toString()}/> 
                {#if sizeToType(entry.refSize) !== undefined}
                    <span class="w-2"/>
                    <small> or </small><span class="w-2"/><CopyField text={`sizeof(${sizeToType(entry.refSize)})`}/> 
                {/if}
            </BackdropField>
        {/if}
    </div>
</div>