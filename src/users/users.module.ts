import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BookSchema, Books } from 'src/schema/books.schema';
import { Profile, ProfileSchema } from 'src/schema/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema}, 
      { name: Books.name, schema: BookSchema}, 
      { name: Profile.name, schema: ProfileSchema}])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
