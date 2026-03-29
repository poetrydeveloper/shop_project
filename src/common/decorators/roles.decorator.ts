import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../modules/auth/user.entity';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);