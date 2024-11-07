import J = require('joi');
import { RoleSelect } from 'src/global/general.enum';

export const CreateUserSchema = J.object({
  username: J.string().required(),
  password: J.string().required(),
  email: J.string().required().email(),
  RoleSelect: J.string()
  .valid(...Object.values(RoleSelect))
  .required(),
  name: J.string().required(),
  phoneNumber: J.number().required(),
  status: J.boolean().required(),
});

export const UpdateUserSchema = J.object({
  username: J.string().optional(),
  password: J.string().optional(),
  email: J.string().optional().email(),
  name: J.string().optional(),
  status: J.boolean().optional(),
});

export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  phoneNumber: number;
  RoleSelect: RoleSelect;
  name: string;
  status: boolean;
}

export class UpdateUserDto {
  username?: string;
  password?: string;
  email?: string;
  RoleSelect?: RoleSelect;
  phoneNumber?: number;
  name?: string;
  status?: boolean;
}

export class UserDtoResponse {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  phoneNumber: number;
  status: boolean;
  RoleSelect: RoleSelect;
  createdAt: Date;
  updatedAt: Date;
}
