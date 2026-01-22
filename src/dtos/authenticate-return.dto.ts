import { ApiProperty } from "@nestjs/swagger";

export class AuthenticateReturnDto {
    @ApiProperty({ example: 'ey...' })
    access_token: string;
}