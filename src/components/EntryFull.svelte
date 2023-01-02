<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	import { EntryResolveType, type EntryData } from "../model/EntryData.svelte";

    import CopyField from "./CopyField.svelte";
    import LinkField from "./LinkField.svelte";
	import BackdropField from "./BackdropField.svelte";
	import Pill from "./Pill.svelte";
	import { faWrench } from "@fortawesome/free-solid-svg-icons";

    export let entry: EntryData;

    onMount(() => { window.location.hash = entry.cleanName; });
    onDestroy(() => { window.location.hash = ""; });
</script>
  
<div class="my-2">
    <h1 class="max-w-4xl text-lg truncate my-1">{entry.name}</h1>
    <div class="flex flex-row items-center space-x-1">
        {#if entry.isFunction} <Pill title="function" color="crimson"/> {/if}
        {#if entry.isVtable} <Pill title="vtable" color="rebeccapurple"/> {/if}
        {#if entry.isClass} <Pill title="class" color="darkorange"/> {/if}
        {#if entry.isVirtual} <Pill title="virtual" color="seagreen"/> {/if}
        <Pill title="resolveType: {EntryResolveType[entry.resolveType].toUpperCase()}" icon={faWrench} color="cornflowerblue"/>
    </div>
</div>
{#if entry.description} <p>{entry.description}</p> {/if}
{#if entry.cppName} 
    <div class="my-2 max-w-2xl">
        <h4 class="mb-1">C++:</h4>
        <CopyField text={entry.cppName}/>
    </div>
{/if}
{#if entry.signature} 
    <div class="my-2 max-w-2xl">
        <h4 class="mb-1">Signature:</h4>
        <CopyField text={entry.signature}/>
    </div> 
{/if}

<div class="my-2 max-w-2xl flex items-center">
    {#if entry.isVirtual && entry.class && entry.vOffset !== undefined}
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
            {#if entry.refSizeType !== undefined}
                <span class="w-2"/>
                <small> or </small><span class="w-2"/><CopyField text={`sizeof(${entry.refSizeType})`}/> 
            {/if}
        </BackdropField>
    {/if}
</div>
