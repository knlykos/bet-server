import { Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as cryptoRandomString from 'crypto-random-string';
import { User } from 'src/entities/user.entity';
import { ResponseApi } from 'src/models/response.api.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(user: User): Promise<any> {
    const response: ResponseApi<User> = {
      data: { activationToken: '' },
      statusCode: 0,
      message: 'OK',
    };
    const randomString = cryptoRandomString({ length: 30 });
    user.activationToken = randomString;
    const userResultSet = await this.usersService.create(user);
    response.data.activationToken = userResultSet.activationToken;
    response.data.id = userResultSet.id;
    return response;
  }
}
