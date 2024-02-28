import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument  } from "mongoose";
import { User } from "./user.schema";
import { Schema as MongooseSchema } from 'mongoose';

export type BookDocument = HydratedDocument<Books>;
@Schema()
export class Books{
    @Prop()
    title : string

    @Prop()
    description : string

    @Prop()
    genre: string

    @Prop()
    content : string

    @Prop({ nullable: true })
    coverImage: string;

    @Prop({ default: Date.now }) 
    publicationDate: Date;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User'})
    author_id: MongooseSchema.Types.ObjectId | User
    

}

export const BookSchema = SchemaFactory.createForClass(Books)