import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'
import { UserView } from '../viewModels/user.viewmodel'

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly timesheetRepository: Repository<User>
    ) {

    }

    async findOneByToken(ticker: string): Promise<UserView> {
        var userView = new UserView();
        // var timesheet = await this.timesheetRepository.find({ userId: userid });
        // var timesheetView = [];
        // // for(var i in timesheet){
        // //     var t = timesheet[i];
        // //     timesheetView.push({
        // //        userId: t.userId,
        // //        date: t.date,
        // //        unit: t.unit 
        // //     });
        // // }
        // console.debug(timesheet);
        // timesheet.forEach(function(item, index){
        //     timesheetView.push({
        //         userId: item.userId,
        //         date: item.date,
        //         project: item.project,
        //         unit: item.unit,
        //         lastUpdated: item.lastUpdated
        //      });
        // });
        return userView;
    }


}