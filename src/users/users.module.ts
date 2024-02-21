import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BookSchema, Books } from 'src/schema/books.schema';
import { Profile, ProfileSchema } from 'src/schema/profile.schema';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';
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
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService, JwtStrategy, PassportModule],
})
export class UsersModule {}
