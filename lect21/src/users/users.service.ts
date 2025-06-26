import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  async getAllUsers(page: number, take: number) {
    const allUsers = await this.userModel.find();
    const start = (page - 1) * take;
    return allUsers.slice(start, start + take);
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser({
    email,
    firstName,
    lastName,
    phoneNumber,
    gender,
  }: CreateUserDto) {
    if (!firstName || !lastName || !email || !phoneNumber || !gender) {
      throw new HttpException('fields are required', HttpStatus.BAD_REQUEST);
    }

    const newUser = new this.userModel({
      email,
      firstName,
      lastName,
      phoneNumber,
      gender,
    });

    await newUser.save();

    return 'created successfully';
  }

  async deleteUserById(id: string) {
    const deleted = await this.userModel.findByIdAndDelete(id);
    if (!deleted) throw new BadRequestException('user not found');
    return 'deleted successfully';
  }

  async updateUserById(id: string, updateUserDto: updateUserDto) {
    const updated = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!updated) throw new BadRequestException('user not found');
    return 'updated successfully';
  }

  async getAllUsersFiltered({
    page,
    take,
    gender,
    email,
  }: {
    page: number;
    take: number;
    gender?: string;
    email?: string;
  }) {
    let users = await this.userModel.find();

    if (email) {
      users = users.filter((u) =>
        u.email.toLowerCase().startsWith(email.toLowerCase()),
      );
    }

    const start = (page - 1) * take;
    return users.slice(start, start + take);
  }
}
