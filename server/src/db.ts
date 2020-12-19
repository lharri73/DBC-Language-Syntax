/**
 * Copyright (C) 2020 Landon Harris
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

export interface Signal {
    name: string,
    startBit: number,
    bitSize: number,
    byteOrder: boolean,
    valueType: boolean,      // signed/unsigned
    factor: number,
    offset: number,
    minimun: number,
    maximum: number,
    unit: string
    //receivers: something[],
}

export interface Message {
    id: number,
    name: string,
    size: number,
    signals: Signal[],
    comment: string
}

export interface Database{
    messages: Message[]
}
