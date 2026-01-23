import { ApiProperty } from "@nestjs/swagger";
import z from "zod";

export const updateUrlDtoSchema = z.object({
    url: z.string()
});

export type UpdateUrlDto = z.infer<typeof updateUrlDtoSchema>;

export class UpdateUrlDtoBody {
    @ApiProperty({ example: 'https://google.com', description: 'URL to be shortened' })
    url: string;
}