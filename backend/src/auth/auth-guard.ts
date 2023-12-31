import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from './services/users.service';
import { User } from '../entities/user.entity';
import { EvmAuthService } from './services/evm-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private evmAuthService: EvmAuthService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      let user: User | null = null;
      if (payload.user.evmAddress && payload.user.evmAddress.length > 0) {
        const isWhiteListed = await this.evmAuthService.isContractWhiteListed(
          payload.user.evmAddress,
        );

        if (isWhiteListed) {
          user = await this.usersService.getByAddress(payload.user.evmAddress);
        }
      } else if (payload.user.email && payload.user.email.length > 0) {
        user = await this.usersService.getByEmail(payload.user.email);
      }
      request['user'] = user;
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
