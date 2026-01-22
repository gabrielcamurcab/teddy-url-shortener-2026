import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from "src/env/index.js";
import { JwtStrategy } from "./jwt.strategy.js";

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory(config: ConfigService<Env, true>) {
                const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true });
                const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true });

                return {
                    signOptions: { algorithm: 'RS256' },
                    privateKey: `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`,
                    publicKey: `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`,
                }
            }
        })
    ],
    providers: [JwtStrategy]
})
export class AuthModule {

}