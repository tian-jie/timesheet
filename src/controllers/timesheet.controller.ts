import { Controller, Get, Post, HttpCode, Param, Render, Res } from '@nestjs/common';
import { TimesheetService } from '../services/timesheet.service';

@Controller('timesheet')
export class TimesheetController {
    constructor(private readonly timesheetService: TimesheetService) { }

    @Get('index')
    @Render('timesheet/index')
    async index(): Promise<any> {
        var units = await this.timesheetService.findByUser('1');
        console.debug(units);
        return { units: units };
    }


}