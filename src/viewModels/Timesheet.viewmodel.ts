import { Timestamp } from "typeorm";
export class Unit{
    date: string;
    unit: number;
}

export class TimesheetView {
    readonly userId: string;
    readonly project: number;
    readonly cycle: string;
    readonly units: Unit[];
    readonly lastUpdated: number;
}