import { HttpException, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { Profile } from 'src/schema/profile.schema';
import { ProfileDto } from 'src/dto/profile.dto';
import { AuthenticatedRequest } from 'src/interface/user.interface';

@Injectable()
export class UsersService {
   constructor (
   @InjectModel (User.name) private userModel:Model<User>,
   @InjectModel (Profile.name) private profileModel:Model<Profile>,
   ){}

//   async createProfile(payload: ProfileDto, @Req() req:AuthenticatedRequest) {
//    //  try{
//       const user = req.user
//       const _id = user['_id'] 

//       const finduser = await this.userModel.findById({_id})
//       if(!finduser){
//        throw new NotFoundException('user does not exist')
//       }
//       console.log(finduser);
      

//       if(user.profile){
//        throw new HttpException('profile already exist, update profile to make changes', 400)
//       }
//       // const user = finduser
//       const Profile = await this.profileModel.create({...payload, user_id: user})
//       finduser.profile = Profile
//       await finduser.save()
//       return{
//         msg: 'sucessfull',
//         result: Profile
//       }
//     }
//     catch(error){
//       return 'failed to create profile'
//     }
  
    async updateProfile(payload: ProfileDto, @Req() req:AuthenticatedRequest) {

         const user = req.user
         const  _id = user['_id']
   
         const finduser = await this.userModel.findById({_id})
         if(!finduser){
          throw new NotFoundException('user does not exist')
         }
         console.log(finduser);
     
     const update = await this.profileModel.findByIdAndUpdate( finduser.profileId, payload, {new:true} )
   //   update.save()
     return{
      msg: 'sucessful',
      result: update
     }
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
   //     try{
   //        const decoded = this.jwtService.verify(token);
   //        let id = decoded["id"];
   //        let user = await this.userModel.findById({id});
   //        return{
   //           id,
   //           email: user.email, 
   //           name: user.displayName,
   //          //  role:user.role,
   //           profile: user.profile
   //        };
   //     } 
   //     catch(error){
   //        throw new UnauthorizedException('invalid TOKEN');
   //     }
    }
    else{
          throw new UnauthorizedException('invalid or missing bearer token')
       }
 
 }
 
 
 
 async findUsers(){
    const users = await this.userModel.find()
    return users;
  }

  async follow(userToBeFollowedUserId: string, @Req() req: AuthenticatedRequest) {
   const currentUser = req.user;
   const currentUserId = currentUser['_id'];

   const user = await this.userModel.findById(currentUserId)

   const userToBeFollowed = await this.userModel.findById(userToBeFollowedUserId);
   if (!userToBeFollowed) {
       throw new NotFoundException('Target user not found');
   }

   const isFollowing = userToBeFollowed.followers.includes(currentUserId);

   if (isFollowing) {
       const followerIndex = userToBeFollowed.followers.indexOf(currentUserId);
       userToBeFollowed.followers.splice(followerIndex, 1);
   } else {
       userToBeFollowed.followers.push(currentUserId);
   }

   await userToBeFollowed.save();

   const isFollowingIndex = currentUser.following.indexOf(userToBeFollowed);
   if (isFollowingIndex !== -1) {
       currentUser.following.splice(isFollowingIndex, 1);
   } else {
       currentUser.following.push(userToBeFollowed);
   }

   await user.save();

   return {
       message: isFollowing ? 'Unfollowed successfully' : 'Followed successfully',
       isFollowing: !isFollowing,
       userToBeFollowed,
   };
}


}

  

 
  
  
  


 

