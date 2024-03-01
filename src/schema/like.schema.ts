import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument  } from "mongoose";
import { User } from "./user.schema";
import { Schema as MongooseSchema } from 'mongoose';
import { Books } from "./books.schema";

export type Document = HydratedDocument<Like>;
@Schema()
export class Like{
    
    @Prop({ default: true }) 
    isFavorite: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Books'})
    book_id: MongooseSchema.Types.ObjectId | Books


    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User'})
    user_id: MongooseSchema.Types.ObjectId | User

    @Prop({ default: Date.now }) 
    createdAt: Date;

}

export const LikeSchema = SchemaFactory.createForClass(Like)