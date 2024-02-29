import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BookService } from './books.service';
import { UserDto } from 'src/dto/user.dto';
import { UpdateUserDto } from 'src/dto/update-product.dto';
import { AuthenticatedRequest } from 'src/interface/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { BookDto } from 'src/dto/book.dto';
import { ChapterDto } from 'src/dto/chapter.dto';
import { ReadChapters } from 'src/dto/readChapters.dto';
import { BookmarkDto } from 'src/dto/bookmark.dto';
import { JwtAuthGuard } from 'src/guard/jwt.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
   
  @Post('publishBook')
  @UseGuards(JwtAuthGuard)
  async authur(@Body() payload:BookDto, @Req() req:AuthenticatedRequest) {    
    return await this.bookService.Publish(payload, req);
  }
  
  @Post('chapter/:_id')
  @UseGuards(JwtAuthGuard)
  async chapter(@Body() payload:ChapterDto, @Param('_id') _id:string) {    
    return await this.bookService.PublishChapters(payload, _id);
  }
  
  @Post('bookmark')
  @UseGuards(JwtAuthGuard)
  async bookmark(@Body() payload:BookmarkDto, _id:string,  @Req() req:AuthenticatedRequest){
    return await this.bookService.addBookmark(payload ,_id, req)
  }

  @Post('like')
  @UseGuards(JwtAuthGuard)
  async like(@Body() payload:BookmarkDto, _id:string,  @Req() req:AuthenticatedRequest){
    return await this.bookService.likes(payload ,_id, req)
  }

  // @Post('comment')
  // @UseGuards(JwtAuthGuard)
  // async comment(@Body() payload:BookmarkDto, _id:string,  @Req() req:AuthenticatedRequest){
  //   return await this.bookService.comment(payload ,_id, req)
  // }

  @Get('find/:genre')
  @UseGuards(JwtAuthGuard)
  async findByGenre(@Param('genre') genre: string) {
    return await this.bookService.findByGenre(genre);
  }

  
  @Get('books')
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.bookService.allGenre();
  }

  @Get(':title')
  @UseGuards(JwtAuthGuard)
  async findByTitle(@Param('title') title: string) {
    return await this.bookService.findByTitle(title);
  }

  @Get('findby/:title')
  @UseGuards(JwtAuthGuard)
  async findByChapter( @Param('title') title: string,  @Body() payload:ReadChapters,) {
    return await this.bookService.getChaptersByTitle( title, payload);
  }

  @Get('chapters/:_id')
  async chapters(@Param('_id') _id:string){
    return await this.bookService.getAllChaptersByBookTitle(_id)
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
