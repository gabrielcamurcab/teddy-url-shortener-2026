import { ApiProperty } from "@nestjs/swagger";

export class CreateUrlReturnDto {
    @ApiProperty({ example: 'https://localhost:3000/abc123', description: 'URL shortened' })
    url: string;
}