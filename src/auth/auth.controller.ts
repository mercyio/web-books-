import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/dto/signup.dto';
import { Response } from 'express';
import { LoginDto } from 'src/dto/login.dto';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() payload:SignupDto ) {
    return await this.authService.signup(payload);
  }

  @Post('login')
  async login(@Body() payload:LoginDto, @Res() res:Response ) {
    return await this.authService.signin(payload, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto ) {
    return this.authService.update(+id, );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
