import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ManyToOne } from "typeorm";
import { User } from "./user.schema";

export type BookDocument = HydratedDocument<Books>;
@Schema()
export class Books{
    @Prop()
    id : string

    @Prop()
    title : string

    @Prop()
    description : string

    @Prop()
    genre: number

    // @Prop()
    // author : string

    @Prop({ nullable: true })
    coverImage: string;

    @Prop({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    publicationDate: Date;

    @ManyToOne(() => User, user => user.story)
    author: User;

    

}

export const BookSchema = SchemaFactory.createForClass(Books)