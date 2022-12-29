<script context="module" lang="ts">
    import { functions, onames } from '../database/functions.json';
    import metadata from '../database/metadata.json';

    export type EntryData = {
        name: string;
        cleanName: string;
        description?: string;
        type: EntryType;
        class?: string;
        signature?: string;
        vOffset?: number;
        offset: number;
        refOffset: number;
        refSize: number;
        isClass: boolean;
        isVirtual: boolean;
        isVtable: boolean;
        symbol?: string;
    }

    export enum EntryType {
        NONE = 0,
        DIRECT = 1,
        FUNCTION = 2,
        REFERENCE = 3,
        VTABLE = 4
    }

    function toEntryData(entry: typeof functions[0] & typeof onames[0]): EntryData {
        const name = entry.demangledname || entry.name;
        const cleanName = name.split("(")[0];
        // @ts-expect-error Typescript will throw an error here, but it's fine
        const md: { description: string } = metadata[cleanName];
        return {
            name: name,
            cleanName: cleanName,
            description: md?.description,
            type: entry.type as EntryType,
            class: entry.classname,
            signature: entry.signature,
            vOffset: entry.voffset,
            offset: entry.offset,
            refOffset: entry.refoffset,
            refSize: entry.refsize,
            isClass: entry.isclass === 1,
            isVirtual: entry.isvirtual === 1,
            isVtable: entry.isvtable,
            symbol: entry.symbol
        }
    }

    export const all: EntryData[] = 
        // @ts-expect-error Disable type checking for this line
        [...functions.map(toEntryData), ...onames.map(toEntryData)]
        .sort((a, b) => a.name.localeCompare(b.name));
</script>