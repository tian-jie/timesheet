import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimesheetModule} from './modules/timesheet.module';
import { AuthModule } from 'modules/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TimesheetModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
