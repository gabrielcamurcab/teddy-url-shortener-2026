import { ApiProperty } from "@nestjs/swagger";

export class GetUrlListReturnDto {
    @ApiProperty({ example: 'https://localhost:3000/abc123', description: 'URL shortened' })
    url: string;

    @ApiProperty({ example: 'abc123', description: 'URL code' })
    code: string;

    @ApiProperty({ example: 0, description: 'URL access count' })
    accessCount: number;

    @ApiProperty({ example: '2022-01-01T00:00:00.000Z', description: 'URL creation date' })
    createdAt: Date;

    @ApiProperty({ example: '2022-01-01T00:00:00.000Z', description: 'URL update date' })
    updatedAt: Date;
}