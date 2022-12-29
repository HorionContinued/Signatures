<script lang="ts">
    import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';

    export let text: string;
    
    let copied = false;
    $: setInterval(() => copied = false, 1500);

    async function copy(event: MouseEvent) {
        event.stopPropagation();
        try {
            await navigator.clipboard.writeText(text);
            copied = true;
        } catch (error) {
            console.error(error);
        }
    }
</script>

<div class="px-2 py-1 rounded-lg bg-black bg-opacity-10 flex justify-between">
    <code>{text}</code>
    <button class="ml-2 justify-self-end" on:click={copy} aria-label="copy"><Fa icon={copied ? faCheck : faCopy}/></button>
</div>