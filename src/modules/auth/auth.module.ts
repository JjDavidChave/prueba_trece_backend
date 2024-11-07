import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthRepository } from "./repositories/auth.repository";
import { AuthService } from "./services/auth.service";

@Module({
  controllers: [AuthController],
  providers: [
   AuthRepository,
   AuthService
  ],
})
export class AuthModule {}
