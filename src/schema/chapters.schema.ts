import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument  } from "mongoose";
import { User } from "./user.schema";
import { Schema as MongooseSchema } from 'mongoose';

export type ChapterDocument = HydratedDocument<Chapter>;
@Schema()
export class Chapter{
    @Prop()
    head : string

    @Prop()
    content : string

    @Prop()
    sequenceNumber: string

    @Prop({ default: Date.now }) 
    publicationDate: Date;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User'})
    book: MongooseSchema.Types.ObjectId | User
    

}

export const ChapterSchema = SchemaFactory.createForClass(Chapter)