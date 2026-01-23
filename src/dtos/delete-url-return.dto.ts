import { ApiProperty } from "@nestjs/swagger";

export class DeleteUrlReturnDto {
    @ApiProperty({ example: 'URL dropped successfully' })
    message: string;
}