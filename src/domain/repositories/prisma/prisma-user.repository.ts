import { PrismaService } from "src/prisma/prisma.service";
import { UserRepository } from "../user.repository";
import { CreateAccountDto } from "src/dtos/create-account.dto";
import { User } from "../../entities/user.entity";

import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateAccountDto): Promise<void> {
        await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
}