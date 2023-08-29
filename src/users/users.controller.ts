import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUsersDto } from './dtos/create-users.dto/create-users.dto'
import { EditUserDto } from './dtos'

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  
  @Get()
  async getMany () {
    const data = await this.usersService.getMany()
    return { data }
  }

  @Get(':id')
  async getOne (@Param('id') id: number) {
    const data = await this.usersService.getOne(id)
    return { data }
  }

  @Post()
  async createOne (@Body() dto: CreateUsersDto) {
    const data = await this.usersService.createOne(dto)
    return { messaje: 'Usuario creado', data }
  }

  @Put(':id')
  async editOne (@Param('id') id: number, @Body() dto: EditUserDto) {
    const data = await this.usersService.editOne(id, dto)
    return { message: 'Usuario editado', data }
  }

  @Delete(':id')
  async deleteOne (@Param('id') id: number) {
    const data = await this.usersService.deleteOne(id)
    return { message: 'Usuario eliminado', data }
  }
}
