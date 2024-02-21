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
import { ReadChapters } from 'src/dto/readChapters.dto';
import { BookmarkDto } from 'src/dto/bookmark.dto';
import { Bookmark } from 'src/schema/bookmark.schema';

@Injectable()
export class BookService {
  constructor (
    @InjectModel (Books.name) private bookModel:Model<Books>,
    @InjectModel (User.name) private userModel:Model<User>,
    @InjectModel (Chapter.name) private chapterModel:Model<Chapter>,
    @InjectModel (Bookmark.name) private bookmarkModel:Model<Bookmark>,
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

    const findGenre = await this.bookModel.find({genre})
    if(!findGenre){
      throw new NotFoundException(`No book found for genre: ${genre}`)
    }
    return findGenre
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

    async findByTitle( title:string) {
      try{
       const findBook = await this.bookModel.find({title})
       if(!findBook){
         throw new NotFoundException(`No book record found for ${title}`)
       }
       return findBook
      }
      catch(error){
       return error
      }
     }



     async getChaptersByTitle( title:string, payload:ReadChapters) {
      try{
       const findBook = await this.bookModel.find({title})
       if(!findBook){
         throw new NotFoundException(`No book record found for ${title}`)
       }
       const chapter = await this.chapterModel.find()
       if(!chapter){
        throw new NotFoundException(`No chapter found for ${title}`)
      }
       return chapter 
      }
      catch(error){
       return error
      }
     }
   


    
      // async getAllChapters(title: string) {
      //   const storyChapters = await this.chapterModel.find({ title }).exec();
      //   if (!storyChapters || storyChapters.length === 0) {
      //     throw new NotFoundException(`No chapters found for story with title: ${title}`);
      //   }
      //   return storyChapters;
      // }


      async getAllChaptersByBookTitle(_id: string) {
        const book = await this.bookModel.findOne({ _id }).exec();
      
        if (!book) {
          throw new NotFoundException(`No book found with id: ${_id}`);
        }
      
        const storyChapters = await this.chapterModel.find({ book_id: book._id }).exec();
      
        if (!storyChapters || storyChapters.length === 0) {
          throw new NotFoundException(`No chapters found for book with id: ${_id}`);
        }
      
        return storyChapters;
      }
      

     async addBookmark( payload: BookmarkDto, @Req() req:AuthenticatedRequest) {
      const users = req.user
      const userId = users['_id']

      const user = await this.userModel.findById(userId);
      if (!user) throw new NotFoundException('User not found');
  
      const book = await this.bookModel.findById(payload.bookId);
      if (!book) throw new NotFoundException('Book not found');
  
      const existingBookmark = await this.bookmarkModel.findOne({
        user: userId,
        book: payload.bookId,
      });
      if (existingBookmark) throw new NotFoundException('Bookmark already exists');
  
      const newBookmark = new this.bookmarkModel({
        user: userId,
        book: payload.bookId,
      });
      return newBookmark.save();
    }

  // async addBookmark(payload: BookmarkDto) {
  //   const { userId, bookId } = payload;

  //   const existingBookmark = await this.bookmarkModel.findOne({ userId, bookId }).exec();

  //   if (existingBookmark) {
  //     throw new NotFoundException('Bookmark already exists');
  //   }

  //   const newBookmark = new this.bookmarkModel(payload);
  //   return newBookmark.save();
  // }



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

