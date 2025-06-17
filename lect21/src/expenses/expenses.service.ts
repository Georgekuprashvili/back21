import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  private expenses = [
    {
      id: 1,
      category: 'technique',
      productName: 'laptop',
      quantity: 1,
      price: 500,
      totalPrice: 500,
    },
  ];

  getAllExpenses() {
    return this.expenses;
  }

  getExpenseById(id: number) {
    const expense = this.expenses.find((i) => i.id === id);
    if (!expense) throw new BadRequestException('expense not found');
    return expense;
  }
  createExpense(createDto: CreateExpenseDto) {
    const { category, productName, quantity, price } = createDto;

    if (!category || !productName || !quantity || !price) {
      throw new BadRequestException('all fields are requireed');
    }
    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;
    const newExpense = {
      id: lastId + 1,
      category,
      productName,
      quantity,
      price,
      totalPrice: quantity * price,
    };
    this.expenses.push(newExpense);
    return 'create successfully';
  }
  updateExpense(id: number, updateDto: UpdateExpenseDto) {
    const index = this.expenses.findIndex((e) => e.id === id);
    if (index === -1) throw new BadRequestException('expense not found');

    const current = this.expenses[index];
    const updated = {
      ...current,
      ...updateDto,
    };

    updated.totalPrice = updated.quantity * updated.price;

    this.expenses[index] = updated;

    return 'updated successfully';
  }

  deleteExpense(id: number) {
    const index = this.expenses.findIndex((i) => i.id === id);
    if (index === -1) throw new BadRequestException('expense not found');

    this.expenses.splice(index, 1);
    return 'deleteed successfully';
  }
}
