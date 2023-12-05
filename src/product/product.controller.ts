import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() payload: CreateProductDto) {
    return await this.productService.save(payload);
  }

  @Get()
  async findAll() {
    return await this.productService.findAllProducts();
  }

  @Get(':userName')
  async findOne(@Param('userName') userName: string) {
    return await this.productService.findOne(userName);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return await this.productService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
