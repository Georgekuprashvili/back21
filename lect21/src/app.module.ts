import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMododule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [UserMododule, ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
