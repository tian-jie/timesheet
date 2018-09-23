import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimesheetController } from '../controllers/timesheet.controller';
import { TimesheetService } from '../services/timesheet.service';
import { Timesheet } from '../entities/timesheet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Timesheet])],
    controllers: [TimesheetController],
    providers: [TimesheetService]
})
export class TimesheetModule { }