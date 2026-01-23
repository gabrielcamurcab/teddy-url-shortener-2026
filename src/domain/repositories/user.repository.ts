import { CreateAccountDto } from "src/dtos/create-account.dto";
import { User } from "../entities/user.entity";

export abstract class UserRepository {
    abstract create(data: CreateAccountDto): Promise<void>
    abstract findByEmail(email: string): Promise<User | null>
}