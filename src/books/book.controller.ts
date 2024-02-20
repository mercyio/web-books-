import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BookService } from './books.service';
import { UserDto } from 'src/dto/user.dto';
import { UpdateUserDto } from 'src/dto/update-product.dto';
import { AuthenticatedRequest } from 'src/interface/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { BookDto } from 'src/dto/book.dto';
import { ChapterDto } from 'src/dto/chapter.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
   
  @Post('publish-book')
  @UseGuards(AuthGuard())
  async authur(@Body() payload:BookDto, @Req() req:AuthenticatedRequest) {    
    return await this.bookService.Publish(payload, req);
  }
  
  @Post('publish-chapter/:title')
  @UseGuards(AuthGuard())
  async chapter(@Body() payload:ChapterDto, @Param('title') title:string) {    
    return await this.bookService.PublishChapters(payload, title);
  }

  @Get(':genre')
  @UseGuards(AuthGuard())
  async findByGenre(@Param('genre') genre: string) {
    return await this.bookService.findByGenre(genre);
  }

  
  @Get('findall-books')
  @UseGuards(AuthGuard())
  async findAll() {
    return await this.bookService.allGenre();
  }



  @Patch(':_id')
  async update(@Param('_id') _id: string, @Body() payload: UpdateUserDto) {
    return await this.bookService.update(_id, payload);
  }
  
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.bookService.remove(id);
  }
  
}
