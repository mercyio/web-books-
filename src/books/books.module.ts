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
import { Comments, FeaturesSchema } from '../schema/comment.schema';
// import { Profile, ProfileSchema } from 'src/schema/profile.schema';
import { Replies, RepliesSchema } from 'src/schema/reply.schema';
// import { Comment,  } from 'src/schema/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Books.name, schema: BookSchema },
      { name: Chapter.name, schema: ChapterSchema },
      { name: Comments.name, schema: FeaturesSchema },
      { name: Replies.name, schema: RepliesSchema },
      // { name: Comment.name, schema: CommentSchema },
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
