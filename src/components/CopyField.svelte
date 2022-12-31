<script lang="ts">
    import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';

    export let text: string;
    
    let copied = false;
    
    async function copy(event: Event) {
        event.stopPropagation();
        if(copied)
            return;
        try {
            await navigator.clipboard.writeText(text);
            copied = true;
            setTimeout(() => copied = false, 1500);
        } catch (error) {
            console.error(error);
        }
    }
</script>

<div class="px-2 py-1 rounded-lg bg-black bg-opacity-10 flex justify-between" on:click={copy} on:keypress={copy}>
    <code>{text}</code>
    <button class="ml-2 justify-self-end" aria-label="copy"><Fa icon={copied ? faCheck : faCopy}/></button>
</div>