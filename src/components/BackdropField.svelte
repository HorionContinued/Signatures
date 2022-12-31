<script lang="ts">
   
</script>

<div class="flex items-center mr-2 p-1 pl-2 bg-black bg-opacity-10 rounded-lg cursor-auto" 

    on:click={(e) => e.stopPropagation()} on:keypress={(e) => e.stopPropagation()}
    >
    <slot></slot>
</div>