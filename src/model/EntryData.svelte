<script context="module" lang="ts">
    import metadata from '../database/metadata.json';
    
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

    export enum EntryResolveType {
        NONE = 0,
        DIRECT = 1,
        FUNCTION = 2,
        BY_REFERENCE = 3,
        BY_VTABLE = 4
    }

    export enum RefSizeType {
        int8_t = 1,
        int16_t = 2,
        int32_t = 4,
        int64_t = 8
    }

    function toEntryData(entry: any): EntryData {
        const name = entry.demangledname || entry.name;
        const isFunction = entry.demangledname !== undefined;
        const cleanName = name.split("(")[0];
        // @ts-expect-error Typescript will throw an error here, but it's fine
        const md: { description: string } = metadata[cleanName];

        const refSizeType = RefSizeType[entry.refsize]?.toLowerCase();
        let cppName: string = entry.cpp_name;
        if(cppName && entry.classname?.length > 0) {
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

    let all: EntryData[];
    export async function get(): Promise<EntryData[]> {
        if(all) return all;
        const { functions, onames } = await import("../database/functions.json").then(r => r.default);
        const entries = await Promise.all([...functions, ...onames].map(toEntryData));
        all = entries;
        return entries;
    }
</script>