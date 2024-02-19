import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { OneToOne } from "typeorm";
import { User } from "./user.schema";

export type ProfileDocument = HydratedDocument<Profile>;
@Schema()
export class Profile{
    @Prop()
    id : string
    
    @Prop()
    firstname : string

    @Prop()
    lastname : string

    @Prop()
    age : string

    @Prop()
    contact : string

    @Prop({ default: Date.now }) 
    createdAt: Date;
    
    @OneToOne(() => User, user => user.profile)
    user: User;
   
  
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)