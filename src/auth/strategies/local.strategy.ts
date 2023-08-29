import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passportField: 'password',
    });
  }

  async validate(email: string, password: string) {
    console.log("entre al valid del LOCAL");
    
    console.log(email)
    const user = await this.authService.validateUser(email, password);
    if (!user)
      throw new UnauthorizedException(
        'El usuario o la contraseña son invalidos',
      );
      console.log("Soy el user del LOCAL");
      
      console.log(user);
    return user;
  }
}
