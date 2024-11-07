import { RoleSelect } from 'src/global/general.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  status: boolean;

  @Column()
  phoneNumber: number;

  @Column({
    type: 'enum',
    enum: RoleSelect,
  })
  RoleSelect: RoleSelect;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data: Partial<Users>) {
    Object.assign(this, data);
  }
}
