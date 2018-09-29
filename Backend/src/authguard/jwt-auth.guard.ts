import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
      // Add your custom authentication logic here
      // for example, call super.logIn(request) to establish a session.
      var can = super.canActivate(context);
      console.debug('JwtAuthGuard.canActivate');
      return can;
    }
  
    handleRequest(err, user, info) {
      if (err || !user) {
        throw err || new UnauthorizedException();
      }
      return user;
    }
  }