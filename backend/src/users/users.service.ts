import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity'


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findOne(username:string): Promise<User | undefined> {
        return this.userRepository.findOne({where: {username}});
    }

    async create(user: Partial<User>): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password,10);
        const newUser = this.userRepository.create({...user, password:hashedPassword});
        return this.userRepository.save(newUser);
    }

}
