import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  
  imports: [ProductModule, 
  ConfigModule.forRoot({ isGlobal : true}),
  MongooseModule.forRoot(process.env.DB_URL)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
