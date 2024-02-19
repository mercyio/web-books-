import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';

@Module({
    
  imports: [BooksModule,  UsersModule, AuthModule,
  ConfigModule.forRoot({ isGlobal : true}),
  MongooseModule.forRoot(process.env.DB_URL),
 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
