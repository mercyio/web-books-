import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';5
import { error } from 'console';
import { Books } from 'src/schema/books.schema';
import { UserDto } from 'src/dto/user.dto';
import { UpdateUserDto } from 'src/dto/update-product.dto';

@Injectable()
export class BookService {
  constructor (@InjectModel (Books.name) private productModel:Model<Books>){}

  async save(payload: UserDto) {
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

  async findOne(_id: string) {
   try{
    const Findproduct = await this.productModel.findOne({_id})
    if(!Findproduct){
       throw new HttpException( 'userName not found', 401)
    }
    return Findproduct
   }
   catch(error){
    return error
   }
  }

 async update(_id: string, payload: UpdateUserDto) {
    try{
      const updateProduct = await this.productModel.findByIdAndUpdate(_id, payload)
      return updateProduct
    }
    catch(error){
      return {
        message:'user not found',
        
      }
    }
  }

  async remove(_id: string){
    try{
      const DeleteUser = await this.productModel.findOneAndDelete({_id})
      if(!DeleteUser){
        throw new  HttpException ('user no dey ooh', 401)
      }
      return DeleteUser
    }
    catch(error){
      return error
    }
  }
  
}
