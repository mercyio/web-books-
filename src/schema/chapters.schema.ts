import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument  } from "mongoose";
import { User } from "./user.schema";
import { Schema as MongooseSchema } from 'mongoose';
import { Books } from "./books.schema";

export type ChapterDocument = HydratedDocument<Chapter>;
@Schema()
export class Chapter{
    @Prop()
    sequenceNumber: string

    @Prop()
    head : string

    @Prop()
    content : string

    @Prop({ default: Date.now }) 
    publicationDate: Date;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Books'})
    book_id: MongooseSchema.Types.ObjectId | Books
    

}

export const ChapterSchema = SchemaFactory.createForClass(Chapter)