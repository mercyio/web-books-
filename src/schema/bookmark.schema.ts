import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument  } from "mongoose";
import { User } from "./user.schema";
import { Schema as MongooseSchema } from 'mongoose';

export type Document = HydratedDocument<Bookmark>;
@Schema()
export class Bookmark{

    // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User'})
    // book_id: MongooseSchema.Types.ObjectId | User


    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Book'})
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User'})
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

    @Prop({ default: Date.now }) 
    createdAt: Date;

}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark)