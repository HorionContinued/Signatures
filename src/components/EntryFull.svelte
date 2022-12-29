<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	import type { EntryData } from "src/model/EntryData.svelte";

    export let entry: EntryData;

    onMount(() => { window.location.hash = entry.cleanName; });
    onDestroy(() => { window.location.hash = ""; });
</script>
  
<h1 class="text-2xl">{entry.name}</h1>
<p>work in progress</p>