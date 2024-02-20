import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { log } from "console";
import { UsersService } from "src/users/users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }


    async validate (payload:{email}){
        try{
            const {email} = payload 
            // console.log(email);
            
            const user = await this.authService.findEmail(email)
    
            if(!user){
                throw new UnauthorizedException('user not found');
            }
            return user;
        } catch(error){
            console.error('Error validating token :', error )
             throw new UnauthorizedException('INVALID TOKEN input')
        }
       
    }
    // async validate(payload: any) {
    //     return { userid: payload.sub, firstname : payload.firstname };
    //   }
}