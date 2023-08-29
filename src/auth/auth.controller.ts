import { Controller, Post, Get, UseGuards, Req } from '@nestjs/common'
import { LocalAuthGuard, JwtAuthGuard } from './guard'
import { Auth, User } from 'src/common/decorators'
import { User as UserEntity } from 'src/users/entities'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'
//import { ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login (@User() user: UserEntity) {
    const data = this.authService.login(user)
    return {
      message: 'Registro exitoso',
      data,
    }
  }

  @Auth() //Mirar en el auth.decorator, esta la importación completa de decoradores, esta es una abrebiación
  @Get('profile')
  profile (@User() user: UserEntity) {
    return {
      message: 'Petición correcta',
      user,
    }
  }

  //Este refresh se puede utilizar en la aplicación para que se rehaga el token sin necesidad de tener que volver a loguearse y que esto cierre la aplicación y haya que volver a iniciarla.
  @Auth()
  @Get('refresh') //va a configurar la ruta: api/auth/refresh
  refreshToken (@User() user: UserEntity) {
    const data = this.authService.login(user)
    return {
      message: 'Refresh exitoso',
      data,
    }
  }
}
