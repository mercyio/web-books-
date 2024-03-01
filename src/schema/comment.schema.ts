import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument  } from "mongoose";
import { User } from "./user.schema";
import { Schema as MongooseSchema } from 'mongoose';
import { Books } from "./books.schema";

export type Document = HydratedDocument<Comments>;
@Schema()
export class Comments{

    @Prop()
    content : string

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Books'})
    book_id: MongooseSchema.Types.ObjectId | Books

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User'})
    user_id: MongooseSchema.Types.ObjectId | User



}

export const FeaturesSchema = SchemaFactory.createForClass(Comments)