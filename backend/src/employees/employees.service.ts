import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
    ) {}

    findAll(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }

    findOne(id: number): Promise<Employee> {
        return this.employeeRepository.findOneBy({ id });
    }

    create( employee: Employee): Promise<Employee> {
        return this.employeeRepository.save(employee);
    }

    async update(id:number, employee:Employee): Promise<Employee> {
        await this.employeeRepository.update(id,employee);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        return this.employeeRepository.delete(id).then(()=> undefined);
    }
}
