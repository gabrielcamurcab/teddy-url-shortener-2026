import { ApiProperty } from '@nestjs/swagger';
import { z } from "zod";

export const createAccountDtoSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
});

export type CreateAccountDto = z.infer<typeof createAccountDtoSchema>;



export class CreateAccountBody {
    @ApiProperty({ example: 'John Doe', description: 'User name' })
    name: string;

    @ApiProperty({ example: 'john@example.com', description: 'User email' })
    email: string;

    @ApiProperty({ example: '123456', description: 'User password (min 6 characters)' })
    password: string;
}