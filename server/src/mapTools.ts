import { Message } from "./dbc/message";

export function replacer(key: any, value: any) {
    if(value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}

export function reviver(key: any, value: any) {
    if(value !== null) {
        console.log(value.dataType);
        if (value.dataType === 'Map') {
            var map = new Map(value.value);
            console.log(typeof map.values().next())
            console.log(map);
            return new Map(value.value);
        }
    }
    return value;
}
