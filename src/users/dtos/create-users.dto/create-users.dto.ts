import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator'
import { Cursos } from 'src/enums/cursos.enum'
import { EstadoCivil } from 'src/enums/estado-civil.enum'

export class CreateUsersDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nombre: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  segundoNombre: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string

  @IsEnum(EstadoCivil, { each: true })
  estadoCivil: EstadoCivil

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Cursos, { each: true })
  cursos: Cursos[]
}
