import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/employee.entity';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
// import { UsersModule } from './users/users.module';
imports : [TypeOrmModule.forFeature([Employee])]

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port: 5432,
      username:'postgres',
      password:'admin',
      database:'employee_data',
      autoLoadEntities:true,
      synchronize:true,
    }),
    EmployeesModule,
    AuthModule
  ],
  // providers: [UsersService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
