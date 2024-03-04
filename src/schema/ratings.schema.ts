import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument  } from "mongoose";
import { User } from "./user.schema";
import { Schema as MongooseSchema } from 'mongoose';
import { Books } from "./books.schema";
import { Replies } from "./reply.schema";

export type Document = HydratedDocument<Ratings>;
@Schema()
export class Ratings{
    @Prop()
    ratings : string

    @Prop()
    comment : string

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Books'})
    book_id: MongooseSchema.Types.ObjectId | Books

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User'})
    user_id: MongooseSchema.Types.ObjectId | User

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Replies' }] })
    replies: Replies[];



}

export const RatingSchema = SchemaFactory.createForClass(Ratings)