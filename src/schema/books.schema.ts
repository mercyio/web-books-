import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument  } from "mongoose";
import { User } from "./user.schema";
import { Schema as MongooseSchema } from 'mongoose';
import { Chapter } from "./chapters.schema";
import { Profile } from "./profile.schema";
import { Like } from "./like.schema";

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

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Profile'})
    author_id: MongooseSchema.Types.ObjectId | Profile

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Chapter' }] })
    chapters:  Chapter[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Like' }] })
    likes:  Like[];

}

export const BookSchema = SchemaFactory.createForClass(Books)