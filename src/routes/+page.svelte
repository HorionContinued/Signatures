<script lang="ts">
	import Fuse from 'fuse.js';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { writable } from 'svelte/store';

	import Function from '../components/Function.svelte';
	import { all } from '../model/FunctionData.svelte';

    const searchTermStore = writable('');
	const fuse = new Fuse(all, {
    	keys: ['name', 'description', 'signature'],
		threshold: 0.25,
		useExtendedSearch: true
    });
</script>

<h1 class="text-4xl">Signatures for {all.length} functions</h1>
<input bind:value={$searchTermStore} placeholder="name, description or signature" class="w-full"/>
<main class="list">
	{#if $searchTermStore.length > 0}
		{#await fuse.search($searchTermStore)}
			<p>Loading...</p>
		{:then searchResults}
			{#if searchResults.length === 0}
				<p>No results</p>
			{:else}
				<VirtualList items={searchResults.map(v => v.item)} let:item>
					<Function func={item} />
				</VirtualList>
			{/if}
		{/await}
	{:else}
		<VirtualList items={all} let:item>
			<Function func={item} />
		</VirtualList>
	{/if}
</main>

<style>
	.list {
		height: calc(100vh - 90px);
		overflow: auto;
	}
</style>