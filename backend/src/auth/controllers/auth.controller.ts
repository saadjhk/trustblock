import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { EmailConfirmationService } from '../services/email-confirmation.service';
import { SignInUserDto } from 'src/dto/sign-in-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EvmAuthDto } from 'src/dto/evm-auth.dto';
import { EvmAuthService } from '../services/evm-auth.service';
import { User } from 'src/entities';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailConfirmationService: EmailConfirmationService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private evmAuthService: EvmAuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    await this.authService.registerViaCredentials(createUserDto);
    await this.emailConfirmationService.sendVerificationLink(
      createUserDto.email,
    );
    return { message: 'Successfully registered: ' + createUserDto.email };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signinDto: SignInUserDto) {
    const { isRegistered, user } = await this.authService.verifyCredentials(
      signinDto,
    );

    if (isRegistered) {
      if (!user.isVerifiedEmail) {
        throw new UnauthorizedException('Email not verified');
      }

      const payload = {
        user: {
          email: user.email,
          id: user.id,
        },
      };

      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
        )}`,
      });

      return { accessToken: token };
    } else {
      throw new UnauthorizedException('Invalid email ID or password');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('evm')
  async authEvm(@Body() evmAuthDto: EvmAuthDto) {
    evmAuthDto.address = evmAuthDto.address.toLowerCase();
    const isValid = await this.evmAuthService.verifyEvmUser(evmAuthDto);
    let registered: User | null = null;
    if (isValid) {
      registered = await this.evmAuthService.addressIsRegistered(evmAuthDto);

      if (!registered) {
        registered = await this.evmAuthService.registerViaAddress(evmAuthDto);
      }

      const payload = {
        user: {
          evmAddress: registered.evmAddress,
          id: registered.id,
        },
      };

      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
        )}`,
      });

      return { accessToken: token };
    } else {
      throw new BadRequestException();
    }
  }
}
