import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signin')
  async signIn(@Req() req: Request) {
    const user: User = req.body;
    return await this.authService.register(user);
  }
}
