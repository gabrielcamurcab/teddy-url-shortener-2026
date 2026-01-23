import { ApiProperty } from "@nestjs/swagger";

export class UpdateUrlReturnDto {
    @ApiProperty({ example: 'URL updated successfully' })
    message: string;
}