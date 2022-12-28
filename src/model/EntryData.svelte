<script context="module" lang="ts">
    import { functions, onames } from '../database/functions.json';
    import metadata from '../database/metadata.json';

    export type EntryData = {
        name: string;
        description?: string;
        type: EntryType;
        signature: string;
        offset: number;
        voffset: number;
        refoffset: number;
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
        // @ts-expect-error Typescript will throw an error here, but it's fine
        const md: { description: string } = metadata[name.split("(")[0]];
        return {
            name: name,
            description: md?.description,
            type: entry.type as EntryType,
            signature: entry.signature,
            offset: entry.offset,
            voffset: entry.voffset,
            refoffset: entry.refoffset,
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