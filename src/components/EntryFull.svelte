<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	import type { EntryData } from "src/model/EntryData.svelte";

    import CopyField from "./CopyField.svelte";
    import LinkField from "./LinkField.svelte";

    export let entry: EntryData;

    onMount(() => { window.location.hash = entry.cleanName; });
    onDestroy(() => { window.location.hash = ""; });
</script>
  
<h1 class="text-2xl truncate">{entry.name}</h1>
{#if entry.description} <p>{entry.description}</p> {/if}
{#if entry.signature} <div class="my-1 -ml-1 max-w-2xl"><CopyField text={entry.signature}/></div> {/if}
{#if entry.vOffset && entry.vOffset != -1 && entry.class}
    <div class="my-1 max-w-2xl flex items-center">
        Index: <span class="w-2"/> <LinkField name={entry.class}/>+<CopyField text={entry.vOffset.toString()}/>
    </div>
{/if}
{#if entry.refOffset && entry.refSize}
    <div class="my-1 max-w-2xl flex items-center">
        refOffset: <span class="w-2"/><CopyField text={entry.refOffset.toString()}/><span class="w-2"/>
        refSize: <span class="w-2"/><CopyField text={entry.refSize.toString()}/>
    </div>
{/if}