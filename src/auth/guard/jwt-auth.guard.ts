import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  //Con esto podemos personalizar los errores
  handleRequest (err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('No estas authenticado')
    }
    return user
  }
}
