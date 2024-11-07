import J = require('joi');

export const CreateRoleSchema = J.object({
  description: J.string().required(),
  status: J.boolean().required(),
});

export const UpdateRoleSchema = J.object({
  description: J.string().optional(),
  status: J.boolean().optional(),
});

export class CreateRoleDto {
  description: string;
  status: boolean;
}

export class UpdateRoleDto {
  name?: string;
  description?: string;
  status?: boolean;
}

export class RoleResponse {
  id: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
