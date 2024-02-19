import { Injectable } from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor (
    @InjectModel (User.name) private userModel:Model<User>,
    @InjectModel (User.name) private profileModel:Model<Profile>){}
 
  create() {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
