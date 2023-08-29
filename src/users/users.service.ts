import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { User } from './entities/user.entity/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUsersDto } from './dtos/create-users.dto/create-users.dto'
import { EditUserDto } from './dtos'

export interface UserFindOne {
  id?: number
  email?: string
}

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMany () {
    return await this.userRepository.find()
  }

  async getOne (id: number) {
    const user = await this.userRepository.findOne({where: {id}})
    if (!user) throw new NotFoundException('El usuario no existe')

    return user
  }

  async createOne (dto: CreateUsersDto) {
    const userExist = await this.userRepository.findOne({
      where: { email: dto.email },
    })
    if (userExist)
      throw new BadRequestException('El usuario ya está registrado')

    const newUser = this.userRepository.create(dto)
    const user = await this.userRepository.save(newUser)

    delete user.password
    return user
  }

  async editOne (id: number, dto: EditUserDto) {
    const user = await this.getOne(id) //Esta es la misma linea de abajo pero resumida, haciendo uso del metodo que creamos más arriba getOne. Para utilizar la linea de abajo hay que quitarle la declaració de number al id.
    //const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('El usuario no existe')

    const editedUser = Object.assign(user, dto)
    return await this.userRepository.save(editedUser)
  }

  async deleteOne (id: number) {
    const user = await this.getOne(id)
    return await this.userRepository.remove(user)
  }

  async findOne (data: UserFindOne) {
    console.log("Llegué al findOne de user");
    
    return await this.userRepository
      .createQueryBuilder('usuarios')
      .where( data )
      .addSelect('usuarios.password')
      .getOne()
  }
}
