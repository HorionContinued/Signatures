<script context="module" lang="ts">
    import { functions, onames } from '../database/functions.json';
    import metadata from '../database/metadata.json';

    export type FunctionData = {
        name: string;
        description?: string;
        type: FunctionType;
        signature: string;
        offset: number;
        voffset: number;
        isClass: boolean;
        isVirtual: boolean;
        symbol?: string;
    }

    export enum FunctionType {
        NONE = 0,
        DIRECT = 1,
        FUNCTION = 2,
        REFERENCE = 3,
        VTABLE = 4
    }

    function toFunctionData(func: typeof functions[0] & typeof onames[0]): FunctionData {
        const name = func.demangledname || func.name;
        // @ts-expect-error Typescript will throw an error here, but it's fine
        const md: { description: string } = metadata[name.split("(")[0]];
        return {
            name: name,
            description: md?.description,
            type: func.type as FunctionType,
            signature: func.signature,
            offset: func.offset,
            voffset: func.voffset,
            isClass: func.isclass === 1,
            isVirtual: func.isvirtual === 1,
            symbol: func.symbol
        }
    }

    export const all: FunctionData[] = 
        // @ts-expect-error Disable type checking for this line
        [...functions.map(toFunctionData), ...onames.map(toFunctionData)]
        .sort((a, b) => a.name.localeCompare(b.name));
</script>