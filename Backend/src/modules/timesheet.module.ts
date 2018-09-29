import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimesheetController } from '../controllers/timesheet.controller';
import { TimesheetService } from '../services/timesheet.service';
import { Timesheet } from '../entities/timesheet.entity';
import { AuthModule } from './auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Timesheet]),
        AuthModule
    ],
    controllers: [TimesheetController],
    providers: [TimesheetService]
})
export class TimesheetModule { }