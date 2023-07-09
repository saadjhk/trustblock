import { Injectable, Logger } from '@nestjs/common';
import { EvmAuthDto } from 'src/dto/evm-auth.dto';
import { ethers } from 'ethers';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import * as UserWhiteListAbi from '../../abi/UserWhiteList.abi.json';

@Injectable()
export class EvmAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async verifyEvmUser(evmDto: EvmAuthDto) {
    let signerAddr: string | null = null;

    const provider = new ethers.JsonRpcProvider(
      this.configService.get('EVM_CHAIN_RPC'),
    );

    const contract = new ethers.Contract(
      this.configService.get('EVM_AUTH_CONTRACT_ADDRESS'),
      UserWhiteListAbi,
      provider,
    );

    try {
      signerAddr = await ethers.verifyMessage(evmDto.message, evmDto.signature);
    } catch (error: any) {
      Logger.log(error.toString());
    }

    if (
      signerAddr &&
      signerAddr.toLowerCase() === evmDto.address.toLowerCase()
    ) {
      let isWhiteListed = false;
      try {
        isWhiteListed = await contract.whitelisting(evmDto.address);
      } catch (error: any) {
        Logger.log(error.toString());
      }
      return isWhiteListed;
    }

    return false;
  }

  async registerViaAddress(evmDto: EvmAuthDto) {
    return this.userService.newEvmUser(evmDto);
  }

  async addressIsRegistered(evmDto: EvmAuthDto) {
    const user = await this.userService.getByAddress(
      evmDto.address.toLowerCase(),
    );
    return user;
  }
}
