import { ApiProperty } from '@nestjs/swagger';
import { z } from "zod";

export const authenticateDtoSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export type AuthenticateDto = z.infer<typeof authenticateDtoSchema>;



export class AuthenticateBody {
    @ApiProperty({ example: 'john@example.com', description: 'User email' })
    email: string;

    @ApiProperty({ example: '123456', description: 'User password (min 6 characters)' })
    password: string;
}