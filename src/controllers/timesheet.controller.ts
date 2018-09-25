import { Controller, Get, Post, HttpCode, Param, Render, Res, UseGuards, Req } from '@nestjs/common';
import { TimesheetService } from '../services/timesheet.service';
import { TimesheetView } from '../viewModels/Timesheet.viewmodel'
import { AuthGuard } from '@nestjs/passport';

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

    @Get('byuser/:userid')
    async byuser(@Param('userid') userid): Promise<TimesheetView[]> {
        var units = await this.timesheetService.findByUser(userid);
        return units;
    }

    @Get('avaliableCycles')
    @UseGuards(AuthGuard())
    avaliableCycles(req): any[]{
        req.User
        return this.timesheetService.getAvaliableCycles();
    }

}