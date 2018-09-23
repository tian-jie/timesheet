import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timesheet } from '../entities/timesheet.entity'

@Injectable()
export class TimesheetService {

    constructor(
        @InjectRepository(Timesheet) private readonly timesheetRepository: Repository<Timesheet>
    ) {

    }

    // async findByUser(userid: string): Promise<Timesheet[]> {
    //     return await this.timesheetRepository.find({ userId: userid });
    // }

    async findByUser(userid: string): Promise<any[]> {
        return this.fakeUnits();
    }

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
}