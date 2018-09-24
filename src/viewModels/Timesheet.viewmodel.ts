import { Timestamp } from "typeorm";

export class TimesheetView {
    readonly userId: string;
    readonly date: string;
    readonly project: number;
    readonly unit: number;
    readonly lastUpdated: number;
}