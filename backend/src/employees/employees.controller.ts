import { Controller,Get, Post, Put, Delete, Param, Body, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Employee[]> {
        return this.employeesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Employee> {
        return this.employeesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() employee: Employee, @Request() req) {
        const {user} = req;
        if(user.role !== 'admin') {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return this.employeesService.create(employee);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() employee: Employee, @Request() req) {
        const {user} = req;
        if (user.role !== 'admin') {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return this.employeesService.update(id,employee);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id') id: number, @Request() req) {
        const {user} = req;
        if(user.role !== 'admin'){
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return this.employeesService.delete(id);
    }
}
