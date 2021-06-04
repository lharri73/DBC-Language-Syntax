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


enum conditionType{
    noCondition,
    mapHas
}

export class DBCError {
    public constructor(whence: number,
                       what: string,
                       type: number,    // 0: warning, 1: error
                       token: string = ""){
        this.whence = whence;
        this.what = what;
        this.type = type;
        this.token = token;
        
        this.hasCondition = false;
        this.condition = conditionType.noCondition;
        this.mapVal = null;
        this.key = null;
    }

    public whence: number;  // line number
    public what: string;    // error string
    public type: number;    // 0: warning, 1: error
    public hasCondition: boolean;
    public token: string;

    // condition variables
    private condition: conditionType;
    private mapVal: Map<string,any> | null;
    private key: string|null;

    public evalCondition(){
        // returns false if error needs to be added
        if(!this.hasCondition) return false;

        switch (this.condition) {
            case conditionType.noCondition:
                return false;
            case conditionType.mapHas:
                return this.evalMapCondition();
            default:
                break;
        }
    }

    public addMapCondition(mapVal: Map<string,any>, key: string){
        this.mapVal = mapVal;
        this.key = key;
        this.condition = conditionType.mapHas;
        this.hasCondition = true;
    }

    private evalMapCondition(): boolean{
        if(this.mapVal === null || this.key === null)
            // no condition set. unconditional error, so always add
            return false;
        else if(this.mapVal === undefined)
            // map doest exist so there's no way the key is in it. 
            return false;
        else{
            // console.log("checking map condition", this.mapVal, this.key, this.mapVal.has(this.key));
            if(this.mapVal.has(this.key))
                return true;
            else
                return false;
        }
    }

    public isMapCondition(): boolean{
        return this.condition == conditionType.mapHas;
    }

}
