import { Module } from '@nestjs/common';
import { BookService } from './books.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema, Books } from 'src/schema/books.schema';
import { Profile, ProfileSchema } from 'src/schema/profile.schema';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema}, 
      { name: Books.name, schema: BookSchema}, 
      { name: Profile.name, schema: ProfileSchema}])
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BooksModule {}
