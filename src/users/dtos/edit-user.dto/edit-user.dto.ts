import { CreateUsersDto } from '../create-users.dto/create-users.dto'
import { PartialType } from '@nestjs/mapped-types'

export class EditUserDto extends PartialType(CreateUsersDto) {}
