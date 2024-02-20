import { HttpException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';5
import { error } from 'console';
import { Books } from 'src/schema/books.schema';
import { UserDto } from 'src/dto/user.dto';
import { UpdateUserDto } from 'src/dto/update-product.dto';
import { AuthenticatedRequest } from 'src/interface/user.interface';
import { BookDto } from 'src/dto/book.dto';
import { User } from 'src/schema/user.schema';
import { ChapterDto } from 'src/dto/chapter.dto';
import { Chapter } from 'src/schema/chapters.schema';

@Injectable()
export class BookService {
  constructor (
    @InjectModel (Books.name) private bookModel:Model<Books>,
    @InjectModel (User.name) private userModel:Model<User>,
    @InjectModel (Chapter.name) private chapterModel:Model<Chapter>,
    ){}


   // ONE USER TO MANY BOOKS
   async Publish(payload:BookDto, @Req() req:AuthenticatedRequest ){
    const user = req.user
    console.log(user);
    const _id = user['_id']
    const finduser = await this.userModel.findOne({_id})
    if(!finduser){
      throw new NotFoundException('user not found')
     }
     const author_id= finduser
     const newBook = await this.bookModel.create({...payload, author_id})
     newBook.save()
     return {
      message: 'sucessful',
      newBook
     }

  //   const newBook = new this.bookModel({
  //     ...payload,
  //     author: finduser
  //   });

  //   return newBook.save();
  }


 

  async allGenre() {
    try{
     const find = await this.bookModel.find()
     return find
    }
    catch(error){
      return 'unable to make this request'
    }
  }


  async findByGenre( genre:string) {

    const findGenere = await this.bookModel.find({genre})
    if(!findGenere){
      throw new NotFoundException(`No stories found for genre: ${genre}`)
    }
    return findGenere
   }



  // ONE Book TO MANY Chapters
  async PublishChapters(payload:ChapterDto, title:string ){
    const findBook = await this.bookModel.findOne({title})
    if(!findBook){
      throw new NotFoundException('book not found')
     }
     const book_id= findBook
     const newChapter = await this.chapterModel.create({...payload, book_id})
     newChapter.save()
     return {
      message: 'sucessful',
      newChapter
     }

    }

    // async findByTitle( title:string) {
    //   try{
    //    const findBook = await this.bookModel.find({title})
    //    if(!findBook){
    //      throw new NotFoundException(`No book record found for ${title}`)
    //    }
    //    return findBook
    //   }
    //   catch(error){
    //    return error
    //   }
    //  }
   


   // async save(payload: UserDto) {
  //   try{
  //     const product = await new this.bookModel(payload);
  //     product.save() 
  //     return product
  //   }
  //   catch(error){
  //     return `failed to upload ${error}`
  //   }
  // }

 async update(_id: string, payload: UpdateUserDto) {
    try{
      const updateProduct = await this.bookModel.findByIdAndUpdate(_id, payload)
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
      const DeleteUser = await this.bookModel.findOneAndDelete({_id})
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

