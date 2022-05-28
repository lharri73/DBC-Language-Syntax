/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 271:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * Copyright (C) 2021 Landon Harris
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html>.
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeDef = exports.Attribute = void 0;
class Attribute {
    constructor(name, objectType, value) {
        this.name = name;
        this.type = objectType;
        this.value = value;
        this.clsType = "attribute";
    }
}
exports.Attribute = Attribute;
class AttributeDef {
    constructor(name, objType, valType) {
        this.name = name;
        this.objType = objType;
        this.valType = valType;
        this.clsType = "attributeDef";
    }
}
exports.AttributeDef = AttributeDef;


/***/ }),

/***/ 761:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * Copyright (C) 2021 Landon Harris
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html>.
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Database = void 0;
;
class Database {
    constructor() {
        this.messages = new Map();
        this.valTables = new Map();
        this.version = "";
        this.symbols = [];
        this.parseErrors = [];
        this.bitTiming = {
            baudRate: -1,
            register_1: -1,
            register_2: -1
        };
        this.nodes = new Map();
        this.environmentVariables = new Map();
        this.signalTypes = new Map();
        this.comment = "";
        this.attrDefs = new Map();
        this.attributes = new Map();
        this.fileName = "";
        this.type = "database";
    }
}
exports.Database = Database;
Database.identifier = "Database";


/***/ }),

/***/ 7:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * Copyright (C) 2021 Landon Harris
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html>.
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Node = void 0;
class Node {
    constructor(name) {
        this.name = name;
        this.comment = "";
        this.attributes = new Map();
        this.clsType = "node";
    }
}
exports.Node = Node;


/***/ }),

/***/ 237:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * Copyright (C) 2021 Landon Harris
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html>.
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DBCError = void 0;
var conditionType;
(function (conditionType) {
    conditionType[conditionType["noCondition"] = 0] = "noCondition";
    conditionType[conditionType["mapHas"] = 1] = "mapHas";
})(conditionType || (conditionType = {}));
class DBCError {
    constructor(whence, what, type, // 0: warning, 1: error
    token = "") {
        this.whence = whence;
        this.what = what;
        this.type = type;
        this.token = token;
        this.hasCondition = false;
        this.condition = conditionType.noCondition;
        this.mapVal = null;
        this.key = null;
    }
    evalCondition() {
        // returns false if error needs to be added
        if (!this.hasCondition)
            return false;
        switch (this.condition) {
            case conditionType.noCondition:
                return false;
            case conditionType.mapHas:
                return this.evalMapCondition();
            default:
                break;
        }
    }
    addMapCondition(mapVal, key) {
        this.mapVal = mapVal;
        this.key = key;
        this.condition = conditionType.mapHas;
        this.hasCondition = true;
    }
    evalMapCondition() {
        if (this.mapVal === null || this.key === null)
            // no condition set. unconditional error, so always add
            return false;
        else if (this.mapVal === undefined)
            // map doest exist so there's no way the key is in it. 
            return false;
        else {
            // console.log("checking map condition", this.mapVal, this.key, this.mapVal.has(this.key));
            if (this.mapVal.has(this.key))
                return true;
            else
                return false;
        }
    }
    isMapCondition() {
        return this.condition == conditionType.mapHas;
    }
}
exports.DBCError = DBCError;


/***/ }),

/***/ 276:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * Copyright (C) 2021 Landon Harris
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html>.
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnvironmentVariable = void 0;
class EnvironmentVariable {
    constructor() {
        this.name = "";
        this.type = 2;
        this.min = -1;
        this.max = 0;
        this.unit = "";
        this.initialVal = 0;
        this.id = 0;
        this.transmitters = [];
        this.valueDescriptions = new Map();
        this.dataSize = 0; // used when ENVVAR_DATA is present
        this.comment = "";
        this.attributes = new Map();
        this.clsType = "environmentVariable";
    }
}
exports.EnvironmentVariable = EnvironmentVariable;


/***/ }),

/***/ 780:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * Copyright (C) 2021 Landon Harris
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html>.
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Message = void 0;
class Message {
    constructor(endLineNum, Id, Name, Size, Transmitter, Signals) {
        this.id = Id;
        this.name = Name;
        this.size = Size;
        this.transmitter = Transmitter;
        this.signals = Signals;
        this.comment = "";
        this.transmitters = [];
        this.signalGroups = new Map();
        this.attributes = new Map();
        this.endNum = endLineNum;
        this.clsType = "message";
    }
    get lineNum() {
        return this.endNum - this.signals.size;
    }
    represent() {
        var hex = this.id.toString(16).padStart(3, "000").toUpperCase();
        var dec = this.id.toString(10).padStart(4, "0000");
        return `0x${hex} (${dec}) ${this.name}`;
    }
}
exports.Message = Message;


/***/ }),

/***/ 730:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * Copyright (C) 2021 Landon Harris
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html>.
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignalGroup = exports.SignalType = exports.Signal = void 0;
class Signal {
    constructor(lineNo, Name, Start, Size, Order, Type, Factor, Offset, Min, Max, Unit, Receivers) {
        this.name = Name;
        this.startBit = Start;
        this.bitSize = Size;
        this.byteOrder = Order;
        this.valueType = Type;
        this.factor = Factor;
        this.offset = Offset;
        this.minimum = Min;
        this.maximum = Max;
        this.unit = Unit;
        this.receivers = Receivers;
        this.valTable = null;
        this.comment = "";
        this.attributes = new Map();
        this.lineNum = lineNo;
        this.clsType = "signal";
    }
}
exports.Signal = Signal;
class SignalType {
    constructor(name, size, byteOrder, valueType, factor, offset, min, max, unit, defaultVal, valTable) {
        this.name = name;
        this.size = size;
        this.byteOrder = byteOrder;
        this.valueType = valueType;
        this.factor = factor;
        this.offset = offset;
        this.minimum = min;
        this.maximum = max;
        this.unit = unit;
        this.default = defaultVal;
        this.valTable = valTable;
        this.clsType = "signalType";
    }
}
exports.SignalType = SignalType;
class SignalGroup {
    constructor() {
        this.messageId = 0;
        this.name = "";
        this.repetitions = 0;
        this.signals = [];
        this.clsType = "signalGroup";
    }
}
exports.SignalGroup = SignalGroup;


/***/ }),

/***/ 112:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * Copyright (C) 2021 Landon Harris
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html>.
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValueType = exports.ValTable = void 0;
class ValTable {
    constructor(name) {
        this.name = name;
        this.descriptions = new Map();
        this.clsType = "valTable";
    }
}
exports.ValTable = ValTable;
class ValueType {
    constructor(type) {
        this.type = type;
        this.min = 0;
        this.max = 0;
        this.enumVals = [];
    }
}
exports.ValueType = ValueType;


/***/ }),

/***/ 164:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * Copyright (C) 2022 Landon Harris
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html>.
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeDb = exports.encodeDb = exports.extensionCodec = void 0;
const msgpack_1 = __webpack_require__(676);
const db_1 = __webpack_require__(761);
const message_1 = __webpack_require__(780);
const dbcNode_1 = __webpack_require__(7);
const valtable_1 = __webpack_require__(112);
const attributes_1 = __webpack_require__(271);
const ev_1 = __webpack_require__(276);
const signal_1 = __webpack_require__(730);
const b64 = __webpack_require__(575);
// DBCError elided
exports.extensionCodec = new msgpack_1.ExtensionCodec();
// Attribute
exports.extensionCodec.register({
    type: 2,
    encode: (input) => {
        if ((input === null || input === void 0 ? void 0 : input.clsType) == "attribute") {
            let object = input;
            var name = msgpack_1.encode(object.name, { extensionCodec: exports.extensionCodec });
            var type = msgpack_1.encode(object.type, { extensionCodec: exports.extensionCodec });
            var value = msgpack_1.encode(object.value, { extensionCodec: exports.extensionCodec });
            return msgpack_1.encode([name, type, value], { extensionCodec: exports.extensionCodec });
        }
        else {
            return null;
        }
    },
    decode: (data) => {
        const array = msgpack_1.decode(data, { extensionCodec: exports.extensionCodec });
        return new attributes_1.Attribute(msgpack_1.decode(array[0], { extensionCodec: exports.extensionCodec }), msgpack_1.decode(array[1], { extensionCodec: exports.extensionCodec }), msgpack_1.decode(array[2], { extensionCodec: exports.extensionCodec }));
    }
});
// AttributeDef
exports.extensionCodec.register({
    type: 3,
    encode: (input) => {
        if ((input === null || input === void 0 ? void 0 : input.clsType) == "attributeDef") {
            let object = input;
            var name = msgpack_1.encode(object.name, { extensionCodec: exports.extensionCodec });
            var type = msgpack_1.encode(object.objType, { extensionCodec: exports.extensionCodec });
            var value = msgpack_1.encode(object.valType, { extensionCodec: exports.extensionCodec });
            return msgpack_1.encode([name, type, value], { extensionCodec: exports.extensionCodec });
        }
        else
            return null;
    },
    decode: (data) => {
        const array = msgpack_1.decode(data, { extensionCodec: exports.extensionCodec });
        return new attributes_1.AttributeDef(msgpack_1.decode(array[0], { extensionCodec: exports.extensionCodec }), msgpack_1.decode(array[1], { extensionCodec: exports.extensionCodec }), msgpack_1.decode(array[2], { extensionCodec: exports.extensionCodec }));
    }
});
// Node
exports.extensionCodec.register({
    type: 4,
    encode: (input) => {
        if ((input === null || input === void 0 ? void 0 : input.clsType) == "node") {
            let object = input;
            var name = msgpack_1.encode(object.name, { extensionCodec: exports.extensionCodec });
            var comment = msgpack_1.encode(object.comment, { extensionCodec: exports.extensionCodec });
            var attributes = msgpack_1.encode(object.attributes, { extensionCodec: exports.extensionCodec });
            return msgpack_1.encode([name, comment, attributes], { extensionCodec: exports.extensionCodec });
        }
        else
            return null;
    },
    decode: (data) => {
        const array = msgpack_1.decode(data, { extensionCodec: exports.extensionCodec });
        var ret = new dbcNode_1.Node(msgpack_1.decode(array[0], { extensionCodec: exports.extensionCodec }));
        ret.comment = msgpack_1.decode(array[1], { extensionCodec: exports.extensionCodec });
        ret.attributes = msgpack_1.decode(array[2], { extensionCodec: exports.extensionCodec });
        return ret;
    }
});
// Environment Variable
exports.extensionCodec.register({
    type: 5,
    encode: (input) => {
        if ((input === null || input === void 0 ? void 0 : input.clsType) == "environmentVariable") {
            let object = input;
            var name = msgpack_1.encode(object.name, { extensionCodec: exports.extensionCodec });
            var type = msgpack_1.encode(object.type, { extensionCodec: exports.extensionCodec });
            var min = msgpack_1.encode(object.min, { extensionCodec: exports.extensionCodec });
            var max = msgpack_1.encode(object.max, { extensionCodec: exports.extensionCodec });
            var unit = msgpack_1.encode(object.unit, { extensionCodec: exports.extensionCodec });
            var initialVal = msgpack_1.encode(object.initialVal, { extensionCodec: exports.extensionCodec });
            var id = msgpack_1.encode(object.id, { extensionCodec: exports.extensionCodec });
            var transmitters = msgpack_1.encode(object.transmitters, { extensionCodec: exports.extensionCodec });
            var valueDescriptions = msgpack_1.encode(object.valueDescriptions, { extensionCodec: exports.extensionCodec });
            var dataSize = msgpack_1.encode(object.dataSize, { extensionCodec: exports.extensionCodec });
            var comment = msgpack_1.encode(object.comment, { extensionCodec: exports.extensionCodec });
            var attributes = msgpack_1.encode(object.attributes, { extensionCodec: exports.extensionCodec });
            return (msgpack_1.encode([name, type, min, max, unit, initialVal, id, transmitters, valueDescriptions, dataSize, comment, attributes]));
        }
        else
            return null;
    },
    decode: (data) => {
        const array = msgpack_1.decode(data, { extensionCodec: exports.extensionCodec });
        var ret = new ev_1.EnvironmentVariable();
        ret.name = msgpack_1.decode(array[0], { extensionCodec: exports.extensionCodec });
        ret.type = msgpack_1.decode(array[1], { extensionCodec: exports.extensionCodec });
        ret.min = msgpack_1.decode(array[2], { extensionCodec: exports.extensionCodec });
        ret.max = msgpack_1.decode(array[3], { extensionCodec: exports.extensionCodec });
        ret.unit = msgpack_1.decode(array[4], { extensionCodec: exports.extensionCodec });
        ret.initialVal = msgpack_1.decode(array[5], { extensionCodec: exports.extensionCodec });
        ret.id = msgpack_1.decode(array[6], { extensionCodec: exports.extensionCodec });
        ret.transmitters = msgpack_1.decode(array[7], { extensionCodec: exports.extensionCodec });
        ret.dataSize = msgpack_1.decode(array[8], { extensionCodec: exports.extensionCodec });
        ret.comment = msgpack_1.decode(array[9], { extensionCodec: exports.extensionCodec });
        ret.attributes = msgpack_1.decode(array[10], { extensionCodec: exports.extensionCodec });
        return ret;
    }
});
// message
exports.extensionCodec.register({
    type: 6,
    encode: (input) => {
        if ((input === null || input === void 0 ? void 0 : input.clsType) == "message") {
            let object = input;
            const id = msgpack_1.encode(object.id, { extensionCodec: exports.extensionCodec });
            const name = msgpack_1.encode(object.name, { extensionCodec: exports.extensionCodec });
            const size = msgpack_1.encode(object.size, { extensionCodec: exports.extensionCodec });
            const transmitter = msgpack_1.encode(object.transmitter, { extensionCodec: exports.extensionCodec });
            const transmitters = msgpack_1.encode(object.transmitters, { extensionCodec: exports.extensionCodec });
            const signals = msgpack_1.encode(object.signals, { extensionCodec: exports.extensionCodec });
            const comment = msgpack_1.encode(object.comment, { extensionCodec: exports.extensionCodec });
            const signalGroups = msgpack_1.encode(object.signalGroups, { extensionCodec: exports.extensionCodec });
            const attributes = msgpack_1.encode(object.attributes, { extensionCodec: exports.extensionCodec });
            return msgpack_1.encode([id, name, size, transmitter, transmitters, signals, comment, signalGroups, attributes], { extensionCodec: exports.extensionCodec });
        }
        else
            return null;
    },
    decode: (data) => {
        const array = msgpack_1.decode(data, { extensionCodec: exports.extensionCodec });
        var ret = new message_1.Message(0, // endLineNum
        msgpack_1.decode(array[0], { extensionCodec: exports.extensionCodec }), // id
        msgpack_1.decode(array[1], { extensionCodec: exports.extensionCodec }), // name
        msgpack_1.decode(array[2], { extensionCodec: exports.extensionCodec }), // size
        msgpack_1.decode(array[3], { extensionCodec: exports.extensionCodec }), // transmitter
        msgpack_1.decode(array[5], { extensionCodec: exports.extensionCodec }) // signals
        );
        ret.transmitters = msgpack_1.decode(array[4], { extensionCodec: exports.extensionCodec });
        ret.comment = msgpack_1.decode(array[6], { extensionCodec: exports.extensionCodec });
        ret.signalGroups = msgpack_1.decode(array[7], { extensionCodec: exports.extensionCodec });
        ret.attributes = msgpack_1.decode(array[8], { extensionCodec: exports.extensionCodec });
        return ret;
    }
});
// signal
exports.extensionCodec.register({
    type: 7,
    encode: (input) => {
        if ((input === null || input === void 0 ? void 0 : input.clsType) == "signal") {
            let object = input;
            const name = msgpack_1.encode(object.name, { extensionCodec: exports.extensionCodec });
            const startBit = msgpack_1.encode(object.startBit, { extensionCodec: exports.extensionCodec });
            const bitSize = msgpack_1.encode(object.bitSize, { extensionCodec: exports.extensionCodec });
            const byteOrder = msgpack_1.encode(object.byteOrder, { extensionCodec: exports.extensionCodec });
            const valueType = msgpack_1.encode(object.valueType, { extensionCodec: exports.extensionCodec });
            const factor = msgpack_1.encode(object.factor, { extensionCodec: exports.extensionCodec });
            const offset = msgpack_1.encode(object.offset, { extensionCodec: exports.extensionCodec });
            const minimum = msgpack_1.encode(object.minimum, { extensionCodec: exports.extensionCodec });
            const maximum = msgpack_1.encode(object.maximum, { extensionCodec: exports.extensionCodec });
            const unit = msgpack_1.encode(object.unit, { extensionCodec: exports.extensionCodec });
            const receivers = msgpack_1.encode(object.receivers, { extensionCodec: exports.extensionCodec });
            const valTable = msgpack_1.encode(object.valTable, { extensionCodec: exports.extensionCodec });
            const comment = msgpack_1.encode(object.comment, { extensionCodec: exports.extensionCodec });
            const attributes = msgpack_1.encode(object.attributes, { extensionCodec: exports.extensionCodec });
            const lineNum = msgpack_1.encode(object.lineNum, { extensionCodec: exports.extensionCodec });
            return msgpack_1.encode([
                name,
                startBit,
                bitSize,
                byteOrder,
                valueType,
                factor,
                offset,
                minimum,
                maximum,
                unit,
                receivers,
                valTable,
                comment,
                attributes,
                lineNum
            ]);
        }
        else
            return null;
    },
    decode: (data) => {
        const array = msgpack_1.decode(data, { extensionCodec: exports.extensionCodec });
        var ret = new signal_1.Signal(msgpack_1.decode(array[14], { extensionCodec: exports.extensionCodec }), // lineNum
        msgpack_1.decode(array[0], { extensionCodec: exports.extensionCodec }), // name
        msgpack_1.decode(array[1], { extensionCodec: exports.extensionCodec }), // start
        msgpack_1.decode(array[2], { extensionCodec: exports.extensionCodec }), // size
        msgpack_1.decode(array[3], { extensionCodec: exports.extensionCodec }), // byte order
        msgpack_1.decode(array[4], { extensionCodec: exports.extensionCodec }), // valtype
        msgpack_1.decode(array[5], { extensionCodec: exports.extensionCodec }), // factor
        msgpack_1.decode(array[6], { extensionCodec: exports.extensionCodec }), // offset
        msgpack_1.decode(array[7], { extensionCodec: exports.extensionCodec }), // min
        msgpack_1.decode(array[8], { extensionCodec: exports.extensionCodec }), // max
        msgpack_1.decode(array[9], { extensionCodec: exports.extensionCodec }), // unit
        msgpack_1.decode(array[10], { extensionCodec: exports.extensionCodec }) // receivers
        );
        ret.valTable = msgpack_1.decode(array[11], { extensionCodec: exports.extensionCodec });
        ret.comment = msgpack_1.decode(array[12], { extensionCodec: exports.extensionCodec });
        ret.attributes = msgpack_1.decode(array[13], { extensionCodec: exports.extensionCodec });
        return ret;
    }
});
// signalType
exports.extensionCodec.register({
    type: 8,
    encode: (input) => {
        if ((input === null || input === void 0 ? void 0 : input.clsType) == "signalType") {
            let object = input;
            const name = msgpack_1.encode(object.name, { extensionCodec: exports.extensionCodec });
            const size = msgpack_1.encode(object.size, { extensionCodec: exports.extensionCodec });
            const byteOrder = msgpack_1.encode(object.byteOrder, { extensionCodec: exports.extensionCodec });
            const valueType = msgpack_1.encode(object.valueType, { extensionCodec: exports.extensionCodec });
            const factor = msgpack_1.encode(object.factor, { extensionCodec: exports.extensionCodec });
            const offset = msgpack_1.encode(object.offset, { extensionCodec: exports.extensionCodec });
            const minimum = msgpack_1.encode(object.minimum, { extensionCodec: exports.extensionCodec });
            const maximum = msgpack_1.encode(object.maximum, { extensionCodec: exports.extensionCodec });
            const unit = msgpack_1.encode(object.unit, { extensionCodec: exports.extensionCodec });
            const defaultVal = msgpack_1.encode(object.default, { extensionCodec: exports.extensionCodec });
            const valTable = msgpack_1.encode(object.valTable, { extensionCodec: exports.extensionCodec });
            return msgpack_1.encode([
                name,
                size,
                byteOrder,
                valueType,
                factor,
                offset,
                minimum,
                maximum,
                unit,
                defaultVal,
                valTable
            ]);
        }
        else
            return null;
    },
    decode: (data) => {
        const array = msgpack_1.decode(data, { extensionCodec: exports.extensionCodec });
        var ret = new signal_1.SignalType(msgpack_1.decode(array[0], { extensionCodec: exports.extensionCodec }), // name
        msgpack_1.decode(array[1], { extensionCodec: exports.extensionCodec }), // size
        msgpack_1.decode(array[2], { extensionCodec: exports.extensionCodec }), // byte order
        msgpack_1.decode(array[3], { extensionCodec: exports.extensionCodec }), // valtype
        msgpack_1.decode(array[4], { extensionCodec: exports.extensionCodec }), // factor
        msgpack_1.decode(array[5], { extensionCodec: exports.extensionCodec }), // offset
        msgpack_1.decode(array[6], { extensionCodec: exports.extensionCodec }), // min
        msgpack_1.decode(array[7], { extensionCodec: exports.extensionCodec }), // max
        msgpack_1.decode(array[8], { extensionCodec: exports.extensionCodec }), // unit
        msgpack_1.decode(array[9], { extensionCodec: exports.extensionCodec }), // defaultVal
        msgpack_1.decode(array[10], { extensionCodec: exports.extensionCodec }) // valTable
        );
        return ret;
    }
});
// SignalGroup
exports.extensionCodec.register({
    type: 9,
    encode: (input) => {
        if ((input === null || input === void 0 ? void 0 : input.clsType) == "signalGroup") {
            let object = input;
            return msgpack_1.encode([
                msgpack_1.encode(object.messageId, { extensionCodec: exports.extensionCodec }),
                msgpack_1.encode(object.name, { extensionCodec: exports.extensionCodec }),
                msgpack_1.encode(object.repetitions, { extensionCodec: exports.extensionCodec }),
                msgpack_1.encode(object.signals, { extensionCodec: exports.extensionCodec })
            ]);
        }
        else
            return null;
    },
    decode: (data) => {
        const array = msgpack_1.decode(data, { extensionCodec: exports.extensionCodec });
        var ret = new signal_1.SignalGroup();
        ret.messageId = msgpack_1.decode(array[0], { extensionCodec: exports.extensionCodec });
        ret.name = msgpack_1.decode(array[1], { extensionCodec: exports.extensionCodec });
        ret.repetitions = msgpack_1.decode(array[2], { extensionCodec: exports.extensionCodec });
        ret.signals = msgpack_1.decode(array[3], { extensionCodec: exports.extensionCodec });
        return ret;
    }
});
// ValTable
exports.extensionCodec.register({
    type: 10,
    encode: (input) => {
        if ((input === null || input === void 0 ? void 0 : input.clsType) == "valTable") {
            let object = input;
            return msgpack_1.encode([
                msgpack_1.encode(object.name, { extensionCodec: exports.extensionCodec }),
                msgpack_1.encode(object.descriptions, { extensionCodec: exports.extensionCodec })
            ]);
        }
        else
            return null;
    },
    decode: (data) => {
        const array = msgpack_1.decode(data, { extensionCodec: exports.extensionCodec });
        var ret = new valtable_1.ValTable(msgpack_1.decode(array[0], { extensionCodec: exports.extensionCodec }));
        ret.descriptions = msgpack_1.decode(array[1], { extensionCodec: exports.extensionCodec });
        return ret;
    }
});
// ValueType
exports.extensionCodec.register({
    type: 11,
    encode: (input) => {
        if ((input === null || input === void 0 ? void 0 : input.clsType) == "valueType") {
            let object = input;
            return msgpack_1.encode([
                msgpack_1.encode(object.type, { extensionCodec: exports.extensionCodec }),
                msgpack_1.encode(object.min, { extensionCodec: exports.extensionCodec }),
                msgpack_1.encode(object.max, { extensionCodec: exports.extensionCodec }),
                msgpack_1.encode(object.enumVals, { extensionCodec: exports.extensionCodec })
            ]);
        }
        else
            return null;
    },
    decode: (data) => {
        const array = msgpack_1.decode(data, { extensionCodec: exports.extensionCodec });
        var ret = new valtable_1.ValueType(msgpack_1.decode(array[0], { extensionCodec: exports.extensionCodec }));
        ret.min = msgpack_1.decode(array[1], { extensionCodec: exports.extensionCodec });
        ret.max = msgpack_1.decode(array[2], { extensionCodec: exports.extensionCodec });
        ret.enumVals = msgpack_1.decode(array[3], { extensionCodec: exports.extensionCodec });
        return ret;
    }
});
// Database
exports.extensionCodec.register({
    type: 1,
    encode: (input) => {
        if ((input === null || input === void 0 ? void 0 : input.type) == "database") {
            let object = input;
            var msgs = msgpack_1.encode(object.messages, { extensionCodec: exports.extensionCodec });
            var valTables = msgpack_1.encode(object.valTables, { extensionCodec: exports.extensionCodec });
            var nodes = msgpack_1.encode(object.nodes, { extensionCodec: exports.extensionCodec });
            var environmentVariables = msgpack_1.encode(object.environmentVariables, { extensionCodec: exports.extensionCodec });
            var signalTypes = msgpack_1.encode(object.signalTypes, { extensionCodec: exports.extensionCodec });
            var attrDefs = msgpack_1.encode(object.attrDefs, { extensionCodec: exports.extensionCodec });
            var attrs = msgpack_1.encode(object.attributes, { extensionCodec: exports.extensionCodec });
            var version = msgpack_1.encode(object.version, { extensionCodec: exports.extensionCodec });
            var comment = msgpack_1.encode(object.comment, { extensionCodec: exports.extensionCodec });
            var filename = msgpack_1.encode(object.fileName, { extensionCodec: exports.extensionCodec });
            return msgpack_1.encode([version, filename, comment, msgs, valTables, nodes, environmentVariables, signalTypes, attrDefs, attrs], { extensionCodec: exports.extensionCodec });
        }
        else {
            return null;
        }
    },
    decode: (data) => {
        const array = msgpack_1.decode(data, { extensionCodec: exports.extensionCodec });
        var ret = new db_1.Database();
        ret.version = msgpack_1.decode(array[0], { extensionCodec: exports.extensionCodec });
        ret.fileName = msgpack_1.decode(array[1], { extensionCodec: exports.extensionCodec });
        ret.comment = msgpack_1.decode(array[2], { extensionCodec: exports.extensionCodec });
        ret.messages = msgpack_1.decode(array[3], { extensionCodec: exports.extensionCodec });
        ret.valTables = msgpack_1.decode(array[4], { extensionCodec: exports.extensionCodec });
        ret.nodes = msgpack_1.decode(array[5], { extensionCodec: exports.extensionCodec });
        ret.environmentVariables = msgpack_1.decode(array[6], { extensionCodec: exports.extensionCodec });
        ret.signalTypes = msgpack_1.decode(array[7], { extensionCodec: exports.extensionCodec });
        ret.attrDefs = msgpack_1.decode(array[8], { extensionCodec: exports.extensionCodec });
        ret.attributes = msgpack_1.decode(array[9], { extensionCodec: exports.extensionCodec });
        return ret;
    }
});
exports.extensionCodec.register({
    type: 0,
    encode: (object) => {
        // 1. <for each key,value in the map
        // 2. encode the key and value
        // 3. put the key and value in a tmp array
        // 4. encode the tmp array
        // 5. push tmp into ret
        // 6. <go back to step 1>
        // 7. encode the ret array
        // 8. return ret
        if (object instanceof Map) {
            let ret = [];
            object.forEach((value, key) => {
                let tmp = [];
                tmp.push(msgpack_1.encode(key, { extensionCodec: exports.extensionCodec }));
                tmp.push(msgpack_1.encode(value, { extensionCodec: exports.extensionCodec }));
                ret.push(msgpack_1.encode(tmp, { extensionCodec: exports.extensionCodec }));
            });
            return msgpack_1.encode(ret, { extensionCodec: exports.extensionCodec });
        }
        else {
            return null;
        }
    },
    decode: (data) => {
        let decdBigArray = msgpack_1.decode(data, { extensionCodec: exports.extensionCodec });
        let ret = new Map();
        decdBigArray.forEach((value) => {
            let tmp = msgpack_1.decode(value, { extensionCodec: exports.extensionCodec });
            ret.set(msgpack_1.decode(tmp[0], { extensionCodec: exports.extensionCodec }), msgpack_1.decode(tmp[1], { extensionCodec: exports.extensionCodec }));
        });
        return ret;
    },
});
function encodeDb(db) {
    db.parseErrors = [];
    var encoded = msgpack_1.encode(db, { extensionCodec: exports.extensionCodec });
    if (encoded.byteLength * 8 / 6 > 0x1fffffe7) {
        // cannot create string longer than 512Mb
        console.error("String too large!");
        return "OVERLOADED STRING";
    }
    var encoded64 = b64.Base64.fromUint8Array(encoded);
    return encoded64;
}
exports.encodeDb = encodeDb;
function decodeDb(data) {
    if (data == "OVERLOADED STRING") {
        let ret = new db_1.Database();
        ret.version = "Too large for parsing.";
        return ret;
    }
    var u8array = b64.Base64.toUint8Array(data);
    var decoded = msgpack_1.decode(u8array, { extensionCodec: exports.extensionCodec });
    return decoded;
}
exports.decodeDb = decodeDb;


/***/ }),

/***/ 575:
/***/ (function(module) {



//
// THIS FILE IS AUTOMATICALLY GENERATED! DO NOT EDIT BY HAND!
//
;(function(global, factory) {
     true
        ? module.exports = factory()
        : 0;
}((typeof self !== 'undefined' ? self
        : typeof window !== 'undefined' ? window
        : typeof global !== 'undefined' ? global
        : this
), function() {
    'use strict';

/**
 *  base64.ts
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 *
 * @author Dan Kogai (https://github.com/dankogai)
 */
const version = '3.6.1';
/**
 * @deprecated use lowercase `version`.
 */
const VERSION = version;
const _hasatob = typeof atob === 'function';
const _hasbtoa = typeof btoa === 'function';
const _hasBuffer = typeof Buffer === 'function';
const _TD = typeof TextDecoder === 'function' ? new TextDecoder() : undefined;
const _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;
const b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const b64chs = [...b64ch];
const b64tab = ((a) => {
    let tab = {};
    a.forEach((c, i) => tab[c] = i);
    return tab;
})(b64chs);
const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
const _fromCC = String.fromCharCode.bind(String);
const _U8Afrom = typeof Uint8Array.from === 'function'
    ? Uint8Array.from.bind(Uint8Array)
    : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
const _mkUriSafe = (src) => src
    .replace(/[+\/]/g, (m0) => m0 == '+' ? '-' : '_')
    .replace(/=+$/m, '');
const _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, '');
/**
 * polyfill version of `btoa`
 */
const btoaPolyfill = (bin) => {
    // console.log('polyfilled');
    let u32, c0, c1, c2, asc = '';
    const pad = bin.length % 3;
    for (let i = 0; i < bin.length;) {
        if ((c0 = bin.charCodeAt(i++)) > 255 ||
            (c1 = bin.charCodeAt(i++)) > 255 ||
            (c2 = bin.charCodeAt(i++)) > 255)
            throw new TypeError('invalid character found');
        u32 = (c0 << 16) | (c1 << 8) | c2;
        asc += b64chs[u32 >> 18 & 63]
            + b64chs[u32 >> 12 & 63]
            + b64chs[u32 >> 6 & 63]
            + b64chs[u32 & 63];
    }
    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
/**
 * does what `window.btoa` of web browsers do.
 * @param {String} bin binary string
 * @returns {string} Base64-encoded string
 */
const _btoa = _hasbtoa ? (bin) => btoa(bin)
    : _hasBuffer ? (bin) => Buffer.from(bin, 'binary').toString('base64')
        : btoaPolyfill;
const _fromUint8Array = _hasBuffer
    ? (u8a) => Buffer.from(u8a).toString('base64')
    : (u8a) => {
        // cf. https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/12713326#12713326
        const maxargs = 0x1000;
        let strs = [];
        for (let i = 0, l = u8a.length; i < l; i += maxargs) {
            strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
        }
        return _btoa(strs.join(''));
    };
/**
 * converts a Uint8Array to a Base64 string.
 * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
 * @returns {string} Base64 string
 */
const fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const utob = (src: string) => unescape(encodeURIComponent(src));
// reverting good old fationed regexp
const cb_utob = (c) => {
    if (c.length < 2) {
        var cc = c.charCodeAt(0);
        return cc < 0x80 ? c
            : cc < 0x800 ? (_fromCC(0xc0 | (cc >>> 6))
                + _fromCC(0x80 | (cc & 0x3f)))
                : (_fromCC(0xe0 | ((cc >>> 12) & 0x0f))
                    + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
                    + _fromCC(0x80 | (cc & 0x3f)));
    }
    else {
        var cc = 0x10000
            + (c.charCodeAt(0) - 0xD800) * 0x400
            + (c.charCodeAt(1) - 0xDC00);
        return (_fromCC(0xf0 | ((cc >>> 18) & 0x07))
            + _fromCC(0x80 | ((cc >>> 12) & 0x3f))
            + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
            + _fromCC(0x80 | (cc & 0x3f)));
    }
};
const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-8 string
 * @returns {string} UTF-16 string
 */
const utob = (u) => u.replace(re_utob, cb_utob);
//
const _encode = _hasBuffer
    ? (s) => Buffer.from(s, 'utf8').toString('base64')
    : _TE
        ? (s) => _fromUint8Array(_TE.encode(s))
        : (s) => _btoa(utob(s));
/**
 * converts a UTF-8-encoded string to a Base64 string.
 * @param {boolean} [urlsafe] if `true` make the result URL-safe
 * @returns {string} Base64 string
 */
const encode = (src, urlsafe = false) => urlsafe
    ? _mkUriSafe(_encode(src))
    : _encode(src);
/**
 * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
 * @returns {string} Base64 string
 */
const encodeURI = (src) => encode(src, true);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const btou = (src: string) => decodeURIComponent(escape(src));
// reverting good old fationed regexp
const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
const cb_btou = (cccc) => {
    switch (cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                | ((0x3f & cccc.charCodeAt(1)) << 12)
                | ((0x3f & cccc.charCodeAt(2)) << 6)
                | (0x3f & cccc.charCodeAt(3)), offset = cp - 0x10000;
            return (_fromCC((offset >>> 10) + 0xD800)
                + _fromCC((offset & 0x3FF) + 0xDC00));
        case 3:
            return _fromCC(((0x0f & cccc.charCodeAt(0)) << 12)
                | ((0x3f & cccc.charCodeAt(1)) << 6)
                | (0x3f & cccc.charCodeAt(2)));
        default:
            return _fromCC(((0x1f & cccc.charCodeAt(0)) << 6)
                | (0x3f & cccc.charCodeAt(1)));
    }
};
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-16 string
 * @returns {string} UTF-8 string
 */
const btou = (b) => b.replace(re_btou, cb_btou);
/**
 * polyfill version of `atob`
 */
const atobPolyfill = (asc) => {
    // console.log('polyfilled');
    asc = asc.replace(/\s+/g, '');
    if (!b64re.test(asc))
        throw new TypeError('malformed base64.');
    asc += '=='.slice(2 - (asc.length & 3));
    let u24, bin = '', r1, r2;
    for (let i = 0; i < asc.length;) {
        u24 = b64tab[asc.charAt(i++)] << 18
            | b64tab[asc.charAt(i++)] << 12
            | (r1 = b64tab[asc.charAt(i++)]) << 6
            | (r2 = b64tab[asc.charAt(i++)]);
        bin += r1 === 64 ? _fromCC(u24 >> 16 & 255)
            : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255)
                : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
};
/**
 * does what `window.atob` of web browsers do.
 * @param {String} asc Base64-encoded string
 * @returns {string} binary string
 */
const _atob = _hasatob ? (asc) => atob(_tidyB64(asc))
    : _hasBuffer ? (asc) => Buffer.from(asc, 'base64').toString('binary')
        : atobPolyfill;
//
const _toUint8Array = _hasBuffer
    ? (a) => _U8Afrom(Buffer.from(a, 'base64'))
    : (a) => _U8Afrom(_atob(a), c => c.charCodeAt(0));
/**
 * converts a Base64 string to a Uint8Array.
 */
const toUint8Array = (a) => _toUint8Array(_unURI(a));
//
const _decode = _hasBuffer
    ? (a) => Buffer.from(a, 'base64').toString('utf8')
    : _TD
        ? (a) => _TD.decode(_toUint8Array(a))
        : (a) => btou(_atob(a));
const _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == '-' ? '+' : '/'));
/**
 * converts a Base64 string to a UTF-8 string.
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {string} UTF-8 string
 */
const decode = (src) => _decode(_unURI(src));
/**
 * check if a value is a valid Base64 string
 * @param {String} src a value to check
  */
const isValid = (src) => {
    if (typeof src !== 'string')
        return false;
    const s = src.replace(/\s+/g, '').replace(/=+$/, '');
    return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
//
const _noEnum = (v) => {
    return {
        value: v, enumerable: false, writable: true, configurable: true
    };
};
/**
 * extend String.prototype with relevant methods
 */
const extendString = function () {
    const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
    _add('fromBase64', function () { return decode(this); });
    _add('toBase64', function (urlsafe) { return encode(this, urlsafe); });
    _add('toBase64URI', function () { return encode(this, true); });
    _add('toBase64URL', function () { return encode(this, true); });
    _add('toUint8Array', function () { return toUint8Array(this); });
};
/**
 * extend Uint8Array.prototype with relevant methods
 */
const extendUint8Array = function () {
    const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
    _add('toBase64', function (urlsafe) { return fromUint8Array(this, urlsafe); });
    _add('toBase64URI', function () { return fromUint8Array(this, true); });
    _add('toBase64URL', function () { return fromUint8Array(this, true); });
};
/**
 * extend Builtin prototypes with relevant methods
 */
const extendBuiltins = () => {
    extendString();
    extendUint8Array();
};
const gBase64 = {
    version: version,
    VERSION: VERSION,
    atob: _atob,
    atobPolyfill: atobPolyfill,
    btoa: _btoa,
    btoaPolyfill: btoaPolyfill,
    fromBase64: decode,
    toBase64: encode,
    encode: encode,
    encodeURI: encodeURI,
    encodeURL: encodeURI,
    utob: utob,
    btou: btou,
    decode: decode,
    isValid: isValid,
    fromUint8Array: fromUint8Array,
    toUint8Array: toUint8Array,
    extendString: extendString,
    extendUint8Array: extendUint8Array,
    extendBuiltins: extendBuiltins,
};

    //
    // export Base64 to the namespace
    //
    // ES5 is yet to have Object.assign() that may make transpilers unhappy.
    // gBase64.Base64 = Object.assign({}, gBase64);
    gBase64.Base64 = {};
    Object.keys(gBase64).forEach(k => gBase64.Base64[k] = gBase64[k]);
    return gBase64;
}));




/***/ }),

/***/ 676:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "DataViewIndexOutOfBoundsError": () => (/* reexport */ DataViewIndexOutOfBoundsError),
  "DecodeError": () => (/* reexport */ DecodeError),
  "Decoder": () => (/* reexport */ Decoder),
  "EXT_TIMESTAMP": () => (/* reexport */ EXT_TIMESTAMP),
  "Encoder": () => (/* reexport */ Encoder),
  "ExtData": () => (/* reexport */ ExtData),
  "ExtensionCodec": () => (/* reexport */ ExtensionCodec),
  "decode": () => (/* reexport */ decode),
  "decodeArrayStream": () => (/* reexport */ decodeArrayStream),
  "decodeAsync": () => (/* reexport */ decodeAsync),
  "decodeMulti": () => (/* reexport */ decodeMulti),
  "decodeMultiStream": () => (/* reexport */ decodeMultiStream),
  "decodeStream": () => (/* reexport */ decodeStream),
  "decodeTimestampExtension": () => (/* reexport */ decodeTimestampExtension),
  "decodeTimestampToTimeSpec": () => (/* reexport */ decodeTimestampToTimeSpec),
  "encode": () => (/* reexport */ encode),
  "encodeDateToTimeSpec": () => (/* reexport */ encodeDateToTimeSpec),
  "encodeTimeSpecToTimestamp": () => (/* reexport */ encodeTimeSpecToTimestamp),
  "encodeTimestampExtension": () => (/* reexport */ encodeTimestampExtension)
});

;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/utils/int.mjs
// Integer Utility
var UINT32_MAX = 4294967295;
// DataView extension to handle int64 / uint64,
// where the actual range is 53-bits integer (a.k.a. safe integer)
function setUint64(view, offset, value) {
    var high = value / 4294967296;
    var low = value; // high bits are truncated by DataView
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
}
function setInt64(view, offset, value) {
    var high = Math.floor(value / 4294967296);
    var low = value; // high bits are truncated by DataView
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
}
function getInt64(view, offset) {
    var high = view.getInt32(offset);
    var low = view.getUint32(offset + 4);
    return high * 4294967296 + low;
}
function getUint64(view, offset) {
    var high = view.getUint32(offset);
    var low = view.getUint32(offset + 4);
    return high * 4294967296 + low;
}
//# sourceMappingURL=int.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/utils/utf8.mjs

var TEXT_ENCODING_AVAILABLE = (typeof process === "undefined" || process.env["TEXT_ENCODING"] !== "never") &&
    typeof TextEncoder !== "undefined" &&
    typeof TextDecoder !== "undefined";
function utf8Count(str) {
    var strLength = str.length;
    var byteLength = 0;
    var pos = 0;
    while (pos < strLength) {
        var value = str.charCodeAt(pos++);
        if ((value & 0xffffff80) === 0) {
            // 1-byte
            byteLength++;
            continue;
        }
        else if ((value & 0xfffff800) === 0) {
            // 2-bytes
            byteLength += 2;
        }
        else {
            // handle surrogate pair
            if (value >= 0xd800 && value <= 0xdbff) {
                // high surrogate
                if (pos < strLength) {
                    var extra = str.charCodeAt(pos);
                    if ((extra & 0xfc00) === 0xdc00) {
                        ++pos;
                        value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
                    }
                }
            }
            if ((value & 0xffff0000) === 0) {
                // 3-byte
                byteLength += 3;
            }
            else {
                // 4-byte
                byteLength += 4;
            }
        }
    }
    return byteLength;
}
function utf8EncodeJs(str, output, outputOffset) {
    var strLength = str.length;
    var offset = outputOffset;
    var pos = 0;
    while (pos < strLength) {
        var value = str.charCodeAt(pos++);
        if ((value & 0xffffff80) === 0) {
            // 1-byte
            output[offset++] = value;
            continue;
        }
        else if ((value & 0xfffff800) === 0) {
            // 2-bytes
            output[offset++] = ((value >> 6) & 0x1f) | 0xc0;
        }
        else {
            // handle surrogate pair
            if (value >= 0xd800 && value <= 0xdbff) {
                // high surrogate
                if (pos < strLength) {
                    var extra = str.charCodeAt(pos);
                    if ((extra & 0xfc00) === 0xdc00) {
                        ++pos;
                        value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
                    }
                }
            }
            if ((value & 0xffff0000) === 0) {
                // 3-byte
                output[offset++] = ((value >> 12) & 0x0f) | 0xe0;
                output[offset++] = ((value >> 6) & 0x3f) | 0x80;
            }
            else {
                // 4-byte
                output[offset++] = ((value >> 18) & 0x07) | 0xf0;
                output[offset++] = ((value >> 12) & 0x3f) | 0x80;
                output[offset++] = ((value >> 6) & 0x3f) | 0x80;
            }
        }
        output[offset++] = (value & 0x3f) | 0x80;
    }
}
var sharedTextEncoder = TEXT_ENCODING_AVAILABLE ? new TextEncoder() : undefined;
var TEXT_ENCODER_THRESHOLD = !TEXT_ENCODING_AVAILABLE
    ? UINT32_MAX
    : typeof process !== "undefined" && process.env["TEXT_ENCODING"] !== "force"
        ? 200
        : 0;
function utf8EncodeTEencode(str, output, outputOffset) {
    output.set(sharedTextEncoder.encode(str), outputOffset);
}
function utf8EncodeTEencodeInto(str, output, outputOffset) {
    sharedTextEncoder.encodeInto(str, output.subarray(outputOffset));
}
var utf8EncodeTE = (sharedTextEncoder === null || sharedTextEncoder === void 0 ? void 0 : sharedTextEncoder.encodeInto) ? utf8EncodeTEencodeInto : utf8EncodeTEencode;
var CHUNK_SIZE = 4096;
function utf8DecodeJs(bytes, inputOffset, byteLength) {
    var offset = inputOffset;
    var end = offset + byteLength;
    var units = [];
    var result = "";
    while (offset < end) {
        var byte1 = bytes[offset++];
        if ((byte1 & 0x80) === 0) {
            // 1 byte
            units.push(byte1);
        }
        else if ((byte1 & 0xe0) === 0xc0) {
            // 2 bytes
            var byte2 = bytes[offset++] & 0x3f;
            units.push(((byte1 & 0x1f) << 6) | byte2);
        }
        else if ((byte1 & 0xf0) === 0xe0) {
            // 3 bytes
            var byte2 = bytes[offset++] & 0x3f;
            var byte3 = bytes[offset++] & 0x3f;
            units.push(((byte1 & 0x1f) << 12) | (byte2 << 6) | byte3);
        }
        else if ((byte1 & 0xf8) === 0xf0) {
            // 4 bytes
            var byte2 = bytes[offset++] & 0x3f;
            var byte3 = bytes[offset++] & 0x3f;
            var byte4 = bytes[offset++] & 0x3f;
            var unit = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0c) | (byte3 << 0x06) | byte4;
            if (unit > 0xffff) {
                unit -= 0x10000;
                units.push(((unit >>> 10) & 0x3ff) | 0xd800);
                unit = 0xdc00 | (unit & 0x3ff);
            }
            units.push(unit);
        }
        else {
            units.push(byte1);
        }
        if (units.length >= CHUNK_SIZE) {
            result += String.fromCharCode.apply(String, units);
            units.length = 0;
        }
    }
    if (units.length > 0) {
        result += String.fromCharCode.apply(String, units);
    }
    return result;
}
var sharedTextDecoder = TEXT_ENCODING_AVAILABLE ? new TextDecoder() : null;
var TEXT_DECODER_THRESHOLD = !TEXT_ENCODING_AVAILABLE
    ? UINT32_MAX
    : typeof process !== "undefined" && process.env["TEXT_DECODER"] !== "force"
        ? 200
        : 0;
function utf8DecodeTD(bytes, inputOffset, byteLength) {
    var stringBytes = bytes.subarray(inputOffset, inputOffset + byteLength);
    return sharedTextDecoder.decode(stringBytes);
}
//# sourceMappingURL=utf8.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/ExtData.mjs
/**
 * ExtData is used to handle Extension Types that are not registered to ExtensionCodec.
 */
var ExtData = /** @class */ (function () {
    function ExtData(type, data) {
        this.type = type;
        this.data = data;
    }
    return ExtData;
}());

//# sourceMappingURL=ExtData.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/DecodeError.mjs
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DecodeError = /** @class */ (function (_super) {
    __extends(DecodeError, _super);
    function DecodeError(message) {
        var _this = _super.call(this, message) || this;
        // fix the prototype chain in a cross-platform way
        var proto = Object.create(DecodeError.prototype);
        Object.setPrototypeOf(_this, proto);
        Object.defineProperty(_this, "name", {
            configurable: true,
            enumerable: false,
            value: DecodeError.name,
        });
        return _this;
    }
    return DecodeError;
}(Error));

//# sourceMappingURL=DecodeError.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/timestamp.mjs
// https://github.com/msgpack/msgpack/blob/master/spec.md#timestamp-extension-type


var EXT_TIMESTAMP = -1;
var TIMESTAMP32_MAX_SEC = 0x100000000 - 1; // 32-bit unsigned int
var TIMESTAMP64_MAX_SEC = 0x400000000 - 1; // 34-bit unsigned int
function encodeTimeSpecToTimestamp(_a) {
    var sec = _a.sec, nsec = _a.nsec;
    if (sec >= 0 && nsec >= 0 && sec <= TIMESTAMP64_MAX_SEC) {
        // Here sec >= 0 && nsec >= 0
        if (nsec === 0 && sec <= TIMESTAMP32_MAX_SEC) {
            // timestamp 32 = { sec32 (unsigned) }
            var rv = new Uint8Array(4);
            var view = new DataView(rv.buffer);
            view.setUint32(0, sec);
            return rv;
        }
        else {
            // timestamp 64 = { nsec30 (unsigned), sec34 (unsigned) }
            var secHigh = sec / 0x100000000;
            var secLow = sec & 0xffffffff;
            var rv = new Uint8Array(8);
            var view = new DataView(rv.buffer);
            // nsec30 | secHigh2
            view.setUint32(0, (nsec << 2) | (secHigh & 0x3));
            // secLow32
            view.setUint32(4, secLow);
            return rv;
        }
    }
    else {
        // timestamp 96 = { nsec32 (unsigned), sec64 (signed) }
        var rv = new Uint8Array(12);
        var view = new DataView(rv.buffer);
        view.setUint32(0, nsec);
        setInt64(view, 4, sec);
        return rv;
    }
}
function encodeDateToTimeSpec(date) {
    var msec = date.getTime();
    var sec = Math.floor(msec / 1e3);
    var nsec = (msec - sec * 1e3) * 1e6;
    // Normalizes { sec, nsec } to ensure nsec is unsigned.
    var nsecInSec = Math.floor(nsec / 1e9);
    return {
        sec: sec + nsecInSec,
        nsec: nsec - nsecInSec * 1e9,
    };
}
function encodeTimestampExtension(object) {
    if (object instanceof Date) {
        var timeSpec = encodeDateToTimeSpec(object);
        return encodeTimeSpecToTimestamp(timeSpec);
    }
    else {
        return null;
    }
}
function decodeTimestampToTimeSpec(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    // data may be 32, 64, or 96 bits
    switch (data.byteLength) {
        case 4: {
            // timestamp 32 = { sec32 }
            var sec = view.getUint32(0);
            var nsec = 0;
            return { sec: sec, nsec: nsec };
        }
        case 8: {
            // timestamp 64 = { nsec30, sec34 }
            var nsec30AndSecHigh2 = view.getUint32(0);
            var secLow32 = view.getUint32(4);
            var sec = (nsec30AndSecHigh2 & 0x3) * 0x100000000 + secLow32;
            var nsec = nsec30AndSecHigh2 >>> 2;
            return { sec: sec, nsec: nsec };
        }
        case 12: {
            // timestamp 96 = { nsec32 (unsigned), sec64 (signed) }
            var sec = getInt64(view, 4);
            var nsec = view.getUint32(0);
            return { sec: sec, nsec: nsec };
        }
        default:
            throw new DecodeError("Unrecognized data size for timestamp (expected 4, 8, or 12): " + data.length);
    }
}
function decodeTimestampExtension(data) {
    var timeSpec = decodeTimestampToTimeSpec(data);
    return new Date(timeSpec.sec * 1e3 + timeSpec.nsec / 1e6);
}
var timestampExtension = {
    type: EXT_TIMESTAMP,
    encode: encodeTimestampExtension,
    decode: decodeTimestampExtension,
};
//# sourceMappingURL=timestamp.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/ExtensionCodec.mjs
// ExtensionCodec to handle MessagePack extensions


var ExtensionCodec = /** @class */ (function () {
    function ExtensionCodec() {
        // built-in extensions
        this.builtInEncoders = [];
        this.builtInDecoders = [];
        // custom extensions
        this.encoders = [];
        this.decoders = [];
        this.register(timestampExtension);
    }
    ExtensionCodec.prototype.register = function (_a) {
        var type = _a.type, encode = _a.encode, decode = _a.decode;
        if (type >= 0) {
            // custom extensions
            this.encoders[type] = encode;
            this.decoders[type] = decode;
        }
        else {
            // built-in extensions
            var index = 1 + type;
            this.builtInEncoders[index] = encode;
            this.builtInDecoders[index] = decode;
        }
    };
    ExtensionCodec.prototype.tryToEncode = function (object, context) {
        // built-in extensions
        for (var i = 0; i < this.builtInEncoders.length; i++) {
            var encodeExt = this.builtInEncoders[i];
            if (encodeExt != null) {
                var data = encodeExt(object, context);
                if (data != null) {
                    var type = -1 - i;
                    return new ExtData(type, data);
                }
            }
        }
        // custom extensions
        for (var i = 0; i < this.encoders.length; i++) {
            var encodeExt = this.encoders[i];
            if (encodeExt != null) {
                var data = encodeExt(object, context);
                if (data != null) {
                    var type = i;
                    return new ExtData(type, data);
                }
            }
        }
        if (object instanceof ExtData) {
            // to keep ExtData as is
            return object;
        }
        return null;
    };
    ExtensionCodec.prototype.decode = function (data, type, context) {
        var decodeExt = type < 0 ? this.builtInDecoders[-1 - type] : this.decoders[type];
        if (decodeExt) {
            return decodeExt(data, type, context);
        }
        else {
            // decode() does not fail, returns ExtData instead.
            return new ExtData(type, data);
        }
    };
    ExtensionCodec.defaultCodec = new ExtensionCodec();
    return ExtensionCodec;
}());

//# sourceMappingURL=ExtensionCodec.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/utils/typedArrays.mjs
function ensureUint8Array(buffer) {
    if (buffer instanceof Uint8Array) {
        return buffer;
    }
    else if (ArrayBuffer.isView(buffer)) {
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    else if (buffer instanceof ArrayBuffer) {
        return new Uint8Array(buffer);
    }
    else {
        // ArrayLike<number>
        return Uint8Array.from(buffer);
    }
}
function createDataView(buffer) {
    if (buffer instanceof ArrayBuffer) {
        return new DataView(buffer);
    }
    var bufferView = ensureUint8Array(buffer);
    return new DataView(bufferView.buffer, bufferView.byteOffset, bufferView.byteLength);
}
//# sourceMappingURL=typedArrays.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/Encoder.mjs




var DEFAULT_MAX_DEPTH = 100;
var DEFAULT_INITIAL_BUFFER_SIZE = 2048;
var Encoder = /** @class */ (function () {
    function Encoder(extensionCodec, context, maxDepth, initialBufferSize, sortKeys, forceFloat32, ignoreUndefined, forceIntegerToFloat) {
        if (extensionCodec === void 0) { extensionCodec = ExtensionCodec.defaultCodec; }
        if (context === void 0) { context = undefined; }
        if (maxDepth === void 0) { maxDepth = DEFAULT_MAX_DEPTH; }
        if (initialBufferSize === void 0) { initialBufferSize = DEFAULT_INITIAL_BUFFER_SIZE; }
        if (sortKeys === void 0) { sortKeys = false; }
        if (forceFloat32 === void 0) { forceFloat32 = false; }
        if (ignoreUndefined === void 0) { ignoreUndefined = false; }
        if (forceIntegerToFloat === void 0) { forceIntegerToFloat = false; }
        this.extensionCodec = extensionCodec;
        this.context = context;
        this.maxDepth = maxDepth;
        this.initialBufferSize = initialBufferSize;
        this.sortKeys = sortKeys;
        this.forceFloat32 = forceFloat32;
        this.ignoreUndefined = ignoreUndefined;
        this.forceIntegerToFloat = forceIntegerToFloat;
        this.pos = 0;
        this.view = new DataView(new ArrayBuffer(this.initialBufferSize));
        this.bytes = new Uint8Array(this.view.buffer);
    }
    Encoder.prototype.getUint8Array = function () {
        return this.bytes.subarray(0, this.pos);
    };
    Encoder.prototype.reinitializeState = function () {
        this.pos = 0;
    };
    Encoder.prototype.encode = function (object) {
        this.reinitializeState();
        this.doEncode(object, 1);
        return this.getUint8Array();
    };
    Encoder.prototype.doEncode = function (object, depth) {
        if (depth > this.maxDepth) {
            throw new Error("Too deep objects in depth " + depth);
        }
        if (object == null) {
            this.encodeNil();
        }
        else if (typeof object === "boolean") {
            this.encodeBoolean(object);
        }
        else if (typeof object === "number") {
            this.encodeNumber(object);
        }
        else if (typeof object === "string") {
            this.encodeString(object);
        }
        else {
            this.encodeObject(object, depth);
        }
    };
    Encoder.prototype.ensureBufferSizeToWrite = function (sizeToWrite) {
        var requiredSize = this.pos + sizeToWrite;
        if (this.view.byteLength < requiredSize) {
            this.resizeBuffer(requiredSize * 2);
        }
    };
    Encoder.prototype.resizeBuffer = function (newSize) {
        var newBuffer = new ArrayBuffer(newSize);
        var newBytes = new Uint8Array(newBuffer);
        var newView = new DataView(newBuffer);
        newBytes.set(this.bytes);
        this.view = newView;
        this.bytes = newBytes;
    };
    Encoder.prototype.encodeNil = function () {
        this.writeU8(0xc0);
    };
    Encoder.prototype.encodeBoolean = function (object) {
        if (object === false) {
            this.writeU8(0xc2);
        }
        else {
            this.writeU8(0xc3);
        }
    };
    Encoder.prototype.encodeNumber = function (object) {
        if (Number.isSafeInteger(object) && !this.forceIntegerToFloat) {
            if (object >= 0) {
                if (object < 0x80) {
                    // positive fixint
                    this.writeU8(object);
                }
                else if (object < 0x100) {
                    // uint 8
                    this.writeU8(0xcc);
                    this.writeU8(object);
                }
                else if (object < 0x10000) {
                    // uint 16
                    this.writeU8(0xcd);
                    this.writeU16(object);
                }
                else if (object < 0x100000000) {
                    // uint 32
                    this.writeU8(0xce);
                    this.writeU32(object);
                }
                else {
                    // uint 64
                    this.writeU8(0xcf);
                    this.writeU64(object);
                }
            }
            else {
                if (object >= -0x20) {
                    // negative fixint
                    this.writeU8(0xe0 | (object + 0x20));
                }
                else if (object >= -0x80) {
                    // int 8
                    this.writeU8(0xd0);
                    this.writeI8(object);
                }
                else if (object >= -0x8000) {
                    // int 16
                    this.writeU8(0xd1);
                    this.writeI16(object);
                }
                else if (object >= -0x80000000) {
                    // int 32
                    this.writeU8(0xd2);
                    this.writeI32(object);
                }
                else {
                    // int 64
                    this.writeU8(0xd3);
                    this.writeI64(object);
                }
            }
        }
        else {
            // non-integer numbers
            if (this.forceFloat32) {
                // float 32
                this.writeU8(0xca);
                this.writeF32(object);
            }
            else {
                // float 64
                this.writeU8(0xcb);
                this.writeF64(object);
            }
        }
    };
    Encoder.prototype.writeStringHeader = function (byteLength) {
        if (byteLength < 32) {
            // fixstr
            this.writeU8(0xa0 + byteLength);
        }
        else if (byteLength < 0x100) {
            // str 8
            this.writeU8(0xd9);
            this.writeU8(byteLength);
        }
        else if (byteLength < 0x10000) {
            // str 16
            this.writeU8(0xda);
            this.writeU16(byteLength);
        }
        else if (byteLength < 0x100000000) {
            // str 32
            this.writeU8(0xdb);
            this.writeU32(byteLength);
        }
        else {
            throw new Error("Too long string: " + byteLength + " bytes in UTF-8");
        }
    };
    Encoder.prototype.encodeString = function (object) {
        var maxHeaderSize = 1 + 4;
        var strLength = object.length;
        if (strLength > TEXT_ENCODER_THRESHOLD) {
            var byteLength = utf8Count(object);
            this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
            this.writeStringHeader(byteLength);
            utf8EncodeTE(object, this.bytes, this.pos);
            this.pos += byteLength;
        }
        else {
            var byteLength = utf8Count(object);
            this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
            this.writeStringHeader(byteLength);
            utf8EncodeJs(object, this.bytes, this.pos);
            this.pos += byteLength;
        }
    };
    Encoder.prototype.encodeObject = function (object, depth) {
        // try to encode objects with custom codec first of non-primitives
        var ext = this.extensionCodec.tryToEncode(object, this.context);
        if (ext != null) {
            this.encodeExtension(ext);
        }
        else if (Array.isArray(object)) {
            this.encodeArray(object, depth);
        }
        else if (ArrayBuffer.isView(object)) {
            this.encodeBinary(object);
        }
        else if (typeof object === "object") {
            this.encodeMap(object, depth);
        }
        else {
            // symbol, function and other special object come here unless extensionCodec handles them.
            throw new Error("Unrecognized object: " + Object.prototype.toString.apply(object));
        }
    };
    Encoder.prototype.encodeBinary = function (object) {
        var size = object.byteLength;
        if (size < 0x100) {
            // bin 8
            this.writeU8(0xc4);
            this.writeU8(size);
        }
        else if (size < 0x10000) {
            // bin 16
            this.writeU8(0xc5);
            this.writeU16(size);
        }
        else if (size < 0x100000000) {
            // bin 32
            this.writeU8(0xc6);
            this.writeU32(size);
        }
        else {
            throw new Error("Too large binary: " + size);
        }
        var bytes = ensureUint8Array(object);
        this.writeU8a(bytes);
    };
    Encoder.prototype.encodeArray = function (object, depth) {
        var size = object.length;
        if (size < 16) {
            // fixarray
            this.writeU8(0x90 + size);
        }
        else if (size < 0x10000) {
            // array 16
            this.writeU8(0xdc);
            this.writeU16(size);
        }
        else if (size < 0x100000000) {
            // array 32
            this.writeU8(0xdd);
            this.writeU32(size);
        }
        else {
            throw new Error("Too large array: " + size);
        }
        for (var _i = 0, object_1 = object; _i < object_1.length; _i++) {
            var item = object_1[_i];
            this.doEncode(item, depth + 1);
        }
    };
    Encoder.prototype.countWithoutUndefined = function (object, keys) {
        var count = 0;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (object[key] !== undefined) {
                count++;
            }
        }
        return count;
    };
    Encoder.prototype.encodeMap = function (object, depth) {
        var keys = Object.keys(object);
        if (this.sortKeys) {
            keys.sort();
        }
        var size = this.ignoreUndefined ? this.countWithoutUndefined(object, keys) : keys.length;
        if (size < 16) {
            // fixmap
            this.writeU8(0x80 + size);
        }
        else if (size < 0x10000) {
            // map 16
            this.writeU8(0xde);
            this.writeU16(size);
        }
        else if (size < 0x100000000) {
            // map 32
            this.writeU8(0xdf);
            this.writeU32(size);
        }
        else {
            throw new Error("Too large map object: " + size);
        }
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            var value = object[key];
            if (!(this.ignoreUndefined && value === undefined)) {
                this.encodeString(key);
                this.doEncode(value, depth + 1);
            }
        }
    };
    Encoder.prototype.encodeExtension = function (ext) {
        var size = ext.data.length;
        if (size === 1) {
            // fixext 1
            this.writeU8(0xd4);
        }
        else if (size === 2) {
            // fixext 2
            this.writeU8(0xd5);
        }
        else if (size === 4) {
            // fixext 4
            this.writeU8(0xd6);
        }
        else if (size === 8) {
            // fixext 8
            this.writeU8(0xd7);
        }
        else if (size === 16) {
            // fixext 16
            this.writeU8(0xd8);
        }
        else if (size < 0x100) {
            // ext 8
            this.writeU8(0xc7);
            this.writeU8(size);
        }
        else if (size < 0x10000) {
            // ext 16
            this.writeU8(0xc8);
            this.writeU16(size);
        }
        else if (size < 0x100000000) {
            // ext 32
            this.writeU8(0xc9);
            this.writeU32(size);
        }
        else {
            throw new Error("Too large extension object: " + size);
        }
        this.writeI8(ext.type);
        this.writeU8a(ext.data);
    };
    Encoder.prototype.writeU8 = function (value) {
        this.ensureBufferSizeToWrite(1);
        this.view.setUint8(this.pos, value);
        this.pos++;
    };
    Encoder.prototype.writeU8a = function (values) {
        var size = values.length;
        this.ensureBufferSizeToWrite(size);
        this.bytes.set(values, this.pos);
        this.pos += size;
    };
    Encoder.prototype.writeI8 = function (value) {
        this.ensureBufferSizeToWrite(1);
        this.view.setInt8(this.pos, value);
        this.pos++;
    };
    Encoder.prototype.writeU16 = function (value) {
        this.ensureBufferSizeToWrite(2);
        this.view.setUint16(this.pos, value);
        this.pos += 2;
    };
    Encoder.prototype.writeI16 = function (value) {
        this.ensureBufferSizeToWrite(2);
        this.view.setInt16(this.pos, value);
        this.pos += 2;
    };
    Encoder.prototype.writeU32 = function (value) {
        this.ensureBufferSizeToWrite(4);
        this.view.setUint32(this.pos, value);
        this.pos += 4;
    };
    Encoder.prototype.writeI32 = function (value) {
        this.ensureBufferSizeToWrite(4);
        this.view.setInt32(this.pos, value);
        this.pos += 4;
    };
    Encoder.prototype.writeF32 = function (value) {
        this.ensureBufferSizeToWrite(4);
        this.view.setFloat32(this.pos, value);
        this.pos += 4;
    };
    Encoder.prototype.writeF64 = function (value) {
        this.ensureBufferSizeToWrite(8);
        this.view.setFloat64(this.pos, value);
        this.pos += 8;
    };
    Encoder.prototype.writeU64 = function (value) {
        this.ensureBufferSizeToWrite(8);
        setUint64(this.view, this.pos, value);
        this.pos += 8;
    };
    Encoder.prototype.writeI64 = function (value) {
        this.ensureBufferSizeToWrite(8);
        setInt64(this.view, this.pos, value);
        this.pos += 8;
    };
    return Encoder;
}());

//# sourceMappingURL=Encoder.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/encode.mjs

var defaultEncodeOptions = {};
/**
 * It encodes `value` in the MessagePack format and
 * returns a byte buffer.
 *
 * The returned buffer is a slice of a larger `ArrayBuffer`, so you have to use its `#byteOffset` and `#byteLength` in order to convert it to another typed arrays including NodeJS `Buffer`.
 */
function encode(value, options) {
    if (options === void 0) { options = defaultEncodeOptions; }
    var encoder = new Encoder(options.extensionCodec, options.context, options.maxDepth, options.initialBufferSize, options.sortKeys, options.forceFloat32, options.ignoreUndefined, options.forceIntegerToFloat);
    return encoder.encode(value);
}
//# sourceMappingURL=encode.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/utils/prettyByte.mjs
function prettyByte(byte) {
    return (byte < 0 ? "-" : "") + "0x" + Math.abs(byte).toString(16).padStart(2, "0");
}
//# sourceMappingURL=prettyByte.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/CachedKeyDecoder.mjs

var DEFAULT_MAX_KEY_LENGTH = 16;
var DEFAULT_MAX_LENGTH_PER_KEY = 16;
var CachedKeyDecoder = /** @class */ (function () {
    function CachedKeyDecoder(maxKeyLength, maxLengthPerKey) {
        if (maxKeyLength === void 0) { maxKeyLength = DEFAULT_MAX_KEY_LENGTH; }
        if (maxLengthPerKey === void 0) { maxLengthPerKey = DEFAULT_MAX_LENGTH_PER_KEY; }
        this.maxKeyLength = maxKeyLength;
        this.maxLengthPerKey = maxLengthPerKey;
        this.hit = 0;
        this.miss = 0;
        // avoid `new Array(N)`, which makes a sparse array,
        // because a sparse array is typically slower than a non-sparse array.
        this.caches = [];
        for (var i = 0; i < this.maxKeyLength; i++) {
            this.caches.push([]);
        }
    }
    CachedKeyDecoder.prototype.canBeCached = function (byteLength) {
        return byteLength > 0 && byteLength <= this.maxKeyLength;
    };
    CachedKeyDecoder.prototype.find = function (bytes, inputOffset, byteLength) {
        var records = this.caches[byteLength - 1];
        FIND_CHUNK: for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
            var record = records_1[_i];
            var recordBytes = record.bytes;
            for (var j = 0; j < byteLength; j++) {
                if (recordBytes[j] !== bytes[inputOffset + j]) {
                    continue FIND_CHUNK;
                }
            }
            return record.str;
        }
        return null;
    };
    CachedKeyDecoder.prototype.store = function (bytes, value) {
        var records = this.caches[bytes.length - 1];
        var record = { bytes: bytes, str: value };
        if (records.length >= this.maxLengthPerKey) {
            // `records` are full!
            // Set `record` to an arbitrary position.
            records[(Math.random() * records.length) | 0] = record;
        }
        else {
            records.push(record);
        }
    };
    CachedKeyDecoder.prototype.decode = function (bytes, inputOffset, byteLength) {
        var cachedValue = this.find(bytes, inputOffset, byteLength);
        if (cachedValue != null) {
            this.hit++;
            return cachedValue;
        }
        this.miss++;
        var str = utf8DecodeJs(bytes, inputOffset, byteLength);
        // Ensure to copy a slice of bytes because the byte may be NodeJS Buffer and Buffer#slice() returns a reference to its internal ArrayBuffer.
        var slicedCopyOfBytes = Uint8Array.prototype.slice.call(bytes, inputOffset, inputOffset + byteLength);
        this.store(slicedCopyOfBytes, str);
        return str;
    };
    return CachedKeyDecoder;
}());

//# sourceMappingURL=CachedKeyDecoder.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/Decoder.mjs
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (undefined && undefined.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (undefined && undefined.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (undefined && undefined.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};







var isValidMapKeyType = function (key) {
    var keyType = typeof key;
    return keyType === "string" || keyType === "number";
};
var HEAD_BYTE_REQUIRED = -1;
var EMPTY_VIEW = new DataView(new ArrayBuffer(0));
var EMPTY_BYTES = new Uint8Array(EMPTY_VIEW.buffer);
// IE11: Hack to support IE11.
// IE11: Drop this hack and just use RangeError when IE11 is obsolete.
var DataViewIndexOutOfBoundsError = (function () {
    try {
        // IE11: The spec says it should throw RangeError,
        // IE11: but in IE11 it throws TypeError.
        EMPTY_VIEW.getInt8(0);
    }
    catch (e) {
        return e.constructor;
    }
    throw new Error("never reached");
})();
var MORE_DATA = new DataViewIndexOutOfBoundsError("Insufficient data");
var sharedCachedKeyDecoder = new CachedKeyDecoder();
var Decoder = /** @class */ (function () {
    function Decoder(extensionCodec, context, maxStrLength, maxBinLength, maxArrayLength, maxMapLength, maxExtLength, keyDecoder) {
        if (extensionCodec === void 0) { extensionCodec = ExtensionCodec.defaultCodec; }
        if (context === void 0) { context = undefined; }
        if (maxStrLength === void 0) { maxStrLength = UINT32_MAX; }
        if (maxBinLength === void 0) { maxBinLength = UINT32_MAX; }
        if (maxArrayLength === void 0) { maxArrayLength = UINT32_MAX; }
        if (maxMapLength === void 0) { maxMapLength = UINT32_MAX; }
        if (maxExtLength === void 0) { maxExtLength = UINT32_MAX; }
        if (keyDecoder === void 0) { keyDecoder = sharedCachedKeyDecoder; }
        this.extensionCodec = extensionCodec;
        this.context = context;
        this.maxStrLength = maxStrLength;
        this.maxBinLength = maxBinLength;
        this.maxArrayLength = maxArrayLength;
        this.maxMapLength = maxMapLength;
        this.maxExtLength = maxExtLength;
        this.keyDecoder = keyDecoder;
        this.totalPos = 0;
        this.pos = 0;
        this.view = EMPTY_VIEW;
        this.bytes = EMPTY_BYTES;
        this.headByte = HEAD_BYTE_REQUIRED;
        this.stack = [];
    }
    Decoder.prototype.reinitializeState = function () {
        this.totalPos = 0;
        this.headByte = HEAD_BYTE_REQUIRED;
        this.stack.length = 0;
        // view, bytes, and pos will be re-initialized in setBuffer()
    };
    Decoder.prototype.setBuffer = function (buffer) {
        this.bytes = ensureUint8Array(buffer);
        this.view = createDataView(this.bytes);
        this.pos = 0;
    };
    Decoder.prototype.appendBuffer = function (buffer) {
        if (this.headByte === HEAD_BYTE_REQUIRED && !this.hasRemaining(1)) {
            this.setBuffer(buffer);
        }
        else {
            var remainingData = this.bytes.subarray(this.pos);
            var newData = ensureUint8Array(buffer);
            // concat remainingData + newData
            var newBuffer = new Uint8Array(remainingData.length + newData.length);
            newBuffer.set(remainingData);
            newBuffer.set(newData, remainingData.length);
            this.setBuffer(newBuffer);
        }
    };
    Decoder.prototype.hasRemaining = function (size) {
        return this.view.byteLength - this.pos >= size;
    };
    Decoder.prototype.createExtraByteError = function (posToShow) {
        var _a = this, view = _a.view, pos = _a.pos;
        return new RangeError("Extra " + (view.byteLength - pos) + " of " + view.byteLength + " byte(s) found at buffer[" + posToShow + "]");
    };
    /**
     * @throws {DecodeError}
     * @throws {RangeError}
     */
    Decoder.prototype.decode = function (buffer) {
        this.reinitializeState();
        this.setBuffer(buffer);
        var object = this.doDecodeSync();
        if (this.hasRemaining(1)) {
            throw this.createExtraByteError(this.pos);
        }
        return object;
    };
    Decoder.prototype.decodeMulti = function (buffer) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this.reinitializeState();
                    this.setBuffer(buffer);
                    _a.label = 1;
                case 1:
                    if (!this.hasRemaining(1)) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.doDecodeSync()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    };
    Decoder.prototype.decodeAsync = function (stream) {
        var stream_1, stream_1_1;
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var decoded, object, buffer, e_1_1, _b, headByte, pos, totalPos;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        decoded = false;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, 7, 12]);
                        stream_1 = __asyncValues(stream);
                        _c.label = 2;
                    case 2: return [4 /*yield*/, stream_1.next()];
                    case 3:
                        if (!(stream_1_1 = _c.sent(), !stream_1_1.done)) return [3 /*break*/, 5];
                        buffer = stream_1_1.value;
                        if (decoded) {
                            throw this.createExtraByteError(this.totalPos);
                        }
                        this.appendBuffer(buffer);
                        try {
                            object = this.doDecodeSync();
                            decoded = true;
                        }
                        catch (e) {
                            if (!(e instanceof DataViewIndexOutOfBoundsError)) {
                                throw e; // rethrow
                            }
                            // fallthrough
                        }
                        this.totalPos += this.pos;
                        _c.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _c.trys.push([7, , 10, 11]);
                        if (!(stream_1_1 && !stream_1_1.done && (_a = stream_1.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(stream_1)];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        if (decoded) {
                            if (this.hasRemaining(1)) {
                                throw this.createExtraByteError(this.totalPos);
                            }
                            return [2 /*return*/, object];
                        }
                        _b = this, headByte = _b.headByte, pos = _b.pos, totalPos = _b.totalPos;
                        throw new RangeError("Insufficient data in parsing " + prettyByte(headByte) + " at " + totalPos + " (" + pos + " in the current buffer)");
                }
            });
        });
    };
    Decoder.prototype.decodeArrayStream = function (stream) {
        return this.decodeMultiAsync(stream, true);
    };
    Decoder.prototype.decodeStream = function (stream) {
        return this.decodeMultiAsync(stream, false);
    };
    Decoder.prototype.decodeMultiAsync = function (stream, isArray) {
        return __asyncGenerator(this, arguments, function decodeMultiAsync_1() {
            var isArrayHeaderRequired, arrayItemsLeft, stream_2, stream_2_1, buffer, e_2, e_3_1;
            var e_3, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isArrayHeaderRequired = isArray;
                        arrayItemsLeft = -1;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 13, 14, 19]);
                        stream_2 = __asyncValues(stream);
                        _b.label = 2;
                    case 2: return [4 /*yield*/, __await(stream_2.next())];
                    case 3:
                        if (!(stream_2_1 = _b.sent(), !stream_2_1.done)) return [3 /*break*/, 12];
                        buffer = stream_2_1.value;
                        if (isArray && arrayItemsLeft === 0) {
                            throw this.createExtraByteError(this.totalPos);
                        }
                        this.appendBuffer(buffer);
                        if (isArrayHeaderRequired) {
                            arrayItemsLeft = this.readArraySize();
                            isArrayHeaderRequired = false;
                            this.complete();
                        }
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 9, , 10]);
                        _b.label = 5;
                    case 5:
                        if (false) {}
                        return [4 /*yield*/, __await(this.doDecodeSync())];
                    case 6: return [4 /*yield*/, _b.sent()];
                    case 7:
                        _b.sent();
                        if (--arrayItemsLeft === 0) {
                            return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 5];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_2 = _b.sent();
                        if (!(e_2 instanceof DataViewIndexOutOfBoundsError)) {
                            throw e_2; // rethrow
                        }
                        return [3 /*break*/, 10];
                    case 10:
                        this.totalPos += this.pos;
                        _b.label = 11;
                    case 11: return [3 /*break*/, 2];
                    case 12: return [3 /*break*/, 19];
                    case 13:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 19];
                    case 14:
                        _b.trys.push([14, , 17, 18]);
                        if (!(stream_2_1 && !stream_2_1.done && (_a = stream_2.return))) return [3 /*break*/, 16];
                        return [4 /*yield*/, __await(_a.call(stream_2))];
                    case 15:
                        _b.sent();
                        _b.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 18: return [7 /*endfinally*/];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    Decoder.prototype.doDecodeSync = function () {
        DECODE: while (true) {
            var headByte = this.readHeadByte();
            var object = void 0;
            if (headByte >= 0xe0) {
                // negative fixint (111x xxxx) 0xe0 - 0xff
                object = headByte - 0x100;
            }
            else if (headByte < 0xc0) {
                if (headByte < 0x80) {
                    // positive fixint (0xxx xxxx) 0x00 - 0x7f
                    object = headByte;
                }
                else if (headByte < 0x90) {
                    // fixmap (1000 xxxx) 0x80 - 0x8f
                    var size = headByte - 0x80;
                    if (size !== 0) {
                        this.pushMapState(size);
                        this.complete();
                        continue DECODE;
                    }
                    else {
                        object = {};
                    }
                }
                else if (headByte < 0xa0) {
                    // fixarray (1001 xxxx) 0x90 - 0x9f
                    var size = headByte - 0x90;
                    if (size !== 0) {
                        this.pushArrayState(size);
                        this.complete();
                        continue DECODE;
                    }
                    else {
                        object = [];
                    }
                }
                else {
                    // fixstr (101x xxxx) 0xa0 - 0xbf
                    var byteLength = headByte - 0xa0;
                    object = this.decodeUtf8String(byteLength, 0);
                }
            }
            else if (headByte === 0xc0) {
                // nil
                object = null;
            }
            else if (headByte === 0xc2) {
                // false
                object = false;
            }
            else if (headByte === 0xc3) {
                // true
                object = true;
            }
            else if (headByte === 0xca) {
                // float 32
                object = this.readF32();
            }
            else if (headByte === 0xcb) {
                // float 64
                object = this.readF64();
            }
            else if (headByte === 0xcc) {
                // uint 8
                object = this.readU8();
            }
            else if (headByte === 0xcd) {
                // uint 16
                object = this.readU16();
            }
            else if (headByte === 0xce) {
                // uint 32
                object = this.readU32();
            }
            else if (headByte === 0xcf) {
                // uint 64
                object = this.readU64();
            }
            else if (headByte === 0xd0) {
                // int 8
                object = this.readI8();
            }
            else if (headByte === 0xd1) {
                // int 16
                object = this.readI16();
            }
            else if (headByte === 0xd2) {
                // int 32
                object = this.readI32();
            }
            else if (headByte === 0xd3) {
                // int 64
                object = this.readI64();
            }
            else if (headByte === 0xd9) {
                // str 8
                var byteLength = this.lookU8();
                object = this.decodeUtf8String(byteLength, 1);
            }
            else if (headByte === 0xda) {
                // str 16
                var byteLength = this.lookU16();
                object = this.decodeUtf8String(byteLength, 2);
            }
            else if (headByte === 0xdb) {
                // str 32
                var byteLength = this.lookU32();
                object = this.decodeUtf8String(byteLength, 4);
            }
            else if (headByte === 0xdc) {
                // array 16
                var size = this.readU16();
                if (size !== 0) {
                    this.pushArrayState(size);
                    this.complete();
                    continue DECODE;
                }
                else {
                    object = [];
                }
            }
            else if (headByte === 0xdd) {
                // array 32
                var size = this.readU32();
                if (size !== 0) {
                    this.pushArrayState(size);
                    this.complete();
                    continue DECODE;
                }
                else {
                    object = [];
                }
            }
            else if (headByte === 0xde) {
                // map 16
                var size = this.readU16();
                if (size !== 0) {
                    this.pushMapState(size);
                    this.complete();
                    continue DECODE;
                }
                else {
                    object = {};
                }
            }
            else if (headByte === 0xdf) {
                // map 32
                var size = this.readU32();
                if (size !== 0) {
                    this.pushMapState(size);
                    this.complete();
                    continue DECODE;
                }
                else {
                    object = {};
                }
            }
            else if (headByte === 0xc4) {
                // bin 8
                var size = this.lookU8();
                object = this.decodeBinary(size, 1);
            }
            else if (headByte === 0xc5) {
                // bin 16
                var size = this.lookU16();
                object = this.decodeBinary(size, 2);
            }
            else if (headByte === 0xc6) {
                // bin 32
                var size = this.lookU32();
                object = this.decodeBinary(size, 4);
            }
            else if (headByte === 0xd4) {
                // fixext 1
                object = this.decodeExtension(1, 0);
            }
            else if (headByte === 0xd5) {
                // fixext 2
                object = this.decodeExtension(2, 0);
            }
            else if (headByte === 0xd6) {
                // fixext 4
                object = this.decodeExtension(4, 0);
            }
            else if (headByte === 0xd7) {
                // fixext 8
                object = this.decodeExtension(8, 0);
            }
            else if (headByte === 0xd8) {
                // fixext 16
                object = this.decodeExtension(16, 0);
            }
            else if (headByte === 0xc7) {
                // ext 8
                var size = this.lookU8();
                object = this.decodeExtension(size, 1);
            }
            else if (headByte === 0xc8) {
                // ext 16
                var size = this.lookU16();
                object = this.decodeExtension(size, 2);
            }
            else if (headByte === 0xc9) {
                // ext 32
                var size = this.lookU32();
                object = this.decodeExtension(size, 4);
            }
            else {
                throw new DecodeError("Unrecognized type byte: " + prettyByte(headByte));
            }
            this.complete();
            var stack = this.stack;
            while (stack.length > 0) {
                // arrays and maps
                var state = stack[stack.length - 1];
                if (state.type === 0 /* ARRAY */) {
                    state.array[state.position] = object;
                    state.position++;
                    if (state.position === state.size) {
                        stack.pop();
                        object = state.array;
                    }
                    else {
                        continue DECODE;
                    }
                }
                else if (state.type === 1 /* MAP_KEY */) {
                    if (!isValidMapKeyType(object)) {
                        throw new DecodeError("The type of key must be string or number but " + typeof object);
                    }
                    if (object === "__proto__") {
                        throw new DecodeError("The key __proto__ is not allowed");
                    }
                    state.key = object;
                    state.type = 2 /* MAP_VALUE */;
                    continue DECODE;
                }
                else {
                    // it must be `state.type === State.MAP_VALUE` here
                    state.map[state.key] = object;
                    state.readCount++;
                    if (state.readCount === state.size) {
                        stack.pop();
                        object = state.map;
                    }
                    else {
                        state.key = null;
                        state.type = 1 /* MAP_KEY */;
                        continue DECODE;
                    }
                }
            }
            return object;
        }
    };
    Decoder.prototype.readHeadByte = function () {
        if (this.headByte === HEAD_BYTE_REQUIRED) {
            this.headByte = this.readU8();
            // console.log("headByte", prettyByte(this.headByte));
        }
        return this.headByte;
    };
    Decoder.prototype.complete = function () {
        this.headByte = HEAD_BYTE_REQUIRED;
    };
    Decoder.prototype.readArraySize = function () {
        var headByte = this.readHeadByte();
        switch (headByte) {
            case 0xdc:
                return this.readU16();
            case 0xdd:
                return this.readU32();
            default: {
                if (headByte < 0xa0) {
                    return headByte - 0x90;
                }
                else {
                    throw new DecodeError("Unrecognized array type byte: " + prettyByte(headByte));
                }
            }
        }
    };
    Decoder.prototype.pushMapState = function (size) {
        if (size > this.maxMapLength) {
            throw new DecodeError("Max length exceeded: map length (" + size + ") > maxMapLengthLength (" + this.maxMapLength + ")");
        }
        this.stack.push({
            type: 1 /* MAP_KEY */,
            size: size,
            key: null,
            readCount: 0,
            map: {},
        });
    };
    Decoder.prototype.pushArrayState = function (size) {
        if (size > this.maxArrayLength) {
            throw new DecodeError("Max length exceeded: array length (" + size + ") > maxArrayLength (" + this.maxArrayLength + ")");
        }
        this.stack.push({
            type: 0 /* ARRAY */,
            size: size,
            array: new Array(size),
            position: 0,
        });
    };
    Decoder.prototype.decodeUtf8String = function (byteLength, headerOffset) {
        var _a;
        if (byteLength > this.maxStrLength) {
            throw new DecodeError("Max length exceeded: UTF-8 byte length (" + byteLength + ") > maxStrLength (" + this.maxStrLength + ")");
        }
        if (this.bytes.byteLength < this.pos + headerOffset + byteLength) {
            throw MORE_DATA;
        }
        var offset = this.pos + headerOffset;
        var object;
        if (this.stateIsMapKey() && ((_a = this.keyDecoder) === null || _a === void 0 ? void 0 : _a.canBeCached(byteLength))) {
            object = this.keyDecoder.decode(this.bytes, offset, byteLength);
        }
        else if (byteLength > TEXT_DECODER_THRESHOLD) {
            object = utf8DecodeTD(this.bytes, offset, byteLength);
        }
        else {
            object = utf8DecodeJs(this.bytes, offset, byteLength);
        }
        this.pos += headerOffset + byteLength;
        return object;
    };
    Decoder.prototype.stateIsMapKey = function () {
        if (this.stack.length > 0) {
            var state = this.stack[this.stack.length - 1];
            return state.type === 1 /* MAP_KEY */;
        }
        return false;
    };
    Decoder.prototype.decodeBinary = function (byteLength, headOffset) {
        if (byteLength > this.maxBinLength) {
            throw new DecodeError("Max length exceeded: bin length (" + byteLength + ") > maxBinLength (" + this.maxBinLength + ")");
        }
        if (!this.hasRemaining(byteLength + headOffset)) {
            throw MORE_DATA;
        }
        var offset = this.pos + headOffset;
        var object = this.bytes.subarray(offset, offset + byteLength);
        this.pos += headOffset + byteLength;
        return object;
    };
    Decoder.prototype.decodeExtension = function (size, headOffset) {
        if (size > this.maxExtLength) {
            throw new DecodeError("Max length exceeded: ext length (" + size + ") > maxExtLength (" + this.maxExtLength + ")");
        }
        var extType = this.view.getInt8(this.pos + headOffset);
        var data = this.decodeBinary(size, headOffset + 1 /* extType */);
        return this.extensionCodec.decode(data, extType, this.context);
    };
    Decoder.prototype.lookU8 = function () {
        return this.view.getUint8(this.pos);
    };
    Decoder.prototype.lookU16 = function () {
        return this.view.getUint16(this.pos);
    };
    Decoder.prototype.lookU32 = function () {
        return this.view.getUint32(this.pos);
    };
    Decoder.prototype.readU8 = function () {
        var value = this.view.getUint8(this.pos);
        this.pos++;
        return value;
    };
    Decoder.prototype.readI8 = function () {
        var value = this.view.getInt8(this.pos);
        this.pos++;
        return value;
    };
    Decoder.prototype.readU16 = function () {
        var value = this.view.getUint16(this.pos);
        this.pos += 2;
        return value;
    };
    Decoder.prototype.readI16 = function () {
        var value = this.view.getInt16(this.pos);
        this.pos += 2;
        return value;
    };
    Decoder.prototype.readU32 = function () {
        var value = this.view.getUint32(this.pos);
        this.pos += 4;
        return value;
    };
    Decoder.prototype.readI32 = function () {
        var value = this.view.getInt32(this.pos);
        this.pos += 4;
        return value;
    };
    Decoder.prototype.readU64 = function () {
        var value = getUint64(this.view, this.pos);
        this.pos += 8;
        return value;
    };
    Decoder.prototype.readI64 = function () {
        var value = getInt64(this.view, this.pos);
        this.pos += 8;
        return value;
    };
    Decoder.prototype.readF32 = function () {
        var value = this.view.getFloat32(this.pos);
        this.pos += 4;
        return value;
    };
    Decoder.prototype.readF64 = function () {
        var value = this.view.getFloat64(this.pos);
        this.pos += 8;
        return value;
    };
    return Decoder;
}());

//# sourceMappingURL=Decoder.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/decode.mjs

var defaultDecodeOptions = {};
/**
 * It decodes a single MessagePack object in a buffer.
 *
 * This is a synchronous decoding function.
 * See other variants for asynchronous decoding: {@link decodeAsync()}, {@link decodeStream()}, or {@link decodeArrayStream()}.
 */
function decode(buffer, options) {
    if (options === void 0) { options = defaultDecodeOptions; }
    var decoder = new Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
    return decoder.decode(buffer);
}
/**
 * It decodes multiple MessagePack objects in a buffer.
 * This is corresponding to {@link decodeMultiStream()}.
 */
function decodeMulti(buffer, options) {
    if (options === void 0) { options = defaultDecodeOptions; }
    var decoder = new Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
    return decoder.decodeMulti(buffer);
}
//# sourceMappingURL=decode.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/utils/stream.mjs
// utility for whatwg streams
var stream_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var stream_await = (undefined && undefined.__await) || function (v) { return this instanceof stream_await ? (this.v = v, this) : new stream_await(v); }
var stream_asyncGenerator = (undefined && undefined.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof stream_await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
function isAsyncIterable(object) {
    return object[Symbol.asyncIterator] != null;
}
function assertNonNull(value) {
    if (value == null) {
        throw new Error("Assertion Failure: value must not be null nor undefined");
    }
}
function asyncIterableFromStream(stream) {
    return stream_asyncGenerator(this, arguments, function asyncIterableFromStream_1() {
        var reader, _a, done, value;
        return stream_generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = stream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    if (false) {}
                    return [4 /*yield*/, stream_await(reader.read())];
                case 3:
                    _a = _b.sent(), done = _a.done, value = _a.value;
                    if (!done) return [3 /*break*/, 5];
                    return [4 /*yield*/, stream_await(void 0)];
                case 4: return [2 /*return*/, _b.sent()];
                case 5:
                    assertNonNull(value);
                    return [4 /*yield*/, stream_await(value)];
                case 6: return [4 /*yield*/, _b.sent()];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 2];
                case 8: return [3 /*break*/, 10];
                case 9:
                    reader.releaseLock();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function ensureAsyncIterable(streamLike) {
    if (isAsyncIterable(streamLike)) {
        return streamLike;
    }
    else {
        return asyncIterableFromStream(streamLike);
    }
}
//# sourceMappingURL=stream.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/decodeAsync.mjs
var decodeAsync_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var decodeAsync_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



function decodeAsync(streamLike, options) {
    if (options === void 0) { options = defaultDecodeOptions; }
    return decodeAsync_awaiter(this, void 0, void 0, function () {
        var stream, decoder;
        return decodeAsync_generator(this, function (_a) {
            stream = ensureAsyncIterable(streamLike);
            decoder = new Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
            return [2 /*return*/, decoder.decodeAsync(stream)];
        });
    });
}
function decodeArrayStream(streamLike, options) {
    if (options === void 0) { options = defaultDecodeOptions; }
    var stream = ensureAsyncIterable(streamLike);
    var decoder = new Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
    return decoder.decodeArrayStream(stream);
}
function decodeMultiStream(streamLike, options) {
    if (options === void 0) { options = defaultDecodeOptions; }
    var stream = ensureAsyncIterable(streamLike);
    var decoder = new Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
    return decoder.decodeStream(stream);
}
/**
 * @deprecated Use {@link decodeMultiStream()} instead.
 */
function decodeStream(streamLike, options) {
    if (options === void 0) { options = defaultDecodeOptions; }
    return decodeMultiStream(streamLike, options);
}
//# sourceMappingURL=decodeAsync.mjs.map
;// CONCATENATED MODULE: ./node_modules/@msgpack/msgpack/dist.es5+esm/index.mjs
// Main Functions:











// Utilitiies for Extension Types:






//# sourceMappingURL=index.mjs.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

/**
 * Copyright (C) 2021 Landon Harris
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html>.
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValueType = exports.ValTable = exports.SignalGroup = exports.SignalType = exports.Signal = exports.Node = exports.Message = exports.EnvironmentVariable = exports.Database = exports.DBCError = exports.AttributeDef = exports.Attribute = exports.decodeDb = exports.encodeDb = exports.extensionCodec = void 0;
var mapTools_1 = __webpack_require__(164);
Object.defineProperty(exports, "extensionCodec", ({ enumerable: true, get: function () { return mapTools_1.extensionCodec; } }));
Object.defineProperty(exports, "encodeDb", ({ enumerable: true, get: function () { return mapTools_1.encodeDb; } }));
Object.defineProperty(exports, "decodeDb", ({ enumerable: true, get: function () { return mapTools_1.decodeDb; } }));
var attributes_1 = __webpack_require__(271);
Object.defineProperty(exports, "Attribute", ({ enumerable: true, get: function () { return attributes_1.Attribute; } }));
Object.defineProperty(exports, "AttributeDef", ({ enumerable: true, get: function () { return attributes_1.AttributeDef; } }));
var errors_1 = __webpack_require__(237);
Object.defineProperty(exports, "DBCError", ({ enumerable: true, get: function () { return errors_1.DBCError; } }));
var db_1 = __webpack_require__(761);
Object.defineProperty(exports, "Database", ({ enumerable: true, get: function () { return db_1.Database; } }));
var ev_1 = __webpack_require__(276);
Object.defineProperty(exports, "EnvironmentVariable", ({ enumerable: true, get: function () { return ev_1.EnvironmentVariable; } }));
var message_1 = __webpack_require__(780);
Object.defineProperty(exports, "Message", ({ enumerable: true, get: function () { return message_1.Message; } }));
var dbcNode_1 = __webpack_require__(7);
Object.defineProperty(exports, "Node", ({ enumerable: true, get: function () { return dbcNode_1.Node; } }));
var signal_1 = __webpack_require__(730);
Object.defineProperty(exports, "Signal", ({ enumerable: true, get: function () { return signal_1.Signal; } }));
Object.defineProperty(exports, "SignalType", ({ enumerable: true, get: function () { return signal_1.SignalType; } }));
Object.defineProperty(exports, "SignalGroup", ({ enumerable: true, get: function () { return signal_1.SignalGroup; } }));
var valtable_1 = __webpack_require__(112);
Object.defineProperty(exports, "ValTable", ({ enumerable: true, get: function () { return valtable_1.ValTable; } }));
Object.defineProperty(exports, "ValueType", ({ enumerable: true, get: function () { return valtable_1.ValueType; } }));

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=serverPack.js.map