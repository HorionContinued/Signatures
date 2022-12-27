<script lang="ts">
    import type { FunctionData } from '../model/FunctionData.svelte';
    import { FunctionType } from '../model/FunctionData.svelte';
    export let func: FunctionData;
</script>

<div class="mb-4 mr-4 p-4 bg-white bg-opacity-5 rounded-xl hover:bg-opacity-10 transition-all">
    <p><b>{func.name}</b></p>
    {#if func.description}
        <p>{func.description}</p>
    {/if}
    <p><code>{func.signature}</code></p>
    <p>Symbol: <code>{func.symbol}</code></p>
    <p>Type: {FunctionType[func.type]}</p>
</div>