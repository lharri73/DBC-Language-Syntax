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

import { Attribute } from "./attributes";
import { ValTable } from "./valtable";

export class EnvironmentVariable{
    public constructor(){
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
    }
    public name: string;
    public type: number; // 0: integer, 1: float, 2: string, 3: data(ENVVAR_DATA)
    public min: number;
    public max: number;
    public unit: string;
    public initialVal: number;
    public id: number;
    public transmitters: string[];
    public valueDescriptions: Map<string,ValTable>;
    public dataSize: number;
    public comment: string;
    public attributes: Map<string,Attribute>;
}
