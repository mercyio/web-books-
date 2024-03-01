import { Module } from '@nestjs/common';
import { BookService } from './books.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema, Books } from '../schema/books.schema';
// import { Profile, ProfileSchema } from '../schema/profile.schema';
import { User, UserSchema } from '../schema/user.schema';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { Chapter, ChapterSchema } from '../schema/chapters.schema';
import { Features, FeaturesSchema } from '../schema/features.schema';
import { Like, LikeSchema } from 'src/schema/like.schema';
import { Profile, ProfileSchema } from 'src/schema/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Books.name, schema: BookSchema },
      { name: Chapter.name, schema: ChapterSchema },
      { name: Features.name, schema: FeaturesSchema },
      // { name: Like.name, schema: LikeSchema}    
      // { name: Likes.name, schema:Schema},
      // { name: Comment.name, schema: CommentSchema},
      { name: Profile.name, schema: ProfileSchema}
    ]),

    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.getOrThrow<string>('JWT_SECRET'),
    //     signOptions: {
    //       algorithm: configService.getOrThrow('JWT_ALGORITHM'),
    //       expiresIn: configService.getOrThrow('JWT_EXPIRESIN'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    // PassportModule.register({
    //   defaultStrategy: 'jwt',
    // }),
    AuthModule,
    UsersModule,
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BooksModule {}
