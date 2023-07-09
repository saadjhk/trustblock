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

  async verifySignature(address: string, message: string, signature: string) {
    let signerAddr: string | null = null;

    try {
      signerAddr = await ethers.verifyMessage(message, signature);
    } catch (error: any) {
      Logger.log(error.toString());
    }

    return signerAddr && signerAddr.toLowerCase() === address.toLowerCase();
  }

  async isContractWhiteListed(address: string) {
    const provider = new ethers.JsonRpcProvider(
      this.configService.get('EVM_CHAIN_RPC'),
    );

    const contract = new ethers.Contract(
      this.configService.get('EVM_AUTH_CONTRACT_ADDRESS'),
      UserWhiteListAbi,
      provider,
    );

    let isWhiteListed = false;

    try {
      isWhiteListed = await contract.whitelisting(address);
    } catch (error: any) {
      Logger.log(error.toString());
    }

    return isWhiteListed;
  }

  async verifyEvmUser(evmDto: EvmAuthDto) {
    let isWhiteListed = false;
    let isSignatureValid = false;

    isSignatureValid = await this.verifySignature(
      evmDto.address,
      evmDto.message,
      evmDto.signature,
    );
    isWhiteListed = await this.isContractWhiteListed(evmDto.address);

    return isWhiteListed && isSignatureValid;
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
