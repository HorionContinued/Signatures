<script lang="ts">
	import Fuse from 'fuse.js';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import Fa from 'svelte-fa/src/fa.svelte'
	import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons'
	import { writable } from 'svelte/store';

	import Function from '../components/Entry.svelte';
	import { all } from '../model/EntryData.svelte';

    const searchTermStore = writable('');
	const fuse = new Fuse(all, {
    	keys: ['name', 'description', 'signature'],
		threshold: 0.25,
		useExtendedSearch: true
    });
</script>

<div class="flex">
	<div class="flex-1 p-5">
		<h1 class="text-4xl">Signatures for {all.length} functions</h1>
	</div>
	<div class="flex justify-end items-center mx-5">
		<a href="https://horion.download/discord" class=""><Fa icon={faDiscord} size="2x"/></a>
		<div class="w-5"/>
		<a href="https://github.com/horionclient/Horion" class=""><Fa icon={faGithub} size="2x"/></a>
	</div>
</div>
<main>
	<div class="mx-5">
		<input bind:value={$searchTermStore} placeholder="name, description or signature" class="w-full placeholder-[var(--text-color)] bg-white bg-opacity-5 rounded-xl p-2 px-3"/>
	</div>
	<div class="m-5 h-[calc(100vh-160px)]">
		{#if $searchTermStore.length > 0}
			{#await fuse.search($searchTermStore)}
				<p>Loading...</p>
			{:then searchResults}
				{#if searchResults.length === 0}
					<p>No results</p>
				{:else}
					<VirtualList items={searchResults.map(v => v.item)} let:item>
						<Function entry={item} />
					</VirtualList>
				{/if}
			{/await}
		{:else}
			<VirtualList items={all} let:item>
				<Function entry={item} />
			</VirtualList>
		{/if}
	</div>
</main>