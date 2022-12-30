<script lang="ts">
    import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let title: string;
    export let icon: IconDefinition | null = null;
    export let color: string;
</script>

<div class="rounded-full h-6 px-2 flex items-center" style="background-color: {color};">
    {#if icon}
        <span class="mr-1"><Fa {icon}/></span>
    {/if}
    <span class="text-sm whitespace-nowrap">{title}</span>
</div>