import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'secretKeyChangeMe',
    });
  }

  async validate(payload: any) {
    // payload: { sub: userId, email, role }
    const user = await this.authService.validateUser(payload.sub);
    if (!user) return null;
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}