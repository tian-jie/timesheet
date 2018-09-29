import { Controller, Get, Post, HttpCode, Param, Render, Res, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'authguard/jwt-auth.guard';
import { LoginView } from 'viewModels/login.viewmodel';

@Controller('user')
export class AccountController {
    constructor(private readonly authService: AuthService) { }

    @Get('login')
    async loginGet(@Body() loginView: LoginView ): Promise<any> {
      console.debug(loginView.userId);
      console.debug(loginView.pwdhash);
      return await this.authService.createToken(loginView.userId);
    }

    @Post('login')
    async loginPost(@Body() loginView: LoginView ): Promise<any> {
      console.debug(loginView.userId);
      console.debug(loginView.pwdhash);
      return await this.authService.createToken(loginView.userId);
    }

    @Get('nothing')
    @UseGuards(AuthGuard('jwt'))
    async nothing(@Request() req): Promise<any>{
        var user = req.user;
        return {I: 'am ok.', You: 'are fine.'}
    }

}