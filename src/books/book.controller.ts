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
import { CommentDto } from 'src/dto/comment.dto';
import { ReplyDto } from 'src/dto/reply.dto';

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
  
  @Post('bookmark/:bookId')
  @UseGuards(JwtAuthGuard)
  async bookmark( @Param( 'bookId') bookId:string,  @Req() req:AuthenticatedRequest){
    return await this.bookService.addBookmark(bookId, req)
  }

  @Post('like/:bookId')
  @UseGuards(JwtAuthGuard)
  async like( @Param( 'bookId') bookId:string,  @Req() req:AuthenticatedRequest){
    return await this.bookService.likes( bookId, req)
  }

  @Post('comment/:bookId')
  @UseGuards(JwtAuthGuard)
  async comment( @Param( 'bookId') bookId:string, @Req() req:AuthenticatedRequest){
    return await this.bookService.comments( bookId, req)
  }

  
  @Post('comment/delete/:bookId/:commentId')
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @Param('bookId') bookId: string,
    @Param('commentId') commentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.bookService.deleteComment(bookId, commentId, req);
  }

  
  @Post('comment/reply/:bookId/:commentId')
  @UseGuards(JwtAuthGuard)
  async reply(
    @Param('bookId') bookId: string,
    @Param('commentId') commentId: string,
    @Body() payload:ReplyDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.bookService.replyComment(bookId, commentId, payload, req);
  }
  

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
