import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}
  @Get()
  getAllExpenses(
    @Query('page') page = 1,
    @Query('take') take = 30,
    @Query('category') category?: string,
    @Query('priceFrom') priceFrom?: number,
    @Query('priceTo') priceTo?: number,
  ) {
    return this.expensesService.getFilteredExpenses({
      page,
      take,
      category,
      priceFrom,
      priceTo,
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.expensesService.getExpenseById(Number(id));
  }
  @Post()
  create(@Body() dto: CreateExpenseDto) {
    return this.expensesService.createExpense(dto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExpenseDto) {
    return this.expensesService.updateExpense(Number(id), dto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.deleteExpense(Number(id));
  }
}
