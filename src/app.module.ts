import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/create-account.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { CreateUrlController } from './controllers/create-url.controller';
import { GetUrlController } from './controllers/get-url.controller';
import { GetUrlListController } from './controllers/get-url-list.controller';
import { DeleteUrlController } from './controllers/delete-url.controller';
import { UpdateUrlController } from './controllers/update-url.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { PrismaUserRepository } from './domain/repositories/prisma/prisma-user.repository';
import { UrlRepository } from './domain/repositories/url.repository';
import { PrismaUrlRepository } from './domain/repositories/prisma/prisma-url.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true
    }),
    AuthModule
  ],
  controllers: [CreateAccountController, AuthenticateController, CreateUrlController, GetUrlController, GetUrlListController, DeleteUrlController, UpdateUrlController],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    },
    {
      provide: UrlRepository,
      useClass: PrismaUrlRepository
    }
  ],
})
export class AppModule { }  
