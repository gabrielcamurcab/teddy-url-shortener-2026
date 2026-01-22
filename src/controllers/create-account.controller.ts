import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { hash } from 'bcryptjs';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe.js';
import { createAccountDtoSchema, CreateAccountDto, CreateAccountBody } from '../dtos/create-account.dto.js';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountReturnDto } from '../dtos/create-account-return.dto.js';

@ApiTags('Auth')
@Controller('/api/v1/auth/signup')
export class CreateAccountController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new account' })
  @ApiBody({ type: CreateAccountBody })
  @ApiResponse({ status: 201, type: CreateAccountReturnDto })
  @ApiResponse({ status: 409, description: 'User with same e-mail address already exists' })
  @UsePipes(new ZodValidationPipe(createAccountDtoSchema))
  async handle(@Body() body: CreateAccountDto) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists',
      );
    }

    const hashedPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { message: 'Account created successfully' };
  }
}
