import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timesheet } from '../entities/timesheet.entity'
import { TimesheetView } from '../viewModels/timesheet.viewmodel'
import { CycleObject } from '../common/CycleObject'

@Injectable()
export class TimesheetService {

    constructor(
        @InjectRepository(Timesheet) private readonly timesheetRepository: Repository<Timesheet>
    ) {

    }

    async findByUser(userid: string): Promise<TimesheetView[]> {
        var timesheet = await this.timesheetRepository.find({ userId: userid });
        var timesheetView = [];
        // for(var i in timesheet){
        //     var t = timesheet[i];
        //     timesheetView.push({
        //        userId: t.userId,
        //        date: t.date,
        //        unit: t.unit 
        //     });
        // }
        console.debug(timesheet);
        timesheet.forEach(function(item, index){
            timesheetView.push({
                userId: item.userId,
                date: item.date,
                project: item.project,
                unit: item.unit,
                lastUpdated: item.lastUpdated
             });
        });
        return timesheetView;
    }

    // async findByUser(userid: string): Promise<any[]> {
    //     return this.fakeUnits();
    // }

    fakeUnits() {
        return [{
            userId: 1,
            date: '2018-1-1',
            unit: 5
        }, {
            userId: 1,
            date: '2018-1-2',
            unit: 8
        }, {
            userId: 1,
            date: '2018-1-3',
            unit: 8
        }, {
            userId: 2,
            date: '2018-1-3',
            unit: 8
        }];
    }

    getAvaliableCycles(): any[]{
        var cycles = [];
        cycles.push(new CycleObject(new Date()).nextCycles(-1).toString());
        cycles.push(new CycleObject(new Date()).toString());
        cycles.push(new CycleObject(new Date()).nextCycles(1).toString());
        cycles.push(new CycleObject(new Date()).nextCycles(2).toString());
        cycles.push(new CycleObject(new Date()).nextCycles(3).toString());
        cycles.push(new CycleObject(new Date()).nextCycles(4).toString());

        return cycles;
    }


}