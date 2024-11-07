import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';
import { RoleController } from './controllers/role.controller';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';


@Module({
  controllers: [UsersController, RoleController],
  providers: [
    UsersRepository,
    UsersService,
    RoleRepository,
    RoleService,
  ],
})
export class TreceControl {}
