import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from 'src/dto/signup.dto';
import { User } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
  constructor (
    @InjectModel (User.name) private userModel:Model<User>,
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
   const user = await this.userModel.create({...payload, password: hashedPassword})
    user.save()
    delete user.password
    return user
  }

  findAll() {
    return `This action returns all auth`;
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
