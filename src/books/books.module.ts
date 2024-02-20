import { Module } from '@nestjs/common';
import { BookService } from './books.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema, Books } from 'src/schema/books.schema';
import { Profile, ProfileSchema } from 'src/schema/profile.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema}, 
      { name: Books.name, schema: BookSchema}, 
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
    AuthModule,
    UsersModule
  ],
  controllers: [BookController],
  providers: [BookService, JwtStrategy],
  exports: [BookService, JwtStrategy, PassportModule],

})
export class BooksModule {}
