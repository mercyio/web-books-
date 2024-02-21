import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Books, BookSchema } from 'src/schema/books.schema';
import { Profile, ProfileSchema } from 'src/schema/profile.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';
import { Chapter, ChapterSchema } from 'src/schema/chapters.schema';
import { Bookmark, BookmarkSchema } from 'src/schema/bookmark.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema}, 
      { name: Books.name, schema: BookSchema}, 
      { name: Chapter.name, schema: ChapterSchema},
      { name: Bookmark.name, schema: BookmarkSchema},
      { name: Profile.name, schema: ProfileSchema}]),

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
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,UsersService],
  exports: [AuthService, JwtStrategy, PassportModule],

})
export class AuthModule {}
