import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      email: 'user1@gmail.com',
      firstName: 'Giorgi',
      lastName: 'kuprashvili',
      phoneNumber: 571048320,
      gender: 'male',
    },
  ];
  getAllUsers(page: number, take: number) {
    const start = (page - 1) * take;
    return this.users.slice(start, start + take);
  }
  getUserById(id: number) {
    const user = this.users.find((el) => el.id === id);
    return user;
  }
  createUser({
    email,
    firstName,
    lastName,
    phoneNumber,
    gender,
  }: CreateUserDto) {
    if (!firstName || !lastName || !email || !phoneNumber || !gender) {
      throw new HttpException('fields are required', HttpStatus.BAD_REQUEST);
    }
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const newUser = {
      id: lastId + 1,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
    };
    this.users.push(newUser);

    return 'created successfully';
  }

  deleteUserById(id: Number) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('user nod found');

    this.users.splice(index, 1);
    return 'deleted successfuly';
  }
  updateUserById(id: Number, updateUserDto: updateUserDto) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('user nod found');

    const updateReq: updateUserDto = {};
    if (updateUserDto.email) {
      updateReq.email = updateUserDto.email;
    }
    if (updateUserDto.firstName) {
      updateReq.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName) {
      updateReq.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.phoneNumber) {
      updateReq.phoneNumber = updateUserDto.phoneNumber;
    }
    if (updateUserDto.gender) {
      updateReq.gender = updateUserDto.gender;
    }
    this.users[index] = {
      ...this.users[index],
      ...updateReq,
    };
    return 'updated successfully';
  }
  getAllUsersFiltered({ page, take, gender, email }: any) {
    let filtered = this.users;

    if (gender) {
      filtered = filtered.filter((u) => u.gender === gender);
    }
    if (email) {
      filtered = filtered.filter((u) => u.email.startsWith(email));
    }

    const start = (page - 1) * take;
    return filtered.slice(start, start + take);
  }
}
