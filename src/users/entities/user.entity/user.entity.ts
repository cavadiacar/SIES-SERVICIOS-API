import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { hash } from 'bcryptjs'
import { EstadoCivil } from 'src/enums/estado-civil.enum'
import { Cursos } from 'src/enums/cursos.enum'

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  nombre: string

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  segundoNombre: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string

  @Column({ type: 'varchar', nullable: false, select: false })
  password: string

  @Column( 'enum', { enum: EstadoCivil })
  estadoCivil: EstadoCivil;

  @Column( 'enum', { enum: Cursos })
  cursos: Cursos[];

  @Column({ type: 'bool', default: true })
  status: boolean

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createAt: Date

  //Con este metodo se hashea la contraseña, para que al momnto de almacenar la contraseña del usuario, nisiquiera nosotros mismos sabemos que contraseña a puesto.
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword () {
    if (!this.password) {
      return
    }
    this.password = await hash(this.password, 10)
  }
}
