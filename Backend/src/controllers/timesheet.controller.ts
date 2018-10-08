import { Controller, Get, Post, All, Options, HttpCode, Param, Render, Res, UseGuards, Req, Body } from '@nestjs/common';
import { TimesheetService } from '../services/timesheet.service';
import { TimesheetView } from '../viewModels/Timesheet.viewmodel'
import { AuthGuard } from '@nestjs/passport';
import { Timesheet } from 'entities/timesheet.entity';

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

    @All('/save')
    //    @UseGuards(AuthGuard('jwt'))
    async save(@Body() timesheetViews: TimesheetView[]): Promise<any> {
        // will use pipe for global validation....
        this.timesheetService.save(timesheetViews);

        return {};
    }

    @Get('avaliableCycles')
    @UseGuards(AuthGuard('jwt'))
    avaliableCycles(req): any[] {
        req.User
        return this.timesheetService.getAvaliableCycles();
    }

}