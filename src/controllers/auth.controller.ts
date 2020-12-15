import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/models/DTOs/login.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('login')
export class AuthControler {
  constructor(private service: AuthService) {}

  @Post()
  public async login(@Body() loginDto: LoginDTO): Promise<string> {
    const flag: boolean = await this.service.validateUser(loginDto);

    if (!flag) {
      throw new UnauthorizedException();
    }

    return await this.service.generateToken(loginDto.userId);
  }
}
