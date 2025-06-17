import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.userService.getAllUSers();
  }
  @Get(':id')
  getUserById(@Param('id') id) {
    console.log(id);
    return this.userService.getUserById(Number(id));
  }
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    const email = CreateUserDto?.email;
    const firstName = CreateUserDto?.firstName;
    const lastName = CreateUserDto?.lastName;
    const phoneNumber = CreateUserDto?.phoneNumber;
    const gender = CreateUserDto?.gender;

    return this.userService.createUser({
      email,
      firstName,
      lastName,
      phoneNumber,
      gender,
    });
  }
  @Delete(':id')
  deleteUserById(@Param('id') id) {
    return this.userService.deleteUserById(Number(id));
  }
  @Put(':id')
  updateUser(@Param('id') id, @Body() updateUserDto: updateUserDto) {
    return this.userService.updateUserById(Number(id), updateUserDto);
  }
}
