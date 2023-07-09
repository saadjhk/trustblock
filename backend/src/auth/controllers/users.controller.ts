import {
  Controller,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '../auth-guard';
import { UsersService } from '../services/users.service';
import { AuthenticatedRequest } from 'src/interfaces/AuthenticatedRequest';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Req() request: AuthenticatedRequest) {
    const user = await this.usersService.getByAddressOrEmail(
      request.user.email,
      request.user.evmAddress,
    );
    user.password = undefined;
    return user;
  }
}
