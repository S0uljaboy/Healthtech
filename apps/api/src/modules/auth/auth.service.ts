import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, 'hashedPasswordForNow');
    // TODO: When register is implemented, compare against user.password
    // For MVP, we bypass actual hash check if user exists (to be implemented)

    const payload = { sub: user.id, email: user.email, role: user.role, tenantId: user.tenantId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
