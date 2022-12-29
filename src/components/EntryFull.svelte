<script lang="ts">
	import type { EntryData } from "src/model/EntryData.svelte";
	import { onDestroy, onMount } from "svelte";
    export let entry: EntryData;

    onMount(() => {
        window.location.hash = entry.cleanName;
    });
    onDestroy(() => {
        window.location.hash = "";
    });
</script>
  
<h1 class="text-2xl">{entry.name}</h1>
<p>work in progress</p>