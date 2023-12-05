import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './schema/productSchema';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';

@Injectable()
export class ProductService {
  constructor (@InjectModel (Product.name) private productModel: Model<Product>){}

  async save(payload: CreateProductDto) {
    try{
      const product = await new this.productModel(payload);
      product.save() 
      return product
    }
    catch(error){
      return `failed to upload ${error}`
    }
  }

  async findAllProducts() {
    try{
     const Findproducts = await this.productModel.find()
     return Findproducts
    }
    catch(error){
      return error
    }
  }

  async findOne(userName: string) {
   try{
    const Findproduct = await this.productModel.findOne({userName})
    if(!Findproduct){
       throw new HttpException( 'user not found', 401)
    }
    return Findproduct
   }
   catch(error){
    return error
   }
  }

 async update(id: string, payload: UpdateProductDto) {
    try{
      const updateProduct = await this.productModel.findByIdAndUpdate(id, payload)
      if(!updateProduct){
          throw new HttpException('user update not found', 401)
      }
      return updateProduct
    }
    catch(error){
      return error
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
