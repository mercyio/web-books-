import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/dto/update-product.dto';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/schema/user.schema';
import { Request, Response } from "express";
import { Profile } from 'src/schema/profile.schema';
import { ProfileDto } from 'src/dto/profile.dto';

@Injectable()
export class UsersService {
   constructor (
   @InjectModel (User.name) private userModel:Model<User>,
   @InjectModel (Profile.name) private profileModel:Model<Profile>){}

  async createProfile(payload: ProfileDto, _id:string) {
    try{
      const finduser = await this.userModel.findOne({_id})
      if(!finduser){
       throw new NotFoundException('user does not exist')
      }
      const user = finduser
      const profile = await this.profileModel.create({...payload, user})
      finduser.profile = profile
      profile.save()
      return{
        msg: 'sucessfull',
        result: profile
      }
    }
    catch(error){
      return 'profile has already been created, update profile to make changes'
    }
   
  }

  async updateProfile() {
    
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
