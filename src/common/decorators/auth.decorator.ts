import { UseGuards, applyDecorators } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guard'
import { ApiBearerAuth } from '@nestjs/swagger'

export function Auth () {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth())
}
