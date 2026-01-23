import { Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { compare } from 'bcryptjs';
import { ZodValidationPipe } from "../pipes/zod-validation-pipe.js";
import { JwtService } from "@nestjs/jwt";
import { authenticateDtoSchema, AuthenticateDto, AuthenticateBody } from "../dtos/authenticate.dto.js";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthenticateReturnDto } from "../dtos/authenticate-return.dto.js";
import { UserRepository } from "../domain/repositories/user.repository.js";

@ApiTags('Auth')
@Controller('/api/v1/auth/login')
export class AuthenticateController {
    constructor(
        private userRepository: UserRepository,
        private jwt: JwtService
    ) { }

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Authenticate user' })
    @ApiBody({ type: AuthenticateBody })
    @ApiResponse({ status: 200, type: AuthenticateReturnDto })
    @ApiResponse({ status: 401, description: 'Users credentials do not match' })
    @UsePipes(new ZodValidationPipe(authenticateDtoSchema))
    async handle(@Body() body: AuthenticateDto) {
        const { email, password } = body;

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Users credentials do not match.');
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Users credentials do not match.');
        }

        const accessToken = this.jwt.sign({
            sub: user.id
        });

        return {
            access_token: accessToken
        };
    }
}