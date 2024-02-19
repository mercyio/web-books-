import { Module } from '@nestjs/common';
import { BookService } from './books.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema, Books } from 'src/schema/books.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Books.name, schema: BookSchema}])
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BooksModule {}
