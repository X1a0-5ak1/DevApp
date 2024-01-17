import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Msg } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() postData: { email: string; password: string }): Promise<Msg> {
    return this.authService.signUp(postData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() postData: { email: string; password: string }): Promise<any> {
    return await this.authService.login(postData);
  }
}
