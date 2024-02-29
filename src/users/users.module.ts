import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BookSchema, Books } from 'src/schema/books.schema';
import { Profile, ProfileSchema } from 'src/schema/profile.schema';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema}, 
      { name: Books.name, schema: BookSchema}, 
      { name: Profile.name, schema: ProfileSchema}
    ]),


    //   JwtModule.registerAsync({
    //     imports: [ConfigModule],
    //     useFactory: async (configService: ConfigService) =>
    //     ({
    //         secret: configService.getOrThrow<string>
    //         ('JWT_SECRET'), 
    //         signOptions:{
    //             algorithm: configService.getOrThrow
    //             ('JWT_ALGORITHM'),
    //             expiresIn : configService.getOrThrow('JWT_EXPIRESIN')
    //         }
    //     }),
    //     inject: [ConfigService],
    // }),
    // PassportModule.register({
    //     defaultStrategy: 'jwt'
    // }),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy,],
  exports: [UsersService, ],
})
export class UsersModule {}
