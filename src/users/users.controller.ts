import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/dto/user.dto';
import { UpdateUserDto } from 'src/dto/update-product.dto';
import { ProfileDto } from 'src/dto/profile.dto';
import { BookDto } from 'src/dto/book.dto';
import { AuthenticatedRequest } from 'src/interface/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('createprofile')
  // // @UseGuards(AuthGuard())
  // async create(@Body() payload: ProfileDto, @Req() req: AuthenticatedRequest) {
  //   return await this.usersService.createProfile(payload, req);
  // } 

 @Patch('updateProfile')
 @UseGuards(AuthGuard())
 async update(@Body() payload:ProfileDto, @Req() req:AuthenticatedRequest){
  return await this.usersService.updateProfile(payload, req)
 }

 @Post('follow/:userToBeFollowedUserId')
 @UseGuards(AuthGuard())
 async followusers(@Param('userToBeFollowedUserId') userToBeFollowedUserId:string, @Req() req:AuthenticatedRequest){
  return await this.usersService.follow( userToBeFollowedUserId, req)
 }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
