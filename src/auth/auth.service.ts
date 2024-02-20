import { HttpException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from 'src/dto/signup.dto';
import { User } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {Request, Response}  from 'express';




@Injectable()
export class AuthService {
  
  constructor (
    @InjectModel (User.name) private userModel:Model<User>,
    private jwtService :JwtService,
   
    // @InjectModel (User.name) private profileModel:Model<Profile>
    ){}
 
  async signup(payload:SignupDto ) {
   payload.email = payload.email.toLowerCase()
   const {email, password} =payload
   const userEmail = await this.userModel.findOne({email})
   if(userEmail){
     throw new HttpException('EMAIL ALREADY EXIST', 400)
   }
   const hashedPassword = await bcrypt.hash(password, 10) 
   const user = await this.userModel.create({email, password: hashedPassword})
    user.save()
    delete user.password
    return user
  }



  async signin(payload:SignupDto, @Res()res:Response){
    const {email, password} = payload;
    const user = await this.userModel.findOne({email})
    // .addSelect("user.password")
    // .where("user.email = :email", {email:payload.email}).getOne()
    if(!user){
       throw new HttpException('NO EMAIL FOUND', 400)
    }
    if(!await bcrypt.compare(password, user.password)){
       throw new HttpException('SORRY PASSWORD NOT FOUND', 400)
    }
    const token = await this.jwtService.signAsync({
       email: user.email,
       userid: user.id,
      //  role: user.role
    });
    res.cookie('isAuthenticated', token,{
       httpOnly: true,
       maxAge: 1 * 60 * 60 * 1000
    });
     return res.send({
       success:true,
       userToken:token
     })
 }


  


  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
