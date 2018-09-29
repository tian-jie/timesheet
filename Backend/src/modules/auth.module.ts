import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountController } from '../controllers/account.controller';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from '../authguard/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AccountController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}