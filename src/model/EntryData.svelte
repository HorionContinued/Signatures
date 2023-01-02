<script context="module" lang="ts">
    import metadata from '../database/metadata.json';
    import { functions, onames} from '../database/functions.json'    
    import { EntryResolveType } from './EntryDataStructures.svelte';

    export type EntryData = {
        name: string;
        cleanName: string;
        cppName?: string;
        description?: string;
        resolveType: EntryResolveType;
        class?: string;
        signature?: string;
        vOffset?: number;
        offset: number;
        refOffset: number;
        refSize: number;
        refSizeType?: string;
        isClass: boolean;
        isVirtual: boolean;
        isVtable: boolean;
        isFunction: boolean;
        symbol?: string;
    }

    function toEntryData(entry: any): EntryData {
        const name = entry.demangledname || entry.name;
        const isFunction = entry.demangledname !== undefined;
        const cleanName = name.split("(")[0];
        // @ts-expect-error Typescript will throw an error here, but it's fine
        const md: { description: string } = metadata[cleanName];

        const sizeToType = (size: number) => {
            switch (size){
                case 1:
                    return "int8_t";
                case 2:
                    return "int16_t";
                case 4:
                    return "int32_t";
                case 8:
                    return "int64_t";
                default:
                    return undefined;
            }
        };
        const refSizeType = sizeToType(entry.refsize);
        let cppName: string | undefined = entry.cpp_name;
        if(cppName !== undefined && entry.classname !== undefined && entry.classname.length > 0){
            cppName = cppName.replace(entry.classname+"::", "/*"+entry.classname+"::*/");
        }

        return {
            name: name,
            cleanName: cleanName,
            cppName,
            description: md?.description,
            resolveType: entry.type as EntryResolveType,
            class: entry.classname,
            signature: entry.signature,
            vOffset: entry.voffset,
            offset: entry.offset,
            refOffset: entry.refoffset,
            refSize: entry.refsize,
            refSizeType,
            isClass: entry.isclass === 1,
            isVirtual: entry.isvirtual === 1,
            isVtable: entry.isvtable,
            isFunction,
            symbol: entry.symbol
        }
    }

    export const all: EntryData[] = 
        // @ts-expect-error Disable type checking for this line
        [...functions.map(toEntryData), ...onames.map(toEntryData)]
        .sort((a, b) => a.name.localeCompare(b.name));
</script>