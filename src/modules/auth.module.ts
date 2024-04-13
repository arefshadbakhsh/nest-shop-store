import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user.module';
import { HashService } from "../shared/hash.service";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: Number(process.env.JWT_EXPIRES_TIME),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    HashService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
