<script lang="ts">
    import type Fuse from "fuse.js";

    export let matches: ReadonlyArray<Fuse.FuseResultMatch>;
    export let text: string;

    let highlighted = Array.from(Array(text.length)).map(() => false);
   
    $: {
        highlighted = Array.from(Array(text.length)).map(() => false);

        matches.forEach((match: Fuse.FuseResultMatch) => {
            if(match.key !== "name")
                return;
            match.indices.forEach(index => {
                for(let i = index[0]; i <= index[1]; i++)
                    highlighted[i] = true;
            });
        });
    }
    

</script>
<style>
    .highlighted {
        background-color: yellow;
        color:black;
    }
</style>
{#each highlighted as high, i}
<span class={high === true ? "highlighted" : ""}>{text.at(i)}</span>
{/each}
