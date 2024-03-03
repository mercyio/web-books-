import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Profile, ProfileSchema } from 'src/schema/profile.schema';

// import { Comment, CommentSchema } from 'src/schema/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema}, 
      { name: Profile.name, schema: ProfileSchema}
    ]),


      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) =>
        ({
            secret: configService.getOrThrow<string>
            ('JWT_SECRET'), 
            signOptions:{
                algorithm: configService.getOrThrow
                ('JWT_ALGORITHM'),
                expiresIn : configService.getOrThrow('JWT_EXPIRESIN')
            }
        }),
        inject: [ConfigService],
    }),
    PassportModule.register({
        defaultStrategy: 'jwt'
    }),
    // UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService,PassportModule ],
  exports: [AuthService,PassportModule ],

})
export class AuthModule {}
