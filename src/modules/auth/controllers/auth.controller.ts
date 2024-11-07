import { Body, Controller, Post } from "@nestjs/common";
import { JoiValidationPipe } from "src/lib/JoiValidationPipe";
import { CreateAuthDto, CreateAuthSchema, AuthResponse } from "../types/auth.dto";
import { AuthService } from "../services/auth.service";
import { LoginAuthDto, LoginAuthResponse, LoginAuthSchema } from "../types/auth.login.dto";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}


    @Post('register')
    async create(
      @Body(new JoiValidationPipe(CreateAuthSchema))
      body: CreateAuthDto,
    ): Promise<AuthResponse> {
      return await this.authService.create(body);
    }

    @Post('login')
    async login(
      @Body(new JoiValidationPipe(LoginAuthSchema))
      body: LoginAuthDto,
    ): Promise<LoginAuthResponse> {
      return await this.authService.loginUser(body);
    }

}