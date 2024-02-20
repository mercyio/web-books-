import { HttpException, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/dto/update-product.dto';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/schema/user.schema';
import { Profile } from 'src/schema/profile.schema';
import { ProfileDto } from 'src/dto/profile.dto';
import { BookDto } from 'src/dto/book.dto';
import { Books } from 'src/schema/books.schema';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from 'src/interface/user.interface';

@Injectable()
export class UsersService {
   constructor (
   @InjectModel (User.name) private userModel:Model<User>,
   @InjectModel (Profile.name) private profileModel:Model<Profile>,
   @InjectModel (Books.name) private bookModel:Model<Books>,
   private jwtService :JwtService,
   ){}

  async createProfile(payload: ProfileDto, @Req() req:AuthenticatedRequest) {
    try{
      const user = req.user
      const _id = user['_id']

      const finduser = await this.userModel.findById({_id})
      if(!finduser){
       throw new NotFoundException('user does not exist')
      }

      if(user.profile){
       throw new HttpException('profile already exist, update profile to make changes', 400)
      }
      // const user = finduser
      const Profile = await this.profileModel.create({...payload, user})
      finduser.profile = Profile
      Profile.save()
      return{
        msg: 'sucessfull',
        result: Profile
      }
    }
    catch(error){
      return 'failed to create profile'
    }
   
  }

  async updateProfile() {
    
  }


  async findEmail(email:string){
    const mail = await this.userModel.findOne({email})
    if(!mail){
       throw new UnauthorizedException('email not found')
    }
    return mail;
 }
 
 
 // TO VERIFY USERS TOKEN 
 async user(headers:any) :Promise<any>{
    const authorizationHeader = headers.authorization;
 
    if(authorizationHeader){
       const token = authorizationHeader.replace('Bearer', '').trim();
       // console.log(token);
       const secretOrKey = process.env.JWT_SECRET;
       try{
          const decoded = this.jwtService.verify(token);
          let id = decoded["id"];
          let user = await this.userModel.findById({id});
          return{
             id,
             email: user.email, 
            //  role:user.role,
             profile: user.profile
          };
       } 
       catch(error){
          throw new UnauthorizedException('invalid TOKEN');
       }
    }
    else{
          throw new UnauthorizedException('invalid or missing bearer token')
       }
 
 }
 
 
 
 async findUsers(){
    const users = await this.userModel.find()
    return users;
  }
 
 
 

  

  // ONE USER TO MANY BOOKS
  async Publish(payload:BookDto, @Req() req:AuthenticatedRequest ){
    const user = req.user
    console.log(user);
    const _id = user['_id']
    const finduser = await this.userModel.findOne({_id})
    if(!finduser){
      throw new NotFoundException('user not found')
     }
     const author= finduser
     const newBook = await this.bookModel.create({...payload, author})
     newBook.save()
     return {
      message: 'sucessful',
      newBook
     }

  //   const newBook = new this.bookModel({
  //     ...payload,
  //     author: finduser
  //   });

  //   return newBook.save();
  }
  
  }
  


 

