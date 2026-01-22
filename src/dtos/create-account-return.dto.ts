import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountReturnDto {
    @ApiProperty({ example: 'Account created successfully' })
    message: string;
}