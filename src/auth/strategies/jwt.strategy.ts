import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UsersService } from 'src/users/users.service'
import { JWT_SECRET } from 'src/config/constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private userService: UsersService,
    private config: ConfigService,
    
  ) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>(JWT_SECRET),
    })
  }

  async validate (payload: any) {
    //está de tipo any pero puede ser de un tipo en especifico

    const { sub: id } = payload //Acá ya está recibiendo el token y validandolo

    return await this.userService.getOne(id) //retorna el usuario validado por su token
  }
}
