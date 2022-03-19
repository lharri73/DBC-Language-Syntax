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

import { ValueType } from "./valtable";

export class Attribute{
    public constructor(name: string, 
                       objectType: number, 
                       value: any){
        this.name = name;
        this.type = objectType;
        this.value = value;
        this.clsType = "attribute";
    }
    public name: string;
    public type: number;
    public value: any;
    public clsType: string;
}

export class AttributeDef{
    public constructor(name: string, objType: number, valType: ValueType){
        this.name = name;
        this.objType = objType;
        this.valType = valType;
        this.clsType = "attributeDef";
    }
    public name: string;
    public objType: number;
    public valType: ValueType;
    public clsType: string;
}
