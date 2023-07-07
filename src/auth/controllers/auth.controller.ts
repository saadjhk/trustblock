import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { EmailConfirmationService } from '../services/email-confirmation.service';
import { SignInUserDto } from 'src/dto/sign-in-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../services/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailConfirmationService: EmailConfirmationService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    await this.authService.registerUser(createUserDto);
    await this.emailConfirmationService.sendVerificationLink(
      createUserDto.email,
    );
    return { message: 'Successfully registered: ' + createUserDto.email };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signinDto: SignInUserDto) {
    const { isRegistered, user } = await this.authService.verifyLogin(
      signinDto,
    );

    if (isRegistered) {
      if (!user.isVerifiedEmail) {
        throw new UnauthorizedException('Email not verified');
      }

      const payload = {
        user: {
          email: signinDto.email,
        },
      };

      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
        )}s`,
      });

      return { access_token: token };
    } else {
      throw new UnauthorizedException('Invalid email ID or password');
    }
  }

  @Get('users')
  async getUsers() {
    return this.usersService.getUsers();
  }
}