import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Books, BookSchema } from 'src/schema/books.schema';
import { Profile, ProfileSchema } from 'src/schema/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema}, 
      { name: Books.name, schema: BookSchema}, 
      { name: Profile.name, schema: ProfileSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
