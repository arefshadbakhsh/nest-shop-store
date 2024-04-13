import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../shared/public-method';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductResponseDto } from '../dto/product/product-response-dto';
import { AuthResponseDto } from '../dto/user/auth-response-dto';
import { AuthService } from '../services/auth.service';
import { LoginRequestDto } from '../dto/user/login-request.dto';
import { RegisterRequestDto } from "../dto/user/register-request.dto";
import { Transactional } from "../shared/transactional";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'get token for login',
    type: AuthResponseDto,
    isArray: false,
  })
  login(@Body() body: LoginRequestDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('register')
  @Transactional()
  register(@Body() body: RegisterRequestDto) {
    return this.authService.register(body);
  }
}
