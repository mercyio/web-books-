import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
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
import { Comments } from 'src/schema/comment.schema';
import { Profile } from 'src/schema/profile.schema';
import { CommentDto } from 'src/dto/comment.dto';
import { Replies } from 'src/schema/reply.schema';
import { ReplyDto } from 'src/dto/reply.dto';
// import {  Like } from 'src/schema/like.schema';
// import { Comment } from 'src/schema/comment.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Books.name) private bookModel: Model<Books>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
    @InjectModel(Replies.name) private repliesModel: Model<Replies>,
    // @InjectModel(Comment.name) private commentModel: Model<Comment>,
    // @InjectModel (Profile.name) private profilemodel:Model<Profile>,
    // @InjectModel (Like.name) private likemodel:Model<Like>,
    // @InjectModel (Comment.name) private commentmodel:Model<Comment>,
  ) {}

  // ONE USER TO MANY BOOKS
  async Publish(payload: BookDto, @Req() req: AuthenticatedRequest) {
    const user = req.user;
    console.log(user);
    const userid = user['_id'];
    const finduser = await this.userModel.findById(userid);
    if (!finduser) {
      throw new NotFoundException('user not found');
    }

    //  const findProfile = await this.Profilemodel.findOne({_id})

    // const profile_id = finduser.profile
    //  if(!profile_id){
    //   throw new NotFoundException('Set up your profile')
    //  }
    //  console.log(finduser.profile);

    //  const userProfile = await this.profilemodel.findById(profile_id);
    //  if (!userProfile) {
    //      throw new NotFoundException('User profile not found');
    //  }

    const author_id = finduser;
    const newBook = await this.bookModel.create({ ...payload, author_id });

    //  userProfile.books = userProfile.books || [];
    //  userProfile.books.push(newBook);

    //  await userProfile.save();
    newBook.save();
    return {
      message: 'sucessful',
      newBook,
    };

    //   const newBook = new this.bookModel({
    //     ...payload,
    //     author: finduser
    //   });

    //   return newBook.save();
  }

  async allGenre() {
    try {
      const find = await this.bookModel.find();
      return find;
    } catch (error) {
      return 'unable to make this request';
    }
  }

  async findByGenre(genre: string) {
    const findGenre = await this.bookModel.find({ genre });
    if (!findGenre) {
      throw new NotFoundException(`No book found for genre: ${genre}`);
    }
    return findGenre;
  }

  // ONE Book TO MANY Chapters
  async PublishChapters(payload: ChapterDto, _id: string) {
    const findBook = await this.bookModel.findOne({ _id });
    if (!findBook) {
      throw new NotFoundException('book not found');
    }
    const book_id = findBook;
    const newChapter = await this.chapterModel.create({ ...payload, book_id });

    findBook.chapters = findBook.chapters || [];

    findBook.chapters.push(newChapter);

    await findBook.save();
    return {
      message: 'sucessful',
      newChapter,
    };
  }

  async findByTitle(title: string) {
    try {
      const findBook = await this.bookModel.find({ title });
      if (!findBook) {
        throw new NotFoundException(`No book record found for ${title}`);
      }
      return findBook;
    } catch (error) {
      return error;
    }
  }

  async getChaptersByTitle(title: string, payload: ReadChapters) {
    try {
      const findBook = await this.bookModel.find({ title });
      if (!findBook) {
        throw new NotFoundException(`No book record found for ${title}`);
      }
      const chapter = await this.chapterModel.find();
      if (!chapter) {
        throw new NotFoundException(`No chapter found for ${title}`);
      }
      return chapter;
    } catch (error) {
      return error;
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

    const storyChapters = await this.chapterModel
      .find({ book_id: book._id })
      .exec();

    if (!storyChapters || storyChapters.length === 0) {
      throw new NotFoundException(`No chapters found for book with id: ${_id}`);
    }

    return storyChapters;
  }

  async addBookmark( bookId: string,@Req() req: AuthenticatedRequest) {
    // try {
    const users = req.user;
    const userId = users['_id'];

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(user);
    
    const book = await this.bookModel.findOne({ _id:bookId}).exec();
    if (!book) {
      throw new UnauthorizedException('Book do not exists');
    }
    // console.log(book);

    const alreadyBookmarkedIndex = book.bookmarks.indexOf(userId);

    console.log(alreadyBookmarkedIndex);

    if (alreadyBookmarkedIndex === -1) {
      book.bookmarks.push(userId);
    } else {
      book.bookmarks.splice(alreadyBookmarkedIndex, 1);
    }
    await book.save();

    return {
      message: 'Successful',
      book,

    // const book = await this.bookModel.findOne({ _id }).exec();
    // // if (!book) {
    // //     throw new UnauthorizedException('Book do not exists');
    // // }
    // console.log(book);

    // const existingBookmark = await this.commentsModel
    //   .findOne({ payload, user_id: userId })
    //   .exec();
    // if (existingBookmark) {
    //   throw new UnauthorizedException('Bookmark already exists');
    // }
    // console.log(existingBookmark);

    // const newBookmark = new this.commentsModel({ ...payload, user_id: userId });
    // console.log(newBookmark);
    // return await newBookmark.save();

    // } catch (error) {
    //     if (error.code === 11000 || error.name === 'MongoError') {
    //         throw new ConflictException('Duplicate key error: Bookmark already exists');
    //     } else {
    //         throw new InternalServerErrorException('Failed to add bookmark');
    // }
    // }
  }
  }

  async likes( bookId: string, @Req() req: AuthenticatedRequest,) {
    // try {
    const users = req.user;
    const userId = users['_id']

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // console.log(user);

    const book = await this.bookModel.findOne({ _id: bookId }).exec();
    if (!book) {
      throw new UnauthorizedException('Book do not exists');
    }
    // console.log(book);

    const alreadyLikedIndex = book.likes.indexOf(userId); 

    console.log(alreadyLikedIndex);

    if (alreadyLikedIndex === -1) {
      book.likes.push(userId);
    } else {
      book.likes.splice(alreadyLikedIndex, 1);
    }
    await book.save();

    return {
      message: 'Successful',
      book,
    };

    // const alreadyLiked = await this.featuresModel
    //   .findOneAndUpdate({ payload, user_id: userId })
    //   .exec();
    // if (alreadyLiked) {
    //   return alreadyLiked;
    // }

    // console.log(alreadyLiked);

    // const likedBook = await this.userModel.create({
    //   book_id,
    //   user_id: userId,
    // });
    // book.likes = book.likes || [];
    // book.likes.push(likedBook);

    // console.log(likedBook);

    // await book.save();
    // return {
    //   message: 'sucessful',
    //   likedBook,
    // };
  }

  async comments(bookId: string, @Req() req: AuthenticatedRequest) {
    // try {
    const users = req.user;
    const userId = users['_id'];

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(user);

    const book = await this.bookModel.findOne({ _id: bookId }).exec();
    if (!book) {
      throw new UnauthorizedException('Book do not exists');
    }
    console.log(book);

    const comment = await this.commentsModel.create({
      book_id: bookId,
      user_id: userId,
    });
    book.comments = book.comments || [];
    book.comments.push(comment);
    await book.save();

    return {
      msg: 'sucessfull',
      comment,
    };
  }


  async deleteComment( bookId: string, commentId:string, @Req() req: AuthenticatedRequest) {
    // try {
    const users = req.user;
    const userId = users['_id'];

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // console.log(user);

    const book = await this.bookModel.findOne({ _id: bookId }).exec();
    if (!book) {
      throw new UnauthorizedException('Book do not exists');
    }
    console.log(book); 
  const comments = await this.commentsModel.findOneAndDelete({_id: commentId, user_id: userId, book_id: bookId }).exec();
  console.log(comments);

  if(!comments){
   throw new NotFoundException('comment not found')
  }
  // const comment = await this.commentsModel.findOne({ book_id: bookId, user_id: userId, content: commentId });
  // const comId = comment._id
  // if (comment) {

    // const commentIndex = book.comments.findIndex(comment => comment._id === commentId);
    // if (commentIndex !== -1) {
    //   book.comments.splice(commentIndex, 1);
    //   await book.save();

    // }
  return 'Comment deleted successfully';

  }



    async replyComment(bookId:string, commentId:string, payload:ReplyDto, @Req() req:AuthenticatedRequest){
      const user = req.user
      const userId = user['id']

      const finduser = await this.userModel.findById(userId).exec()
      if(!finduser){
        throw new NotFoundException('user not found')
      }
     
      const findbook = await this.bookModel.findOne({_id:bookId})
      if(!findbook){
        throw new NotFoundException('book not found')
      }

      const findcomment = await this.commentsModel.findOne({_id:commentId})
      if(!findcomment){
        throw new NotFoundException('comment not found')
      }
      
      // let commentIndex = -1;
      // for (let i = 0; i < findbook.comments.length; i++) {
      //     if (findbook.comments[i]._id === commentId) {
      //         commentIndex = i;
      //         break;
      //     }
      // }
      // console.log(findbook.comments);
      const commentIndex = findbook.comments.findIndex(comment =>comment.user_id === userId && comment.comment === payload.content); 
      console.log(commentIndex);
      
      if (commentIndex === -1) {
          throw new NotFoundException('Comment not found in the book');
      }
     
      
      const reply = await this.repliesModel.create({payload, book_id:bookId, user_id:userId, comment_id:commentId})
      findcomment.replies = findcomment.replies || []
      findcomment.replies.push(reply)
      await  findcomment.save()
   
      findbook.comments[commentIndex].replies = findbook.comments[commentIndex].replies || [];
      findbook.comments[commentIndex].replies.push(reply);
      await findbook.save()

      // console.log(findbook);
      // console.log(comment);
      
      return{
        msg: 'sucessful',
        result: reply
      }
    }

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
    try {
      const updateProduct = await this.bookModel.findByIdAndUpdate(
        _id,
        payload,
      );
      return updateProduct;
    } catch (error) {
      return {
        message: 'user not found',
      };
    }
  }

  async remove(_id: string) {
    try {
      const DeleteUser = await this.bookModel.findOneAndDelete({ _id });
      if (!DeleteUser) {
        throw new HttpException('user no dey ooh', 401);
      }
      return DeleteUser;
    } catch (error) {
      return error;
    }
  }
}
