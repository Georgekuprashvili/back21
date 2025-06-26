import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './schema/expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel('Expense') private expenseModel: Model<Expense>) {}

  async getAllExpenses(page: number, take: number) {
    const all = await this.expenseModel.find();
    const start = (page - 1) * take;
    return all.slice(start, start + take);
  }

  async getExpenseById(id: number) {
    const expense = await this.expenseModel.findOne({ id: id });
    if (!expense) throw new BadRequestException('Expense not found');
    return expense;
  }

  async createExpense(createDto: CreateExpenseDto) {
    const { category, productName, quantity, price } = createDto;

    if (!category || !productName || !quantity || !price) {
      throw new BadRequestException('All fields are required');
    }

    const totalPrice = quantity * price;

    const expense = new this.expenseModel({
      ...createDto,
      totalPrice,
    });

    await expense.save();
    return 'Created successfully';
  }

  async updateExpense(id: number, updateDto: UpdateExpenseDto) {
    const current = await this.expenseModel.findOne({ id: id });
    if (!current) throw new BadRequestException('Expense not found');

    const updated = {
      ...current.toObject(),
      ...updateDto,
    };

    updated.totalPrice = updated.quantity * updated.price;

    await this.expenseModel.updateOne({ id: id }, updated);
    return 'Updated successfully';
  }

  async deleteExpense(id: number) {
    const deleted = await this.expenseModel.findOneAndDelete({ id: id });
    if (!deleted) throw new BadRequestException('Expense not found');
    return 'Deleted successfully';
  }

  async getFilteredExpenses({ page, take, category, priceFrom, priceTo }: any) {
    let expenses = await this.expenseModel.find();

    if (category) {
      expenses = expenses.filter((e) => e.category === category);
    }
    if (priceFrom) {
      expenses = expenses.filter((e) => e.price >= priceFrom);
    }
    if (priceTo) {
      expenses = expenses.filter((e) => e.price <= priceTo);
    }

    const start = (page - 1) * take;
    return expenses.slice(start, start + take);
  }
}
