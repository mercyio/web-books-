import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './books.service';
import { UserDto } from 'src/dto/user.dto';
import { UpdateUserDto } from 'src/dto/update-product.dto';

@Controller('product')
export class BookController {
  constructor(private readonly productService: BookService) {}

  @Post('createprofile')
  async create(@Body() payload: UserDto) {
    return await this.productService.save(payload);
  }

  @Get('allusers')
  async findAll() {
    return await this.productService.findAllProducts();
  }

  @Get('getuser/:id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Patch(':_id')
  async update(@Param('_id') _id: string, @Body() payload: UpdateUserDto) {
    return await this.productService.update(_id, payload);
  }
  
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }
  
}
