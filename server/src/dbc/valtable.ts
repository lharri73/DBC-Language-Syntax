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

export class ValTable{
    public constructor(name: string){
        this.name = name;
        this.descriptions = new Map();
    }
    public name: string;
    public descriptions: Map<any,any>;
}

export class ValueType{
    public constructor(type: number){
        this.type = type;
        this.min = 0;
        this.max = 0;
        this.enumVals = [];
    }
    public type: number;
    public min: number;
    public max: number;
    public enumVals: string[];
}
